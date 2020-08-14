
import { KeyEnum } from 'salesfy-shared';
export const IS_DEVELOPMENT = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
export const BE_URL = IS_DEVELOPMENT ? 'http://localhost:3001' : 'https://be.salesfy.com.br'
export const BUGSNAG_ID = "";
export const LINK_PREVIEW = "";
export const ONE_SIGNAL_ID = IS_DEVELOPMENT ? "" : "";

/** CRYPTO_CONFIGS */

export const CRYPTO_KEYCHAIN_SERVICE = "";
export const CRYPTO_SHARED_PREFERENCES_NAME = "";

/** LINKS */
export const LK_SHARE_CONTENT_PREFIX = "https://www.salesfy.com.br/conteudos";
export const LK_APPLESTORE = "";
export const LK_PLAYSTORE = "";

export const LK_ABOUT = "https://www.salesfy.com.br/";
export const LK_TERMS = "https://www.salesfy.com.br/termos/";
export const LK_DEMO = "https://www.salesfy.com.br/demo/";

/** SOCIAL LOGIN VARIABLES */

export const FACEBOOK_LOGIN_CLIENT_ID = "";
export const FACEBOOK_SCOPES = ["user_link", "email", "public_profile"];
export const STR_FACEBOOK_SCOPES = "name email picture";
export const GAPI_DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
export const GOOGLE_LOGIN_WEB_CLIENT_ID = "";
export const GOOGLE_LOGIN_IOS_CLIENT_ID = "";
export const GOOGLE_SCOPES = [
	'https://www.googleapis.com/auth/userinfo.email',
	'https://www.googleapis.com/auth/userinfo.profile',
	'https://www.googleapis.com/auth/plus.me'
];
export const GOOGLE_DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';
export const STR_GOOGLE_SCOPES = "email profile openid https://www.googleapis.com/auth/drive.metadata.readonly";

/** S3 CONFIG */

export const S3_CONTENT_DIR = IS_DEVELOPMENT ? "test/conteudos" : "app/conteudos"
export const S3_BUCKET = "hatchers-website";
export const S3_REGION = "sa-east-1";
export const S3_ACCESS_KEY = "";
export const S3_SECRET_KEY = "";
export const S3_PATH_CONTENT = "https://s3-" + S3_REGION + ".amazonaws.com/" + S3_BUCKET + "/" + S3_CONTENT_DIR;
export const S3_ACCESS_PATH = "https://" + S3_BUCKET + ".s3-" + S3_REGION + ".amazonaws.com/" + S3_CONTENT_DIR

export const AR_NM_DEFAULT_IMAGE_SUGGEST_CONTENT = [
	"/default_img_suggest_content1.png", "/default_img_suggest_content2.png",
	"/default_img_suggest_content3.png", "/default_img_suggest_content4.png",
	"/default_img_suggest_content5.png", "/default_img_suggest_content6.png"]
export const AR_NM_DEFAULT_IMAGE_SUGGEST_CHANNEL = [
	"/default_img_suggest_channel1.png", "/default_img_suggest_channel2.png",
	"/default_img_suggest_channel3.png", "/default_img_suggest_channel4.png",
	"/default_img_suggest_channel5.png", "/default_img_suggest_channel6.png"]

/** LIST DEFAULT CONFIGS */
export const LIST_LIMIT_DEFAULT = 30;
export const LIST_CHANNEL_LIMIT_DEFAULT = 6;
export const FEED_CHANNEL = 43;
export const UNKNOWN_CHANNEL = 44;
export const FAVORITE_CHANNEL = 44;
export const TUTORIAL_CHANNEL = 38;

/** TIMEOUT */

export const BE_TIMEOUT_RESPOND = 15000;

export const WEB_SYSTEM_NAME = "web"; // CtSystem.web
export const WEB_SYSTEM_VERSION = "1.200.610"; //data com um ponto no meio

export const CARD_CHANNEL_PROPORTION = (143 / 298);
export const CARD_CHANNEL_WIDTH = 370;
export const CARD_CHANNEL_MOBILE_WIDTH = 330;

export const BUTTON_CLICK_DELAY = 400;
export const FILTER_DELAY = 2000;
export const FIELD_BLUR_DELAY = 1000;

export const DEFAULT_CONTENT_TYPE = 20; // TEXT

export const NEED_REAUTH_KEYS = [
	KeyEnum.refreshTokenUndefined,
	KeyEnum.refreshTokenExpired,
	KeyEnum.refreshTokenInvalid,
	KeyEnum.refreshTokenDiffFromStored
]

export const DEFAULT_ENTER_DELAY = 900;

export const PIXABAY_API = "";

export const GOOGLE_SHEETS_LINK = "https://docs.google.com/spreadsheets";
export const GOOGLE_DOCS_LINK = "https://docs.google.com/document";
export const GOOGLE_PRESENTATION_LINK = "https://docs.google.com/presentation";
export const DRAWIO_LINK = "https://www.draw.io";
export const CANVA_LINK = "https://www.canva.com/pt_br/login";
export const PREZI_LINK = "https://prezi.com/login/";
export const OFFICE_LINK = "https://www.office.com/login?es=Click&ru=%2F%3Fomkt%3Dpt-br";
