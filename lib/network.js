import { nanoid } from "https://deno.land/x/nanoid/mod.ts"

export const buildNetwork = (input, hidden, output) => {
    const network = {
        nuerons: {},
        inputNodes: [],
        hiddenNodes: [],
        outputNodes: [],
    }
    for (let i = 0; i < input; i++) {
        const nueron = newNueron()
        network.nuerons = {...network.nuerons, ...nueron}
        network.inputNodes.push(Object.keys(nueron)[0])
    }

    for (let i = 0; i < hidden; i++) {
        const nueron = newNueron()
        network.nuerons = {...network.nuerons, ...nueron}
        network.hiddenNodes.push(Object.keys(nueron)[0])
    }

    for (let i = 0; i < output; i++) {
        const nueron = newNueron()
        network.nuerons = {...network.nuerons, ...nueron}
        network.outputNodes.push(Object.keys(nueron)[0])
    }

    network.inputNodes.map(input => {
        network.hiddenNodes.map(hidden => {
            connectNuerons(
                network.nuerons[input], 
                network.nuerons[hidden]
            )
        })
    })

    network.hiddenNodes.map(input => {
        network.outputNodes.map(hidden => {
            connectNuerons(
                network.nuerons[input], 
                network.nuerons[hidden]
            )
        })
    })

    return network
}

export const activate = (network, inputs) => {
    network.inputNodes.forEach((id, i) => {
        network.nuerons[id].output = inputs[i]
    });
    network.hiddenNodes.forEach((id) => {
        const weightedOutputs = dotProduct(
            network.nuerons[id].incoming.map(i => network.nuerons[i.id].output),
            network.nuerons[id].incoming.map(i => i.weight)
        )
        network.nuerons[id].output = sigmoid(
            weightedOutputs + network.nuerons[id].bias
        )
        network.nuerons[id].reverseOutput = reverseSigmoid(
            weightedOutputs + network.nuerons[id].bias
        )
    });
    network.outputNodes.forEach((id) => {
        const weightedOutputs = dotProduct(
            network.nuerons[id].incoming.map(i => network.nuerons[i.id].output),
            network.nuerons[id].incoming.map(i => i.weight)
        )
        network.nuerons[id].output = sigmoid(
            weightedOutputs + network.nuerons[id].bias
        )
        network.nuerons[id].reverseOutput = reverseSigmoid(
            weightedOutputs + network.nuerons[id].bias
        )
    });
    return network;
}

export const train = (network, trainingData, iterations=10000) => {
    while (iterations > 0 ) {
        trainingData.map(d => {
            network = activate(network, d[0]);
            network = propagate(network, d[1]);
        });
        iterations--;
    };
    return network 
}

const newNueron = () => { 
    const id = nanoid()
    return {
        [id]: {
            id,
            bias: Math.random() * 2 - 1,
            output: 0,
            reverseOutput: 0,
            error: 0,
            incoming: [],
            outgoing: []
        }
    }
}

const connectNuerons = (a, b) => {
    const weight = Math.random() * 2 - 1
    a.outgoing.push({
        id: b.id, 
        weight
    })
    b.incoming.push({
        id: a.id,
        weight
    })
}

const propagate = (network, targets, learningRate=0.5) => {
    network.outputNodes.forEach((id, i) => {
        network.nuerons[id].error = (network.nuerons[id].output - targets[i]) * network.nuerons[id].reverseOutput
        network.nuerons[id].bias -= learningRate * network.nuerons[id].error
    })
    network.hiddenNodes.forEach((id) => {
        network.nuerons[id].outgoing.forEach((out) => {
            network.nuerons[out.id].incoming.forEach((input, index) => {
                network.nuerons[out.id].incoming[index].weight -= (
                    learningRate * 
                    network.nuerons[out.id].error * 
                    network.nuerons[id].output
                )
            })
        })
        const weightedOutputs = dotProduct(
            network.nuerons[id].outgoing.map(i => network.nuerons[i.id].error),
            network.nuerons[id].outgoing.map(i => i.weight)
        )
        network.nuerons[id].error = weightedOutputs * network.nuerons[id].reverseOutput
        network.nuerons[id].bias -= learningRate * network.nuerons[id].error
    })
    network.inputNodes.forEach((id) => {
        network.nuerons[id].outgoing.forEach((out) => {
            network.nuerons[out.id].incoming.forEach((input, index) => {
                network.nuerons[out.id].incoming[index].weight -= (
                    learningRate * 
                    network.nuerons[out.id].error * 
                    network.nuerons[id].output
                )
            })
        })
        const weightedOutputs = dotProduct(
            network.nuerons[id].outgoing.map(i => network.nuerons[i.id].error),
            network.nuerons[id].outgoing.map(i => i.weight)
        )
        network.nuerons[id].error = weightedOutputs * network.nuerons[id].reverseOutput
        network.nuerons[id].bias -= learningRate * network.nuerons[id].error
    })
    return network
}

const sigmoid = (x) => {
    return 1 / (1 + Math.exp(-x));
}

const reverseSigmoid = (x) => {
    return sigmoid(x) * (1 - sigmoid(x));
};

const dotProduct = (a, b) => {
    return a.map((x,i) => a[i] * b[i]).reduce((m,n) => m + n );
}