// import weather from './lib/weather.js'
import { makePrediction, trainModel } from './lib/model.js'

// const s = weather.getWeatherData('2654308').then(data => console.log(data));
const s = [8.5, 6.69,7.22,10,1011,97,3.04,285,4.18,100,0]
const data = makePrediction(
  s, 
  'mike'
)
data
  .then(x => console.log('Untrained: ', x))
  .then(() => trainModel(s, 'mike', [1,0,0,0,1]))
  .then((x) => console.log('Training: ', x))
  .then(() => makePrediction(s, 'mike'))
  .then(x => console.log('Testing: ', x));

