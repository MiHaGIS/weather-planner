import { exists } from "https://deno.land/std@0.97.0/fs/mod.ts";

import { Network, loadNetwork } from './network.js'

export const makePrediction = async (weather, user) => {
    const network = await getModel(user);
    const result = network.activate(weather);
    return network.save(weather, user).then(() => result);
}

const getModel = async (user) => {
    if (await exists(`./models/${user}.json`)) {
        return loadNetwork(user)
    }
    return new Network(11, 8, 5)
}

export const trainModel = async (weather, user, target) => {
    const network = await getModel(user);
    network.train([[weather, target]], 1000);
    const result = network.activate(weather);
    return network.save(weather, user).then(() => result);
}