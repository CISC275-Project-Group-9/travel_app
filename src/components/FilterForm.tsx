import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { priceFilter } from "../interfaces/filterSort";

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
                                    style={{ width: "70%", marginLeft: "10px", minWidth: "100px" }}

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
                                    style={{ width: "70%", marginLeft: "10px", minWidth: "100px" }}
                                />
                            </Form.Label>
                        </Form.Group>
                    </Col>
                    <Col>
                    <div style={{ textAlign: "right" }}>
                        <Button type="submit">Filter</Button>
                    </div>
                    </Col>
                </Row>
            </form>
        </div>
    );
}
