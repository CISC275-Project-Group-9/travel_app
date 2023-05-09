import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export interface SearchFilter {
    searchQuery: string;
}

export function SearchForm({
    onSubmit
}: {
    onSubmit: (sq: SearchFilter) => void;
}) {
    const [searchFilter, setSearchFilter] = useState<SearchFilter>({
        searchQuery: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchFilter({
            ...searchFilter,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(searchFilter);
        setSearchFilter({
            searchQuery: ""
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <h5>Search by State Abbreviation:</h5>
                    </Col>
                    <Col>
                        <Form.Group controlId="formName">
                            <Form.Label
                                style={{
                                    display: "inline-block",
                                    float: "left",
                                    paddingRight: 10
                                }}
                            >
                                <input
                                    type="text"
                                    name="searchQuery"
                                    value={searchFilter.searchQuery}
                                    onChange={handleChange}
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </Form.Label>
                        </Form.Group>
                    </Col>
                    <Col></Col>
                    <Col>
                    <div style={{ textAlign: "right" }}>
                        <Button type="submit">Search</Button>
                    </div>
                    </Col>
                </Row>
            </form>
        </div>
    );
}
