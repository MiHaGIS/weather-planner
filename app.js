// import weather from './lib/weather.js'
import { makePrediction, trainModel, test } from './lib/model.js'

// const s = weather.getWeatherData('2654308').then(data => console.log(data));
const s = [8.5, 6.69,7.22,10,1011,97,3.04,285,4.18,100,0]

makePrediction(s,'mike')
trainModel(s,'mike',[0,0,1,0,0])