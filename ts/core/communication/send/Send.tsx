import { SConst, KeyEnum, I18n } from 'salesfy-shared';
import { getStore, getPersist } from "app-core/boot/ConfigureStore";
import { userSessionTokens } from 'app-core/redux_store/user/Actions';
import TokenUtil from 'utils/token/TokenUtil';
import bugsnag from 'boot/CrashReporting';
import { BE_URL, NEED_REAUTH_KEYS } from 'root/envVars';
import { logout } from 'app-core/redux_store/user/Actions';
import Authentication from 'app-core/boot/Authentication';

const axios = require('axios');
const serverURI = BE_URL;

interface IRequest {
	method: string;
	data?: any;
	headers?: any;
	hasAuth: boolean;
	body?: object;
}

export default class Service {

	private static accessToken;
	private static refreshToken;

	public static setAccessToken(at) {
		this.accessToken = at;
	}

	public static setRefreshToken(rt) {
		this.refreshToken = rt;
	}

	public static getTokens() {
		let tokens = {};

		if (this.accessToken && this.refreshToken) {
			tokens = {
				[SConst.X_ACCESS_TOKEN]: this.accessToken,
				[SConst.X_REFRESH_TOKEN]: this.refreshToken
			};
		}

		if (tokens[SConst.X_ACCESS_TOKEN]) {
			// console.log(`at -> ${tokens[SConst.X_ACCESS_TOKEN].substring(tokens[SConst.X_ACCESS_TOKEN].length - 10)} (Send)`)
		}
		if (tokens[SConst.X_REFRESH_TOKEN]) {
			// console.log(`rt -> ${tokens[SConst.X_REFRESH_TOKEN].substring(tokens[SConst.X_REFRESH_TOKEN].length - 10)} (Send)`)
		}

		return tokens;
	}

	public static getAsyncTokens(hasAuth, needToken) {
		return new Promise((resolve) => {
			if (needToken) {
				if (hasAuth) {
					if (this.refreshToken && TokenUtil.isTokenExpired(this.refreshToken)) {
						Authentication.reAuthentication().then(() => {
							resolve(this.getTokens());
						});
					} else {
						resolve(this.getTokens());
					}
				} else {
					resolve(this.getTokens());
				}
			} else {
				resolve({});
			}
		});
	}

	public static sendRequest(uri, request, hasAuth, needToken = true) {

		return this.getRequestInfo(request, needToken)
			.then((requestInfo) => {
				return axios(uri, requestInfo).catch(error => {
					if (error.response) {
						bugsnag.notify(new Error(error.response))
					} else if (error.request) {
						bugsnag.notify(new Error(error.request))
					} else {
						bugsnag.notify(new Error(error.message))
					}
					return error.response
				})
			}
			)
			.then(response => this.wasSuccessfull(response, hasAuth))
			.then(response => response ? response : this.reSend(uri, request))
			.then(this.handleErrors)
			.catch(error => {
				throw error;
			});
	}

	public static get(resource, hasAuth = true) {
		const uri = serverURI + resource;

		const request = {
			method: SConst.HTTP_METHOD_GET,
			hasAuth,
		};

		return this.sendRequest(uri, request, hasAuth);

	}

	public static put(resource, data, hasAuth = true) {
		const uri = serverURI + resource;

		const request = {
			method: SConst.HTTP_METHOD_PUT,
			data: JSON.stringify(data),
			headers: {
				"Content-type": "application/json",
				'access-control-expose-headers': '*'
			},
			hasAuth
		};

		return this.sendRequest(uri, request, hasAuth);
	}

	public static post(resource, data, hasAuth = true, needToken = true) {
		const uri = serverURI + resource;

		const request = {
			method: SConst.HTTP_METHOD_POST,
			data: JSON.stringify(data),
			headers: {
				"Content-type": "application/json",
				'access-control-expose-headers': '*'
			},
			hasAuth
		};

		return this.sendRequest(uri, request, hasAuth, needToken);
	}

	public static delete(resource, data, hasAuth = true) {
		const uri = serverURI + resource;

		const request = {
			method: SConst.HTTP_METHOD_DELETE,
			data: JSON.stringify(data),
			headers: {
				"Content-type": "application/json",
				'access-control-expose-headers': '*'
			},
			hasAuth
		};

		return this.sendRequest(uri, request, hasAuth);
	}

	public static async reSend(uri, { method, data, headers, hasAuth }: IRequest) {
		return this.getRequestInfo({ method, data, headers, hasAuth })
			.then(requestInfo => axios(uri, requestInfo).catch(error => error.response))
	}

	public static async getRequestInfo({ method, data, headers, hasAuth }: IRequest, needToken = true) {
		return this.getAsyncTokens(hasAuth, needToken)
			.then(tokens => {
				return {
					method,
					data,
					// timeout: BE_TIMEOUT_RESPOND,
					headers: {
						...headers,
						...tokens
					},
				};
			})
	}

	public static getAccessToken(headers) {
		return typeof headers[SConst.X_ACCESS_TOKEN] === 'string' ? headers[SConst.X_ACCESS_TOKEN] : headers[SConst.X_ACCESS_TOKEN][0];
	}

	public static getRefreshToken(headers) {
		return typeof headers[SConst.X_REFRESH_TOKEN] === 'string' ? headers[SConst.X_REFRESH_TOKEN] : headers[SConst.X_REFRESH_TOKEN][0];
	}

	public static getRealHeader(response) {
		if (response) {
			if (response.headers && response.headers.map) {
				return response.headers.map;
			} else {
				return response.headers;
			}
		}

		return;
	}

	public static async wasSuccessfull(response, _hasAuth) {
		if (response && response.headers) {
			const headers = this.getRealHeader(response);
			const accessToken = headers && headers[SConst.X_ACCESS_TOKEN] && this.getAccessToken(headers);
			const refreshToken = headers && headers[SConst.X_REFRESH_TOKEN] && this.getRefreshToken(headers);
			const hasAccess = (accessToken && accessToken !== SConst.KEY_EMPTY_TOKEN);
			const hasRefresh = (refreshToken && refreshToken !== SConst.KEY_EMPTY_TOKEN);
			if (hasAccess || hasRefresh) {
				if (hasAccess) {
					this.setAccessToken(accessToken);
				}

				if (hasRefresh) {
					this.setRefreshToken(refreshToken);
				}

				getStore().dispatch(userSessionTokens(this.getTokens()));
				getPersist().flush();

				const { user } = getStore().getState();
				return { ...response, hasTokens: user.id }
			} else if (response.status === 400) {
				if (headers.statusmessage) {
					const isReloginNeeded = typeof headers.statusmessage === 'string' ? NEED_REAUTH_KEYS.includes(headers.statusmessage) : NEED_REAUTH_KEYS.includes(headers.statusmessage[0]);

					if (isReloginNeeded) {
						await getStore().dispatch(await logout())
					}
				}
			}
		}

		return response;
	}

	public static parseExtraContent(extracontent) {
		let extra = {};
		if (extracontent) {
			extracontent.keys(key => {
				extra = {
					...extra,
					key: KeyEnum[extracontent[key]]
				}
			})
		}
		return extra;
	}

	public static handleErrors(response) {
		if (response && response.status !== 200) {
			const headersMap = response.headers.map ? response.headers.map : response.headers;
			if (headersMap) {
				const statusmessage = headersMap.statusmessage;
				if (statusmessage) {
					let extracontent;
					if (headersMap.extracontent) {
						if (Array.isArray(headersMap.extracontent)) {
							extracontent = JSON.parse(headersMap.extracontent[0]);
						} else {
							extracontent = headersMap.extracontent;
						}
					}

					const parseExtraContent = (content) => {
						let extra = {};
						if (content) {
							try {
								const joContent = JSON.parse(content);
								Object.keys(joContent).map(key => {
									extra = {
										...extra,
										[key]: KeyEnum[joContent[key]] ? I18n.t(KeyEnum[joContent[key]]) : joContent[key]
									}
								})
							} catch (e) {
								console.log(e);
							}
						}
						return extra;
					}

					throw I18n.t(KeyEnum[Array.isArray(statusmessage) ? statusmessage[0] : statusmessage], parseExtraContent(extracontent));
				}
			}

			const error = new Error(response);
			bugsnag.notify(error)
			throw error;
		}
		return response;
	}
}
