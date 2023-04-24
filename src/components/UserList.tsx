/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function UserList(): JSX.Element {
    const [centralList] = useState<Destination[]>([]);
    const [itinerary, setItinerary] = useState<Destination[]>([]);

    function addDestination(newDestination: Destination) {
        if (!itinerary.includes(newDestination)) {
            const newItinerary = [...itinerary, newDestination];
            setItinerary(newItinerary);
        }
    }

    function removeDestination(destination: Destination) {
        if (itinerary.includes(destination)) {
            const id = destination.id;
            const newItinerary = itinerary.filter(
                (dest: Destination): boolean => dest.id !== id
            );
            setItinerary(newItinerary);
        }
    }

    function clearItinerary() {
        setItinerary([]);
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h3>Destinations:</h3>
                        <link
                            rel="stylesheet"
                            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
                        ></link>
                        <body>
                            <div className="container">
                                <div className="panel-group">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            Location
                                        </div>
                                        <div className="panel-body">
                                            Activities
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            Location
                                        </div>
                                        <div className="panel-body">
                                            Activities
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            Location
                                        </div>
                                        <div className="panel-body">
                                            Actvities
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </body>
                    </Col>
                    <Col>
                        <h3>My Itinerary:</h3>
                        <ul>
                            {itinerary.map((destination: Destination) => (
                                <li key={destination.id}>{destination.name}</li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
