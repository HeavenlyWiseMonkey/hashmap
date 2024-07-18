import {HashMap, HashSet} from './hashmap.js';

// const test = new HashMap(16);
// test.set('apple', 'red');
// test.set('banana', 'yellow');
// test.set('carrot', 'orange');
// test.set('dog', 'brown');
// test.set('elephant', 'gray');
// test.set('frog', 'green');
// test.set('grape', 'purple');
// test.set('hat', 'black');
// test.set('ice cream', 'white');
// test.set('jacket', 'blue');
// test.set('kite', 'pink');
// test.set('lion', 'golden');
// test.set('moon', 'silver');
// test.remove('apple');
// for (let i=0; i<test.map.length; i++) {
//     if (test.map[i]) {
//         console.log(test.map[i]);
//     }
// }

const test = new HashSet(16);
test.set('apple');
test.set('banana');
test.set('carrot');
test.set('dog');
test.set('elephant');
test.set('frog');
test.set('grape');
test.set('hat');
test.set('ice cream');
test.set('jacket');
test.set('kite');
test.set('lion');
test.set('moon');
console.log(test.array);