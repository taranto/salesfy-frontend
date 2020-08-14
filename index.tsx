import * as React from "react";
import { render } from "react-dom";
import { AppContainer, setConfig } from "react-hot-loader";
import App from "web/boot/Setup";
require('./assets/scss/App.scss')

setConfig({
	pureSFC: true
})

const rootEl = document.getElementById("root");

render(
	<AppContainer>
		<App />
	</AppContainer>,
	rootEl
);

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
	module.hot.accept("web/boot/Setup", () => {
		const NewApp = require("web/boot/Setup").default;

		render(
			<AppContainer>
				<NewApp />
			</AppContainer>,
			rootEl
		);
	});
}
