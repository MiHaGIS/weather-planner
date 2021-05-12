import { Network } from './network.js'

const network = new Network(11, 8, 5);


export const makePrediction = async (weather) => {
    return network.activate(weather);
}

