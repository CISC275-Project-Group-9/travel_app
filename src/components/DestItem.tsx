import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import { useDrag } from "react-dnd";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import destinationsData from "../data/destinations.json";

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
    activities: string[], 
}): JSX.Element {
    const grid = 8;

    const getItemStyle = (
        isDragging: boolean,
      ): React.CSSProperties => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `${grid}px ${grid}px 0 0`,
        borderRadius: 5,
      
        // change background colour if dragging
        background: isDragging ? "#6699CC" : "#BDBDBD",
      });

    const [dest] = useState<Destination>({
        id, 
        name, 
        description, 
        image, 
        location, 
        days, 
        cost, 
        activities
    });

    const [{ isDragging }, drag] = useDrag({
        type: "destItem",
        item: {name: dest.name},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <Col>
                <div data-testid={"box" + id} ref={drag} style={getItemStyle(isDragging)}>
                    <Row>
                        <Col xs={5}>                                      
                            <img src={require('../images/' + image)} alt={location}></img>
                        </Col>
                        <Col xs={7}>
                            <span data-testid="title" style={{fontWeight: 'bold', fontSize: 18, color: "#212A3E", display: "flex", justifyContent:'left', textAlign: "left"}}>{name}, {location}</span>
                            <span data-testid="description" style={{display: "flex", justifyContent:'left', textAlign: "left", fontStyle: "italic"}}>{description}</span>
                            <span data-testid="activities" style={{display: "flex", justifyContent:'left', textAlign: "left"}}>Activities: {activities.join(", ")}</span>
                            <span data-testid="cost" style={{display: "flex", justifyContent:'left', textAlign: "left"}}>Cost: ${cost}</span>
                        </Col>
                    </Row>
                </div>       
        </Col>
        );
    };
