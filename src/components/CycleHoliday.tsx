import React, { useState } from "react";
import { Button } from "react-bootstrap";

type Holiday = "🎄" | "🦃" | "🌹" | "🐇" | "📅";

const ALPHABETICAL_TRANSITIONS: Record<Holiday, Holiday> = {
    "🎄": "🐇",
    "🐇": "📅",
    "📅": "🦃",
    "🦃": "🌹",
    "🌹": "🎄"
};

const YEARLY_TRANSITIONS: Record<Holiday, Holiday> = {
    "🌹": "🐇",
    "🐇": "🦃",
    "🦃": "🎄",
    "🎄": "📅",
    "📅": "🌹"
};

export function CycleHoliday(): JSX.Element {
    const [holiday, setHoliday] = useState<Holiday>("🎄");
    return (
        <>
            <div>
                <Button
                    onClick={() => {
                        setHoliday(ALPHABETICAL_TRANSITIONS[holiday]);
                    }}
                >
                    Advance by Alphabet
                </Button>
                <Button
                    onClick={() => {
                        setHoliday(YEARLY_TRANSITIONS[holiday]);
                    }}
                >
                    Advance by Year
                </Button>
            </div>
            <span>Holiday: {holiday}</span>
        </>
    );
}
