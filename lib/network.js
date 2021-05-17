import { Neuron } from './neuron.js'

export class Network {
    constructor(
            inputs, 
            hidden, 
            outputs
        ) {
        this.inputs = [...Array(inputs)].map(() => new Neuron());
        this.hidden = [...Array(hidden)].map(() => new Neuron());
        this.outputs = [...Array(outputs)].map(() => new Neuron());

        this.inputs.map(i => {
            this.hidden.map(h => i.connect(h));
        });
        this.hidden.map(h => {
            this.outputs.map(o => h.connect(o));
        });
    };

    activate(input) {
        this.inputs.forEach((nueron, i ) => nueron.activate(input[i]));
        this.hidden.forEach((neuron) => neuron.activate());
        return this.outputs.map(neuron => neuron.activate());
    };

    propagate(target) {
        this.outputs.forEach((neuron, t) => neuron.propagate(target[t]));
        this.hidden.forEach(neuron => neuron.propagate());
        return this.inputs.forEach(neuron => neuron.propagate()); 
    };

    train(datasets, interations=1000) {
        console.log('\nTraining the network... 🥊')
        while (interations > 0 ) {
            datasets.map(d => {
                this.activate(d[0]);
                this.propagate(d[1]);
            });
            interations--;
        };
        console.log('Training complete ✅\n')
    }

    save(weather, user) {
        const nuerons = {}
        this.inputs.forEach(n => {
            nuerons[n.uid] = n.save()
        })
        this.hidden.forEach(n => {
            nuerons[n.uid] = n.save()
        })
        this.outputs.forEach(n => {
            nuerons[n.uid] = n.save()
        })
        const output = {
            nuerons,
            inputs: this.inputs.map(i => i.uid),
            hidden: this.hidden.map(i => i.uid),
            outputs: this.outputs.map(i => i.uid),
            weather
        }
        const write = Deno.writeTextFile(
            `./models/${user}.json`, 
            JSON.stringify(output)
        )

        return write
        
    }

};

const example = {
    nuerons: {
        "aaa": {
            bias: 0.2,
            outgoing: [
                {
                    uid: "ccc",
                    weight: 0.1
                }, {
                    uid: "ddd",
                    weight: 0.2
                }
            ]
        },
        "bbb": {
            bias: 0.2,
            outgoing: [
                {
                    uid: "ccc",
                    weight: 0.4
                }, {
                    uid: "ddd",
                    weight: 0.5
                }
            ]
        },
        "ccc": {
            bias: 0.2,
            outgoing: [
                {
                    uid: "eee",
                    weight: 0.1
                }, {
                    uid: "fff",
                    weight: 0.2
                }
            ]
        },
        "ddd": {
            bias: 0.2,
            outgoing: [
                {
                    uid: "eee",
                    weight: 0.4
                }, {
                    uid: "fff",
                    weight: 0.5
                }
            ]
        },
        "eee": {
            bias: 0.2,
            outgoing: [ ]
        },
        "fff": {
            bias: 0.2,
            outgoing: [ ]
        }
    }, 
    inputs: ["aaa", "bbb"],
    hidden: ["ccc", "ddd"],
    outputs: ["eee", "fff"]
}

export const loadNetwork = async (user) => {
    const text = await Deno.readTextFile(`./models/${user}.json`)
    const json = await JSON.parse(text)
    const nuerons = {}
    for (const [key, value] of Object.entries(json.nuerons)) {
        nuerons[key] = new Neuron(
            key, 
            value.bias, 
            value.output, 
            value.reverse_output,
            value.error
        )
    }

    for (const [key, value] of Object.entries(json.nuerons)) {
        value.outgoing.forEach(
            (out) => {
                nuerons[key].connect(nuerons[out.uid], out.weight)
            }
        )
    }

    const network =  new Network(0, 0, 0)
    network.inputs = json.inputs.map(id => nuerons[id])
    network.hidden = json.hidden.map(id => nuerons[id])
    network.outputs = json.outputs.map(id => nuerons[id])
    return network
}


