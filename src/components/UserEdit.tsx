import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import { useDrag } from "react-dnd";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import destinationsData from "../data/destinations.json";
import { Button, Form, FormGroup } from "react-bootstrap";

export const { DESTINATIONS }: Record<string, Destination[]> =
  // Typecast the test data that we imported to be a record matching
  //  strings to the question list
  destinationsData as Record<string, Destination[]>;

export function UserEdit({
  id,
  name,
  description,
  image,
  location,
  days,
  cost,
  activities,
  editDestination,
}: {
  id: number;
  name: string;
  description: string;
  image: string;
  location: string;
  days: number;
  cost: number;
  activities: string[];
  editDestination: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
}): JSX.Element {
  const grid = 8;

//   const getItemStyle = (isDragging: boolean): React.CSSProperties => ({
//     // some basic styles to make the items look a bit nicer
//     userSelect: "none",
//     padding: grid * 2,
//     margin: `${grid}px ${grid}px 0 0`,
//     borderRadius: 5,

//     // change background colour if dragging
//     background: isDragging ? "#6699CC" : "#BDBDBD",
//   });

  const [dest] = useState<Destination>({
    id,
    name,
    description,
    image,
    location,
    days,
    cost,
    activities,
  });

  const [{ isDragging }, drag] = useDrag({
    type: "destItem",
    item: { name: dest.name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      className="panel panel-default"
      style={{
        userSelect: "none",
        padding: grid * 2,
        margin: `${grid}px ${grid}px 0 0`,
        borderRadius: 5,
        background: "#BDBDBD",
      }}
    >
      <Col xs={5}>
        <img src={require("../images/" + image)} alt={location}></img>
      </Col>
      <Col xs={7}>
        <span
          data-testid="title"
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: "#212A3E",
            display: "flex",
            justifyContent: "left",
            textAlign: "left",
          }}
        >
          {name}, {location}
        </span>
        <span
          data-testid="description"
          style={{
            display: "flex",
            justifyContent: "left",
            textAlign: "left",
            fontStyle: "italic",
          }}
        >
          {description}
        </span>
      </Col>
      <Form.Group>
        <Form.Label
          style={{
            display: "inline-block",
            float: "left",
            paddingRight: 10,
          }}
        >
          Activities
        </Form.Label>
        <Form.Control
          data-testid={"editActivities" + dest.id}
          defaultValue={dest.activities}
          name="activities"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            editDestination(event, dest.id)
          }
        />
      </Form.Group>
    </div>
  );
}
