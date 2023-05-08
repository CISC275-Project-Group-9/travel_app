import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export interface priceFilter {
    min: number;
    max: number;
}

export function FilterForm({
    onSubmit
}: {
    onSubmit: (newPrices: priceFilter) => void;
}) {
    const [newPrices, setPrices] = useState<priceFilter>({
        min: 3,
        max: 279
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrices({
            ...newPrices,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(newPrices);
        setPrices({
            min: newPrices.min,
            max: newPrices.max
        });
    };

    //const notify = () => toast("Business added sucessfully to Browse!");

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <h5>Filter by Price:</h5>
                    </Col>
                    <Col>
                        <Form.Group controlId="formMin">
                            <Form.Label
                                style={{
                                    display: "inline-block",
                                    float: "left",
                                    paddingRight: 10
                                }}
                            >
                                Min:
                                <input
                                    type="number"
                                    name="min"
                                    value={newPrices.min}
                                    onChange={handleChange}
                                />
                            </Form.Label>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formMax">
                            <Form.Label
                                style={{
                                    display: "inline-block",
                                    float: "left",
                                    paddingRight: 10
                                }}
                            >
                                Max:
                                <input
                                    type="number"
                                    name="max"
                                    value={newPrices.max}
                                    onChange={handleChange}
                                />
                            </Form.Label>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button type="submit">Filter</Button>
                    </Col>
                </Row>
            </form>
        </div>
    );
}
