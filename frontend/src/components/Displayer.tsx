import React from "react";
import * as d3 from "d3";
import './Displayer.css';
import TimeSeries from "./TimeSeries";

const Displayer: React.FC<
    {
        data: d3.DSVRowArray<string>
        url: string
        isTimeSeries: boolean
    }
> = (
    {data, url, isTimeSeries}
) => {
    const defaultColumnIndex = 0;
    const [selectedColumnIndex, setSelectedColumnIndex] = React.useState<number>(defaultColumnIndex);
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({behavior: "smooth", block: "start"})
        }
    }, [])
    // const data = d3.csvParse(csv)
    // const isTimeSeries = data.every((row) => {
    //     return row["Date"] !== undefined
    // })
    if (isTimeSeries) {
        data.sort((a, b) => {
            return new Date(a["Date"]!).getTime() - new Date(b["Date"]!).getTime()
        })
    }
    const [colNames, setColNames] = React.useState<string[]>(Object.keys(data[0]))
    React.useEffect(() => {
        if (isTimeSeries) {
            // sort data by date if it is a time series in ascending order
            const colNamesDup = colNames.slice()

            colNamesDup.splice(colNames.indexOf("Date"), 1)
            // remove non-numeric columns
            const ToRemove: string[] = []
            colNamesDup.forEach((colName) => {
                if (isNaN(Number(data[0][colName]))) {
                    ToRemove.push(colName)
                }
            })
            ToRemove.forEach((colName) => {
                colNamesDup.splice(colNamesDup.indexOf(colName), 1)
            })
            setColNames(colNamesDup)
        }
    }, [])
    return (
        <div className="displayer" id={"displayer"} ref={ref}>
            <div className="container">
                <h1>Descriptive Statistics { isTimeSeries ? "(Time Series)" : ""}</h1>
                <small>for <a href={url} target={"_blank"}>{url}</a></small>
                <hr/>
                <select onChange={
                    (e) => {
                        setSelectedColumnIndex(Number(e.target.value))
                    }
                }
                defaultValue={defaultColumnIndex}
                >
                    {colNames.map((colName, i) => {
                        return (
                            <option value={i} key={i}>{colName.replaceAll('_', ' ')}</option>
                        )
                    })}
                </select>
                { isTimeSeries &&
                    <TimeSeries
                        date={isTimeSeries ? data.map((row) => {
                            return new Date(Date.parse(row["Date"]!))
                            }
                        ) : undefined}
                        value={data.map((row) => {
                            return Number(row[colNames[selectedColumnIndex]])
                        })}
                        valueLabel={colNames[selectedColumnIndex].replaceAll('_', ' ')}
                        chartTitle={url}
                    />
                }
            </div>
        </div>
    )
}

export default Displayer;