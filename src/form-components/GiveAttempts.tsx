import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

export function GiveAttempts(): JSX.Element {
    const [attemptsLeft, setAttemptsLeft] = useState<number>(3);
    const [attemptsToAdd, setAttemptsToAdd] = useState<string>("");

    const handleTakeQuiz = () => {
        if (attemptsLeft > 0) {
            setAttemptsLeft(attemptsLeft - 1);
        }
    };

    const handleAddAttempts = () => {
        const parsedAttemptsToAdd = parseInt(attemptsToAdd);
        if (!isNaN(parsedAttemptsToAdd)) {
            setAttemptsLeft(attemptsLeft + parsedAttemptsToAdd);
            setAttemptsToAdd("");
        }
    };

    return (
        <div>
            <h3>Attempts left: {attemptsLeft}</h3>
            <Form.Group controlId="formAttempts">
                <Form.Label>Additional attempts:</Form.Label>
                <Form.Control
                    type="number"
                    value={attemptsToAdd}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAttemptsToAdd(event.target.value)
                    }
                />
            </Form.Group>
            <Button
                variant="primary"
                onClick={handleTakeQuiz}
                disabled={attemptsLeft <= 0}
            >
                Use
            </Button>{" "}
            <Button variant="primary" onClick={handleAddAttempts}>
                Gain
            </Button>
        </div>
    );
}
