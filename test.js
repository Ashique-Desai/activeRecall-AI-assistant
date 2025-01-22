// interview 
// what is lexical scope and will the value be 1 or 0
// we have let value = 1, will this reset the value inside the second function (lexical scope)

// answer:
// no the value inside the first function is a local variable and the let value = 1 outside is a global variable
// the lexical scope will always have the reference to the lexical scope (local variable) so the value will be 0

let value = 1;

function first() {
    let value = 0; // Local variable
    return function () {
        return value; // Inner function accesses 'value' via closure.
    };
}

const getValue = first();
console.log(getValue()); // Outputs: 0


// Can you explain closures in javascript with an example ?
// I wrote the above code for this question



// Identify the bugs in the code below 

import { useRef, useEffect } from 'react';

export const RenderList = () => {
    const listRef = useRef([]);

    useEffect(() => {
        const res = await axios('https://jsonplaceholder.typicode.com/posts')
        listRef.current = res.data
    });

    return (
        <ul>
            {
                listRef.current.forEach(item => <li key={item.id}> {item.title}</li>)
            }
        </ul>
    );
}