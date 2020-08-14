import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const data = {
	labels: ['Tercio', 'Everton', 'Chico', 'Gabriel', 'Taranto', 'Arnaldo'],
	datasets: [
		{
			label: 'Quantidade de conversões',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [65, 59, 80, 81, 56, 55, 40]
		}
	]
};

export default class Chart extends React.Component {
	public render() {
		return (
			<div>
				<h2>Leitura de conteúdos do L.C.</h2>
				<HorizontalBar data={data} />
			</div>
		);
	}
};
