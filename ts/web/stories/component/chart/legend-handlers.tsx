import React from 'react';
import {Pie} from 'react-chartjs-2';

const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

const legendOpts = {
	onClick: (_e, item) => alert(`Item with text ${item.text} and index ${item.index} clicked`),
	onHover: (_e, item) => alert(`Item with text ${item.text} and index ${item.index} hovered`),
};

export default class Chart extends React.Component {

	public legendOptsInput;

	public getInitialState() {
		return {
			legend: legendOpts
		}
	}

	public applyLegendSettings() {
		const { value } = this.legendOptsInput;

		try {
			const opts = JSON.parse(value);
			this.setState({
				legend: opts
			});
		} catch(e) {
			alert(e.message);
			throw Error(e);
		}
	}

	public render() {
		return (
			<div>
				<h2>Legend Handlers Example</h2>
				<p>Hover over label and click</p>
				<Pie data={data} legend={legendOpts} />
			</div>
		);
	}
}
