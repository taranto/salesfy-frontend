import { createMuiTheme } from '@material-ui/core/styles';
// import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
	palette: {
		primary: red,
		secondary: grey,
		error: red,
		// Used by `getContrastText()` to maximize the contrast between the background and
		// the text.
		contrastThreshold: 3,
		// Used to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2,
	},
	overrides: {
		MuiPaper: {
			elevation2: { // Name of the rule
				// backgroundColor: 'red', // Some CSS
				boxShadow: 'none'
			},
		},
		MuiTooltip: {
			tooltip: {
				fontSize: "0.8em"
			}
		}
	},
});

export const variables = {
	primaryColor: "#670000",
	secondColor: "#e02b20",
	grayColor: "#d4d4d4"
}

export default theme;
