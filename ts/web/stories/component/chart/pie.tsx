import React from 'react';
import { Pie } from 'react-chartjs-2';

const data = {
	labels: [
		'Tercio',
		'Everton',
		'Fernando'
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

export default class Chart extends React.Component {
	public render() {
		return (
			<div>
				<h2>Produção de conteúdos do Playbook Salesfy</h2>
				<Pie data={data} />
			</div>
		);
	}
};
