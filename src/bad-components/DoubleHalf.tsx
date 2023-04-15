import React, { useState } from "react";
import { Button } from "react-bootstrap";
//import { dhValue, setDhValue } from "./DoubleHalfState";

function Doubler({
    val,
    f
}: {
    val: number;
    f: (val: number) => void;
}): JSX.Element {
    return <Button onClick={() => f(val)}>Double</Button>;
}

function Halver({
    val,
    f
}: {
    val: number;
    f: (val: number) => void;
}): JSX.Element {
    return <Button onClick={() => f(val)}>Halve</Button>;
}

export function DoubleHalf(): JSX.Element {
    const [dhValue, setDhValue] = useState<number>(10);

    const dbl = () => {
        setDhValue(2 * dhValue);
    };

    const hlf = () => {
        setDhValue(0.5 * dhValue);
    };

    return (
        <div>
            <h3>Double Half</h3>
            <div>
                The current value is: <span>{dhValue}</span>
            </div>
            <Doubler val={dhValue} f={dbl}></Doubler>
            <Halver val={dhValue} f={hlf}></Halver>
        </div>
    );
}
