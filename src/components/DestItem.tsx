import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import { useDrag } from "react-dnd";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import destinationsData from "../data/destinations.json";
import { Form } from "react-bootstrap";

export const { DESTINATIONS }: Record<string, Destination[]> =
        // Typecast the test data that we imported to be a record matching
        //  strings to the question list
        destinationsData as Record<string, Destination[]>;

export function DestItem({
  id,
  name,
  description,
  image,
  location,
  days,
  cost,
  activities,
}: {
    id: number, 
    name: string, 
    description: string, 
    image: string, 
    location: string, 
    days: number, 
    cost: number, 
    activities: string[]
}): JSX.Element {
    const grid = 8;

    /*
    const getItemStyle = (
        isDragging: boolean,
      ): React.CSSProperties => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        borderRadius: 5,
      
        // change background colour if dragging
        background: isDragging ? "#6699CC" : "#BDBDBD",
      });
    */

    /*
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "destination",
        item: {id: id}, 
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));
    */

    const [centralList] = useState<Destination[]>(DESTINATIONS);
    const [itinerary, setItinerary] = useState<Destination[]>([]);
    const [initialPrice] = useState<number>(0);

    function setDays(event: React.ChangeEvent<HTMLInputElement>, destId: number) {
        const newItinerary: Destination[] = [...itinerary];
        const findTarget = itinerary.findIndex((destination: Destination): boolean => destination.id === destId);
        const oldDest: Destination = {...newItinerary[findTarget]};
        const newDest: Destination = {...oldDest, days: event.target.valueAsNumber};
        newItinerary.splice(findTarget, 1, newDest);
        setItinerary(newItinerary)
    }

    return (
        <div className="panel-group">
            <Row>
                <Col xs={5}>                                      
                    <img src={require('../images/' + image)} alt={location}></img>
                </Col>
                <Col xs={7}>
                    <span style={{fontWeight: 'bold', fontSize: 18, color: "#212A3E", display: "flex", justifyContent:'left', textAlign: "left"}}>{name}, {location}</span>
                    <span style={{display: "flex", justifyContent:'left', textAlign: "left", fontStyle: "italic"}}>{description}</span>
                    <span style={{display: "flex", justifyContent:'left', textAlign: "left"}}>Activities: {activities.join(", ")}</span>
                    <span style={{display: "flex", justifyContent:'left', textAlign: "left"}}>Cost: ${cost}</span>
                </Col>
            </Row>
        </div>

        //<div ref={drag} style={getItemStyle(isDragging)}>
        /*
        <div>
            <Container>
                <Row>
                    <Col>
                    <h3>Destinations:</h3>
                    <div className="panel-group">
                        {centralList.map((item) => (
                            <div className="panel panel-default">
                                <Row>
                                    <Col xs={5}>                                      
                                        <img src={require('../images/' + item.image)} alt={item.location}></img>
                                    </Col>
                                    <Col xs={7}>
                                        <span style={{fontWeight: 'bold', fontSize: 18, color: "#212A3E", display: "flex", justifyContent:'left', textAlign: "left"}}>{item.name}, {item.location}</span>
                                        <span style={{display: "flex", justifyContent:'left', textAlign: "left", fontStyle: "italic"}}>{item.description}</span>
                                        <span style={{display: "flex", justifyContent:'left', textAlign: "left"}}>Activities: {item.activities.join(", ")}</span>
                                        <span style={{display: "flex", justifyContent:'left', textAlign: "left"}}>Cost: ${item.cost}</span>
                                    </Col>
                                </Row>
                            </div>
                        ))}         
                    </div>
                    </Col>
                    <Col>
                    <h3>Initial Price: {initialPrice} </h3>
                    <h3>My Itinerary:</h3>
                        <div className="panel-group">
                            {itinerary.map((item) => (
                                <div className="panel panel-default">
                                    <Row>
                                        <Col xs={5}>                                      
                                            <img src={require('../images/' + item.image)} alt={item.location}></img>
                                        </Col>
                                        <Col xs={7}>
                                            <span style={{fontWeight: 'bold', fontSize: 18, color: "#212A3E", display: "flex", justifyContent:'left'}}>{item.name}, {item.location}</span>
                                            <span style={{display: "flex", justifyContent:'left', textAlign: "left", fontStyle: "italic"}}>{item.description}</span>
                                            <span style={{display: "flex", justifyContent:'left', textAlign: "left"}}>Activities: {item.activities.join(", ")}</span>
                                            <span style={{display: "flex", justifyContent:'left', textAlign: "left"}}>Cost: ${item.cost}</span>
                                            <Form.Group controlId="formChangeDuration">
                                                <Form.Label  style={{display: "inline-block", float: "left", paddingRight: 10}}>Length of Stay: </Form.Label>
                                                <Form.Control
                                                    style={{width: 70, height: 25}}
                                                    type="number"
                                                    defaultValue={item.days}
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                    setDays(event, item.id)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                    
                                    </Row>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        */
        );
    };
