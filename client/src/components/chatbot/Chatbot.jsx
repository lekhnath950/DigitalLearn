import React from "react";
import './Chatbot.css';
import Chip from '@mui/material/Chip'

export default function Chatbot({ askme, setInput, result }) {
  return (
    <>
    <div>

      <div className="chatbot">
        <div>
          <h1>ChatBot</h1>
        </div>

        <div>
          Ask me Anything!
        </div>

        <div>
      <textarea className="text-area" cols={30} rows={2} onChange={(e) => setInput(e.target.value)} />

        </div>
      <button className="action-btn" onClick={askme}>
        Ask
      </button>

      <div>

      </div>
      {/* <Chip variant="outlined" label={result.length > 0 ? result : null} /> */}
        <h6 className="result-text">{result.length > 0 ? result : ""}</h6>
      </div>



    </div>
    </>
  );
}
