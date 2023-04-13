import React from 'react';
import './Uploader.css';

const Uploader: React.FC<
    {
        urlRequestHandler: (url: string) => void,
        placeholder: string,
        error?: string,
        loading: boolean
    }
> = (
    {urlRequestHandler, placeholder, error, loading}
) => {
    const formGenerateHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const kaggleurl = (event.target as HTMLFormElement).kaggleurl.value;
        urlRequestHandler(kaggleurl === "" ? placeholder : kaggleurl);
    }
    return (
        <div className="uploader">
            <div className="uploader-title-container">
                <h1>Kaggle Descriptive Statistics Generator</h1>
                <h5>
                    Generate a descriptive statistics from Kaggle dataset URL.
                </h5>
                <small className={"help"}>Just press generate and see what happens</small>
                <form id="form-csv" onSubmit={formGenerateHandler}>
                    <input type="text" name="kaggleurl" id="kaggleurl" placeholder={placeholder}/>
                    <button type="submit" aria-busy={loading}
                        disabled={loading}
                    >
                        {loading ? "Fetching..." : "Generate"}
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>
                <small>Built using <a href="https://react.dev" target="_blank">React</a>, <a href={"https://developers.google.com/chart"} target={"_blank"}>Google Chart</a>, and <a href={"https://picocss.com"} target={"_blank"}>Pico.css</a>.</small>
            </div>
        </div>
    )
}

export default Uploader;