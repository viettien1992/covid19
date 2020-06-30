import React from 'react';
import useCovid19 from '../hook/useCovid19';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    AreaSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';

import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import { scalePoint } from 'd3-scale';
import { withStyles } from '@material-ui/core/styles';
const chartRootStyles = {
    chart: {
        paddingRight: '20px',
    },
};
const legendStyles = {
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
    },
};
const legendLabelStyles = theme => ({
    label: {
        paddingTop: theme.spacing(1),
    },
});
const legendItemStyles = {
    item: {
        flexDirection: 'column',
    },
};

const ChartRootBase = ({ classes, ...restProps }) => (
    <Chart.Root {...restProps} className={classes.chart} />
);
const LegendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);
const LegendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label {...restProps} className={classes.label} />
);
const LegendItemBase = ({ classes, ...restProps }) => (
    <Legend.Item {...restProps} className={classes.item} />
);
const ChartRoot = withStyles(chartRootStyles, { name: 'ChartRoot' })(ChartRootBase);
const LegendRoot = withStyles(legendStyles, { name: 'LegendRoot' })(LegendRootBase);
const LegendLabel = withStyles(legendLabelStyles, { name: 'LegendLabel' })(LegendLabelBase);
const LegendItem = withStyles(legendItemStyles, { name: 'LegendItem' })(LegendItemBase);
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paper1: {
        padding: theme.spacing(0),
        textAlign: 'center',
        borderStyle: 'none',
        fontSize: 'larger',
        fontWeight: 'bold',
        textTransform: 'unset'
    },
}));
function Covid19() {
    const data = useCovid19();
    let a = data[0].Global;
    let deathDate = [];
    let recoveData = [];
    let date = [];
    let details = [];
    if (data[1] != undefined && data[2] != undefined && data[2] != '') {
        console.log(data[1], data[2])
        for (let i = 0; i < data[1].length; i++) {
            deathDate.push(data[1][i].Cases);
            date.push(data[1][i].Date);
            recoveData.push(data[2][i].Cases);
        }
        for (let i = 0; i < date.length; i++) {
            details.push({ date: date[i], deathed: deathDate[i], recovered: recoveData[i] });
        }

    }
    let TotalDeaths = 0;
    let TotalConfirmed = 0;
    let TotalRecovered = 0;
    if (a != undefined) {
        TotalDeaths = a.TotalDeaths;
        TotalRecovered = a.TotalRecovered;
        TotalConfirmed = a.TotalConfirmed;
    }
    const classes = useStyles();
    return (
        <div>
            <div>
                <div className={classes.root}>
                    <div className={classes.solieu}>
                        <Grid spacing={3} align-items-xs-center={12} container>
                            <Grid item xs={4}>
                                <div style={{ color: "red", fontSize: '60px', fontWeight: 'bold' }} className={classes.paper}>{TotalConfirmed}</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{ color: "black", fontSize: '60px', fontWeight: 'bold' }} className={classes.paper}>{TotalDeaths}</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{ color: "green", fontSize: '60px', fontWeight: 'bold' }} className={classes.paper}>{TotalRecovered}</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div id="item" className={classes.paper1}>Tổng số người nhiễm </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className={classes.paper1}>Tổng số người chết</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className={classes.paper1}>Tổng số người hồi phục</div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "100px" }}>
                <Grid spacing={1} xs={10}>
                    <Paper >
                        <Chart
                            data={details}
                            rootComponent={ChartRoot}
                        >
                            <ArgumentScale factory={scalePoint} />
                            <ArgumentAxis />
                            <ValueAxis />

                            <AreaSeries
                                name="Deathed"
                                valueField="deathed"
                                argumentField="date"
                            />
                            <AreaSeries
                                name="Recovered"
                                valueField="recovered"
                                argumentField="date"
                            />
                            <Animation />
                            <Legend
                                position="bottom"
                                rootComponent={LegendRoot}
                                itemComponent={LegendItem}
                                labelComponent={LegendLabel}
                            />
                            <Title
                                text="Total deathed and Recored America"
                            />
                        </Chart>
                    </Paper>
                </Grid>
            </div>
        </div>
    )
}
export default Covid19;