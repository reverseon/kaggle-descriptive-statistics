import React from 'react';
import axios from "axios";
import './App.css';
import * as d3 from "d3";
import Displayer from "./components/Displayer";
import Uploader from "./components/Uploader";

function App() {
    const BASE_URL = "https://stats.b.naj.one";
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [data, setData] = React.useState<d3.DSVRowArray<string> | undefined>(undefined);
    const [isTimeSeries, setIsTimeSeries] = React.useState<boolean>(false);
    const [url, setUrl] = React.useState<string | undefined>(undefined);
    const urlRequestHandler = (url: string) => {
        setUrl(url)
        setError(undefined)
        setLoading(true)
        setData(undefined)
        axios.post(`${BASE_URL}/csv/`, {
            url: url
        }).then((response) => {
            setLoading(false)
            const datholder = d3.csvParse(response.data)
            const its =
                datholder.every((row) => {
                    return row["Date"] !== undefined
                })
            if (its) {
                setIsTimeSeries(true)
                setData(datholder)
            }
            else {
                setIsTimeSeries(false)
                setError("Non time-series data currently not implemented, Make sure it has a \"Date\" column")
            }
        }).catch((error) => {
            setLoading(false)
            if (error.response) {
                setError(error.response.data.detail);
            } else {
                setError("Something went wrong, try again later");
            }
        })
    }
    return (
        <div className="App">
            <Uploader
                urlRequestHandler={urlRequestHandler}
                placeholder={"https://www.kaggle.com/datasets/adilbhatti/bitcoin-and-stock-exchanges"}
                error={error}
                loading={loading}
            />
            {data && <Displayer data={data} url={url!} isTimeSeries={isTimeSeries}/> }
        </div>
    );
}

export default App;
