import React from 'react';
// @ts-ignore
import { GoogleCharts } from 'google-charts';
import './TimeSeries.css';

const TimeSeries: React.FC<
    {
        date?: Date[],
        value?: number[],
        valueLabel?: string,
        chartTitle?: string
    }
> = (
    {date, value, valueLabel, chartTitle}
) => {
    GoogleCharts.load(drawChart);
    const ref = React.useRef<HTMLDivElement>(null);
    function drawChart() {
        const towrite = []
        towrite.push(["Date", valueLabel])
        for (let i = 0; i < date!.length; i++) {
            towrite.push([date![i], value![i]])
        }
        const data = GoogleCharts.api.visualization.arrayToDataTable(towrite);

        const options = {
            title: chartTitle,
            hAxis: {title: 'Date',
                textStyle: {color: '#FFFFFF'},
                titleTextStyle: {color: '#FFFFFF'},
                format: 'MMM yyyy'
            },
            vAxis: {
                title: valueLabel,
                minValue: 0,
                textStyle: {color: '#FFFFFF'},
                titleTextStyle: {color: '#FFFFFF'}
            },
            backgroundColor: {fill: 'transparent'},
            titleTextStyle: {color: '#FFFFFF'},
            legend: {textStyle: {color: '#FFFFFF'},
                position: 'bottom',
                alignment: 'start'
            },
            height: 400,
        }

        const chart = new GoogleCharts.api.visualization.AreaChart(ref.current!);
        chart.draw(data, options);
    }
    const mean = value!.reduce((a, b) => a + b, 0) / value!.length
    const median = value![Math.floor(value!.length / 2)]
    const range = Math.max(...value!) - Math.min(...value!)
    const stdev = Math.sqrt(value!.reduce((a, b) => a + b * b, 0) / value!.length - mean * mean)
    const variance = stdev * stdev
    const min = Math.min(...value!)
    const max = Math.max(...value!)

    return (
        <div className={"graph"}>
            <div ref={ref}/>
            <div className={"extras"}>
                <div className={"central_tendency"}>
                    <h5>Central Tendency</h5>
                    <small>Min: {min}</small>
                    <small>Max: {max}</small>
                    <small>Mean: {mean}</small>
                    <small>Median: {median}</small>
                </div>
                <div className={"variability"}>
                    <h5>Variability</h5>
                    <small>Range: {range}</small>
                    <small>Standard Deviation: {stdev}</small>
                    <small>Variance: {variance}</small>
                </div>
            </div>
        </div>
    )
}

export default TimeSeries;