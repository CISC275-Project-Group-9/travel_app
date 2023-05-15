import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export interface Sort {
    sortQuery: string;
}

export function SortForm({
    onSubmit
}: {
    onSubmit: (sort: Sort) => void;
}) {
    const [sort, setSort] = useState<Sort>({
        sortQuery: "State"
    });

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSort({
            ...sort,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(sort);
        setSort({
            sortQuery: sort.sortQuery
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <h5>Sort:</h5>
                    </Col>
                    <Col>
                        <Form.Group controlId="formQuery">
                            <Form.Label
                                style={{
                                    display: "inline-block",
                                    float: "left",
                                    paddingRight: 10
                                }}
                            >
                                Sort By:
                                <select
                                name="sortQuery"
                                value={sort.sortQuery}
                                onChange={handleChange}
                                style={{ width: "70%", marginLeft: "10px", minWidth: "100px" }}
                            >
                                <option value="State">State</option>
                                <option value="Cost">Low Price</option>
                                <option value="CostDesc">High Price</option>
                            </select>
                            </Form.Label>
                        </Form.Group>
                    </Col>
                    <Col>
                    <div style={{ textAlign: "right" }}>
                        <Button type="submit">Sort</Button>
                    </div>
                    </Col>
                </Row>
            </form>
        </div>
    );
}
