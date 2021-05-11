import { Network, loadNetwork } from './network.js'


export const makePrediction = async (model, weather) => {
    const network = new Network(11, 8, 5);
    await network.save('mike')
    console.log('Prediction 1: ', network.activate([1,2,3,4,5,6,7,8,9,10,11]));
    console.log('Prediction 2: ', network.activate([1,2,3,4,5,6,7,8,9,10,11]));
    const network2 = await loadNetwork('mike')
    console.log('Prediction After: ', network2.activate([1,2,3,4,5,6,7,8,9,10,11]));

    console.log(network.inputs.map(i => i.uid))
    console.log(network2.inputs.map(i => i.uid))

}

