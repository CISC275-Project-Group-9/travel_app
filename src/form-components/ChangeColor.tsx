import React, { useState } from "react";
import { Form } from "react-bootstrap";

const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
    "black"
];

export function ChangeColor(): JSX.Element {
    const [selectedColor, setSelectedColor] = useState<string>(colors[0]);

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(event.target.value);
    };

    return (
        <div>
            <h3>Select a color:</h3>
            {colors.map((color) => (
                <Form.Group key={color} controlId={`color-${color}`}>
                    <Form.Check
                        inline
                        type="radio"
                        label={color}
                        value={color}
                        checked={selectedColor === color}
                        onChange={handleColorChange}
                    />
                </Form.Group>
            ))}
            <div
                data-testid="colored-box"
                style={{ backgroundColor: selectedColor }}
            >
                <h4 style={{ color: "white" }}>
                    You selected {selectedColor}.
                </h4>
            </div>
        </div>
    );
}
