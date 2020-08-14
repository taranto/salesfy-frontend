import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getState = () => ({
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [getRandomInt(50, 200), getRandomInt(100, 150), getRandomInt(150, 250)],
		backgroundColor: [
			'#CCC',
			'#36A2EB',
			'#FFCE56'
		],
		hoverBackgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
		]
	}]
});

export default class Chart extends React.Component {
	public getInitialState() {
		return getState();
	}

	public componentWillMount() {
		setInterval(() => {
			this.setState(getState());
		}, 5000);
	}

	public render() {
		return (
			<div>
				<h2>Dynamicly refreshed Doughnut Example</h2>
				<Doughnut data={this.state} />
			</div>
		);
	}
};
