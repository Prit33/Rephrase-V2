import React, { useState } from 'react'
import axios from 'axios';
import res from './res.json';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [sentence, setSentence] = useState('');

  const [copied, setCopied] = React.useState(false);


  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8b3d0f09b53012e412694610b9d0a2cb`;
  const url = `https://ai.webxspark.com/api/reword-me/rephrase?sentence=${sentence}&key=GSAFHP-XAB6AA-J5MENA-WXP-AI`;

  const onCopy = React.useCallback(() => {
    setCopied(true);
  }, [])



  const rephrase = (event) => {
    axios.get(url).then((response) => {
      setData(response.data.response.sentences)
      console.log(response.data)
    })
    // setData(res.response.sentences);
    // console.log(data[1])
    // console.log(response.response.sentences)
    // }
  }

  return (
    <div className="App">
      <div className="nav">
        <h1 className='title'>#Rephrase It</h1>
      </div>
      <div className='search'>
        <textarea
          value={sentence}
          onChange={event => setSentence(event.target.value)}
          // onKeyPress={rephrase}
          placeholder='type sentence to be rephrased, sentence must have atleast 3 words'
          type='text' />
        <button onClick={rephrase} className='animated-button'>Rephrase</button>
      </div>

      <div className="res">
        {data !== undefined &&
          <div className='phrases'>
            <ul>
              <h4>#Click to copy</h4><br></br>
              {data.map((phrase, i) =>
                <>
                  <CopyToClipboard onCopy={onCopy} text={phrase} className='phrase'>
                    <li>{phrase}</li>
                  </CopyToClipboard>
                </>
              )}

            </ul>

          </div>
        }

      </div>
    </div>

  );
}

export default App;
