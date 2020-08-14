import React from 'react';
import {Bar} from 'react-chartjs-2';

const data = {
	labels: ['Mural de recados', 'Scripts de vendas', 'Material de venda', 'Overview de Produto', 'Concorrentes', 'Antídotos contra concorrência', 'Estudos obrigatórios'],
	datasets: [
		{
			label: 'Quantidade de conteúdos',
			backgroundColor: 'rgb(209,238,130)',
			borderColor: 'rgb(209,238,130)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgb(209,238,130)',
			hoverBorderColor: 'rgb(209,238,130)',
			data: [65, 59, 80, 81, 56, 55, 40]
		}
	]
};

export default class Chart extends React.Component {
	public render() {
		return (
			<div>
				<h2>Consumo de conteúdos por canal do playbook Salesfy</h2>
				<Bar
					data={data}
				/>
			</div>
		);
	}
};
