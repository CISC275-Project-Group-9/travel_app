/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDrag } from "react-dnd";
import "./UserList.css"; 
import { CentralListProps } from "../interfaces/props";
import destinationsData from "../data/destinations.json";

// import {
//   DragDropContext,
//   Draggable,
//   DraggingStyle,
//   Droppable,
//   DropResult,
//   NotDraggingStyle
// } from "react-beautiful-dnd";
import { Form, FormGroup } from "react-bootstrap";
import { DestItem } from "./DestItem";

const { DESTINATIONS }: Record<string, Destination[]> =
    // Typecast the test data that we imported to be a record matching
    //  strings to the question list
    destinationsData as Record<string, Destination[]>;

const grid = 8;

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

  // styles we need to apply on draggables
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

export function AdminList({centralList, setCentralList} : CentralListProps): JSX.Element {
    // const [centralList, setCentralList] = useState<Destination[]>(DESTINATIONS);
    const [editMode, setEditMode] = useState<boolean>(false);


    function editDestination(event: React.ChangeEvent<HTMLInputElement>, destId: number) {
      const newCentralList: Destination[] = [...centralList];
      const findTarget = centralList.findIndex((destination: Destination): boolean => destination.id === destId);
      const oldDest: Destination = {...newCentralList[findTarget]};
      let newDest: Destination;
      if(event.target.name === "activities"){
        newDest = { ...oldDest, [event.target.name]: event.target.value.split(",") };
      } else {
        newDest = { ...oldDest, [event.target.name]: event.target.value };
      }
      console.log("here" + event.target.name + " value: " + event.target.value)
      newCentralList.splice(findTarget, 1, newDest);
      setCentralList(newCentralList)
    }

    
    // function newDestinationToList(newDestination: Destination) {
    //     if (!centralList.includes(newDestination)) {
    //         const newCentralList = [...centralList, newDestination];
    //         setCentralList(newCentralList);
    //     }
    // }

    // function reviewDestination(Destination: Destination) {
    //     if (centralList.includes(Destination)) {
    //         const newCentralList = [...centralList, Destination];
    //         setCentralList(newCentralList);
    //     }
    // }

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

    const [{ isDragging }, drag] = useDrag({
      type: "destItem",
      collect: (monitor) => ({
          isDragging: monitor.isDragging()
      })
  })

    return (
      <div>
          <h3>Destinations:</h3>
          <p style={{margin: 0}}>Change Edit Mode</p>
          <Form.Check
            type="switch"
            id="editModeSwitch"
            checked={editMode}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
            setEditMode(event.target.checked)}/>
          <div className="panel panel-default">
              {centralList.map((dest: Destination) => {
                return (!editMode ? 
                  <div key={dest.id}>
                    <DestItem
                        id={dest.id}
                        key={dest.id}
                        name={dest.name}
                        description={dest.description}
                        image={dest.image}
                        location={dest.location}
                        cost={dest.cost}
                        days={dest.days}
                        activities={dest.activities}
                    ></DestItem>
                  </div> 
                  : 
                  // <Row>
                  <div className="panel panel-default" style={getItemStyle(isDragging)}>
                    <Form.Group controlId="editDestination" style={{width: 1000}}>
                      <Form.Label style={{display: "inline-block", float: "left", paddingRight: 10}}>Name</Form.Label>
                      <Form.Control defaultValue={dest.name} name="name" onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                              editDestination(event, dest.id)} />
                      <Form.Label style={{display: "inline-block", float: "left", paddingRight: 10}}>Description</Form.Label>
                      <Form.Control defaultValue={dest.description} name="description" onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                              editDestination(event, dest.id)} />
                      <Form.Label style={{display: "inline-block", float: "left", paddingRight: 10}}>Location</Form.Label>
                      <Form.Control defaultValue={dest.location} name="location" onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                              editDestination(event, dest.id)} />
                      <Form.Label style={{display: "inline-block", float: "left", paddingRight: 10}}>Cost</Form.Label>
                      <Form.Control defaultValue={dest.cost} name="cost" type="number" onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                              editDestination(event, dest.id)} />
                      <Form.Label style={{display: "inline-block", float: "left", paddingRight: 10}}>Activities</Form.Label>
                      <Form.Control defaultValue={dest.activities} name="activities" onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                              editDestination(event, dest.id)} />
                    </Form.Group>
                  </div>)
              })}
          </div>
      </div>
  );
}
