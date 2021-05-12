import React from 'react'

export default function Home() {
  return (
    <div className="page">
      <head>
        <title>Weather App</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <h1>The Amazing Weather App 🌤🧤</h1>
      <p>Never have to ask somebody if you should wear a coat again!</p>
      
      <div>
        <a className="counter">Train</a>
        <a className="counter" href='./predict'>Predict</a>
      </div>
    </div>
  )
}
