import React, { useState } from "react";
import { Button } from "react-bootstrap";

// StartAttempt
// The StartAttempt component simulates yet another part of the quiz application, this time providing a “Start” and “Stop” button for the quiz. Since the quiz should have a limited number of attempts, there is also a “Mulligan” button to give more attempts.

// You will need two pieces of state: the number of attempts and whether the quiz is in progress.
// The initial number of attempts is 4
// The quiz is initially NOT in progress
// There is a button labelled Start Quiz that puts the Quiz in progress and decreases the number of attempts by one.
// There is a button labelled Stop Quiz that stops the Quiz from being in progress.
// There is a button labelled Mulligan that increase the attempts by one.
// When the quiz is in progress, the Start Quiz and Mulligan buttons are disabled.
// When the quiz is not in progress, the Stop Quiz button is disabled.
// When the attempts are zero, the Start Quiz button is disabled.

export function StartAttempt(): JSX.Element {
    const [numAttempts, setNumAttempts] = useState<number>(4);
    const [inProgress, setInProgress] = useState<boolean>(false);
    return (
        <div>
            <Button
                onClick={() => {
                    setInProgress(true);
                    setNumAttempts(numAttempts - 1);
                }}
                disabled={inProgress || numAttempts === 0}
            >
                Start Quiz ({numAttempts} attempts left)
            </Button>
            <Button
                onClick={() => {
                    setInProgress(false);
                }}
                disabled={!inProgress}
            >
                Stop Quiz
            </Button>
            <Button
                onClick={() => {
                    setNumAttempts(numAttempts + 1);
                }}
                disabled={inProgress}
            >
                Mulligan
            </Button>
        </div>
    );
}
