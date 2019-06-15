const abc = 1;

interface Iexample {
    id: string;
    name: string;
}

export default class example implements Iexample {
    public id: string;
    public name: string;

    constructor(id, name) {
        this.id = id; 
        this.name = name;
    }

    public getName() {
        return this.name;
    }
}

const test = new example('123', 'jay');

const a  =test.getName();
const ooo = a.charAt(0);

var i = 0;
var gg;
for (const iterator of a) {
    gg = iterator.charAt(i)
    i++;
    gg
}

