import { Network } from './network.js'


export const makePrediction = (model, weather) => {
    const network = new Network(11, 8, 5);
    const m = new Blob(network)
    console.log(m);
    console.log(network.inputs)
    const answer = network.activate([1,2,3,4,5,6,7,8,9,10,11]);
    console.log(answer);
}
