import React, { useState } from "react";
import "./App.css";
import axios from "axios";
const serverAddress = "http://localhost:8080";

let config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const App = () => {
  const [longurl, setLongurl] = useState("");
  const [shorturl, setShorturl] = useState("");
  const [err, setErr] = useState([]);
  const [response, setResponse] = useState({
    id: "",
    urllong: "",
    urlshort: "",
    createdAt: "",
    updatedAt: "",
    accessed: null,
  });

  const submit = () => {
    const shortUrlMinReqSize = 4;
    const data = JSON.stringify({
      longUrl: longurl,
      shortUrl: shorturl,
    });

    config.url = `${serverAddress}/submit`;
    config.method = "post";
    config.data = data;

    if (shorturl.length > 0 && shorturl.length < shortUrlMinReqSize) {
      setErr("Short URL must have min 4 chars");
    }

    if (!longurl || longurl.length === 0) {
      if (shorturl.length > 0) {
        config.method = "get";
        config.url = `${serverAddress}/${shorturl}/stats`;
      }
    }

    axios(config)
      .then((response) => {
        if (response.data[0]?.error) {
          setErr(response.data[0].error);
          setResponse({});
        } else {
          setResponse({
            ...response.data,
            urlshort: `${serverAddress}/${response.data.urlshort}`,
          });
          setErr("");
        }
      })
      .catch((error) => {
          setErr(error.message? error.message: error);
      });
  };

  const updateLongurl = (e) => {
    setLongurl(e.target.value);
  };
  const updateShorturl = (e) => {
    setShorturl(e.target.value);
  };

  return (
    <>
      <div className="form">
        <input
          className="form-item"
          type="text"
          onChange={(e) => updateLongurl(e)}
          placeholder="Long URL"
        />
        <input
          className="form-item"
          type="text"
          onChange={(e) => updateShorturl(e)}
          placeholder="Short Url"
        />
        <button className="form-button" onClick={submit}>
          Submit
        </button>

        <div className="error">{err}</div>

        {response.id && (
          <div className="report">
            <div className="form-info">
              URL long: <a href={response.urllong}>{response.urllong}</a>
            </div>
            <div className="form-info">
              URL short: <a href={response.urlshort}>{response.urlshort.replace(serverAddress, "")}</a>
            </div>
            <div className="form-info">Created at:{response.createdAt}</div>
            <div className="form-info">
              Last accessed date:{response.updatedAt}
            </div>
            <div className="form-info">
              Accessed times: {response.accessed || 0}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
