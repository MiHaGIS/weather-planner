import { exists } from "https://deno.land/std@0.97.0/fs/mod.ts";

import { buildNetwork, activate, train } from './network.js'

export const makePrediction = async (weather, user) => {
    let model = await getModel(user);
    model = activate(model, weather)
    console.log(getResult(model))
    await saveModel(user, model)
}

const getModel = async (user) => {
    if (await exists(`./models/${user}.json`)) {
        const data = await Deno.readTextFile(`./models/${user}.json`)
        return JSON.parse(data)
    }
    return buildNetwork(11,22,5)
}

const saveModel = async (user, network) => {
    const data = JSON.stringify(network)
    const write = await Deno.writeTextFile(`./models/${user}.json`, data)
    return 'completed'
}

export const trainModel = async (weather, user, target) => {
    let network = await getModel(user);
    network = train(network, [
        [weather, target]
    ])
    network = activate(network, weather)
    console.log(getResult(network))
    await saveModel(user, network)
}

export const test = () => {
    let model = buildNetwork(2,4,1)
    model = activate(model, [1,0])
    console.log('[1, 0]: ', getResult(model))
    model = activate(model, [1,1])
    console.log('[1, 1]: ', getResult(model))
    model = activate(model, [0,0])
    console.log('[0, 0]: ', getResult(model))
    model = activate(model, [0,1])
    console.log('[0, 1]: ', getResult(model))
    model = train(model, [
        [[1,0], [1]],
        [[1,1], [1]],
        [[0,1], [1]],
        [[0,0], [0]]
    ])
    console.log('Trained.....\n');
    model = activate(model, [1,0])
    console.log('[1, 0]: ', getResult(model))
    model = activate(model, [1,1])
    console.log('[1, 1]: ', getResult(model))
    model = activate(model, [0,0])
    console.log('[0, 0]: ', getResult(model))
    model = activate(model, [0,1])
    console.log('[0, 1]: ', getResult(model))
    // console.log(JSON.stringify(model))

    
}

const getResult = (network) => {
    const results = network.outputNodes.map(out => {
        return network.nuerons[out].output > 0.5 ? 1 : 0
    })
    return results
}