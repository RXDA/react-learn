import React, {useEffect, useState} from "react";


export const Clock2 = () => {
    const [clock, setClock] = useState({
        date: new Date(),
    });
    useEffect(() => {
        console.log(clock)
        const t = setInterval(
            () => setClock({date: new Date()}),
            1000
        );
        return () => clearInterval(t)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {clock.date.toLocaleTimeString()}.</h2>
        </div>
    );
}

export const Counter = () => {
    let initCount = 0
    const [count, setCount] = useState(initCount);
    useEffect(() => {
        console.log(count)
        const t = setInterval(
            () => setCount(initCount++),
            10
        );
        return () => clearInterval(t)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>{count}</h2>
        </div>
    );
}

export const Counter3 = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log(count)
        const t = setInterval(
            () => setCount(count+1),
            10
        );
        return () => clearInterval(t)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>{count}</h2>
        </div>
    );
}
