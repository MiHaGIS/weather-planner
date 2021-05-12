// import weather from './lib/weather.js'
// import { makePrediction } from './lib/model.js'

// weather.getWeatherData('2654308').then(data => console.log(data));
// makePrediction()

import React from 'react';

export default function App({ Page, pageProps }) {
  return (
    <main>
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>
      <Page {...pageProps} />
    </main>
  )
}