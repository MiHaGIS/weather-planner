import { nanoid } from "https://deno.land/x/nanoid/mod.ts"

const dot = (a, b) => {
    return a.map((x,i) => a[i] * b[i]).reduce((m,n) => m + n );
}

export class Neuron {
    constructor(
        uid=nanoid(),
        bias=Math.random() * 2 - 1,
        output=null,
        reverse_output=null,
        error=0,
    ) {
        this.uid = uid,
        this.bias = bias,
        this.incoming = [];
        this.outgoing = [];
        this._output=reverse_output;
        this.output=output;
        this.error=error;
    }

    connect(neuron, weight=Math.random() * 2 - 1) {
        this.outgoing.push({neuron, weight});
        neuron.incoming.push({neuron: this, weight}); // add this neuron to the incoming list of the new neuron
    };

    activate(input=null) {
        if (input !== null) { // If it has an input this is an input node
            this.output = input;
        }
        else {
            const dotPod = dot(
                this.incoming.map(i => i.neuron.output), 
                this.incoming.map(i => i.weight)
            );
            this.output = sigmoid(dotPod + this.bias);
            this._output = reverseSigmoid(dotPod + this.bias);
        }
        return this.output;
    };

    propagate(target=null, learningRate=0.3) {
        if (target !== null) {
            this.error = (this.output - target) * this._output
        }
        else {
            this.outgoing.map(n => {
                const ind = n.neuron.incoming.findIndex(i => i.neuron.uid === this.uid);
                n.neuron.incoming[ind].weight -= learningRate * n.neuron.error * this.output;
            });
            const dotPod = dot(
                this.outgoing.map(n => n.neuron.error),
                this.outgoing.map(n => n.weight)
            );
            this.error = dotPod * this._output
        }
        this.bias -= learningRate * this.error;
        return this.error;
    }

    save() {
        return {
            bias: this.bias,
            output: this.output,
            reverse_output: this._output,
            error: this.error,
            outgoing: this.outgoing.map(out => {
                return {
                    uid: out.neuron.uid,
                    weight: out.weight,
                }
            })
        }
    }
}

const sigmoid = (x) => {
    return 1 / (1 + Math.exp(-x));
}

const reverseSigmoid = (x) => {
    return sigmoid(x) * (1 - sigmoid(x));
};
