import React from 'react';
import Pie from 'web/stories/component/chart/pie';
import HorizontalBar from 'web/stories/component/chart/horizontalBar';
import Radar from 'web/stories/component/chart/radar';
import Bar from 'web/stories/component/chart/bar';
import Grid from '@material-ui/core/Grid';

const DashboardContainer = ({ }) => {
	return (
		<Grid className="dashboard" container={true} spacing={8}>
			<Grid item={true} xs={6}>
				<Radar />
			</Grid>
			<Grid item={true} xs={6}>
				<Pie />
			</Grid>
			<Grid item={true} xs={6}>
				<HorizontalBar />
			</Grid>
			<Grid item={true} xs={6}>
				<Bar />
			</Grid>
		</Grid>
	)
}

/*
import Polar from 'web/stories/component/chart/polar';

import Doughnut from 'web/stories/component/chart/doughnut';
import Line from 'web/stories/component/chart/line';
import Bubble from 'web/stories/component/chart/bubble';
import Scatter from 'web/stories/component/chart/scatter';
<Grid item={true} xs={6}>
				<Polar />
			</Grid>
			<Grid item={true} xs={6}>
				<Bubble />
			</Grid>
			<Grid item={true} xs={6}>
				<Scatter />
			</Grid>
			<Grid item={true} xs={6}>
				<Doughnut />
			</Grid>
			<Grid item={true} xs={6}>
				<Line />
			</Grid>
*/

export default DashboardContainer;
