import React from 'react';
import { makePrediction } from "../lib/model.js"

export default function Home() {

  const getPrediction = async () => {
      console.log("Hello, World!")
      const prediction = await makePrediction([1,2,3,4,5,6,7,8,9,10,11]);
      console.log({prediction})
  }

  return (
    <div className="page">
      <head>
        <title>Weather App</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <h1>The Amazing Weather App 🌤🧤</h1>
      <p>Never have to ask somebody if you should wear a coat again!</p>
      <div>
          <h2>click the button below to start the prediction</h2>
          <button className="counter" onClick={getPrediction}> WHAT SHOULD I WEAR?</button>
      </div>
      <div>
          <p>Please wait...</p>
      </div>
      <div>
          <button className='counter'>T-shirt</button>
          <button className='counter'>Jumper</button>
          <button className='counter' id="selected">Light Jacket</button>
          <button className='counter'>Coat</button>
          <button className='counter'>Hat, Gloves and Scarf</button>
      </div>
      
    </div>
  )
}
