import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function RevealAnswer(): JSX.Element {
    const [visible, setVisible] = useState(false);
    return (
        <div>
            <Button
                onClick={() => {
                    setVisible(!visible);
                }}
            >
                Reveal Answer
            </Button>
            {visible ? <p>42</p> : null}
        </div>
    );
}
