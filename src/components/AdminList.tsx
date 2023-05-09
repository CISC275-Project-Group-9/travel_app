/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
/* eslint-disable @typescript-eslint/no-unused-vars */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDrag } from "react-dnd";
import "./UserList.css"; 

import destinationsData from "../data/destinations.json";

import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle
} from "react-beautiful-dnd";
import { Form, FormGroup } from "react-bootstrap";
import { DestItem } from "./DestItem";

const { DESTINATIONS }: Record<string, Destination[]> =
    // Typecast the test data that we imported to be a record matching
    //  strings to the question list
    destinationsData as Record<string, Destination[]>;

const reorder = (
  list: Destination[],
  startIndex: number,
  endIndex: number
): Destination[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: 5,

  // change background colour if dragging
  background: isDragging ? "#6699CC" : "#BDBDBD",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

export function AdminList(): JSX.Element {
    const [centralList, setCentralList] = useState<Destination[]>(DESTINATIONS);
    const [editMode, setEditMode] = useState<boolean>(false);


    function editDestination(event: React.ChangeEvent<HTMLInputElement>, destId: number) {
      const newItinerary: Destination[] = [...centralList];
      const findTarget = centralList.findIndex((destination: Destination): boolean => destination.id === destId);
      const oldDest: Destination = {...newItinerary[findTarget]};
      let newDest: Destination;
      if(event.target.name === "activities"){
        newDest = { ...oldDest, [event.target.name]: event.target.value.split(",") };
      } else {
        newDest = { ...oldDest, [event.target.name]: event.target.value };
      }
      console.log("here" + event.target.name + " value: " + event.target.value)
      newItinerary.splice(findTarget, 1, newDest);
      setCentralList(newItinerary)
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
    const onDragEnd = (result: DropResult): void => {
  
        if (!result.destination) {
          return;
        }

        const items = reorder(
            centralList,
            result.source.index,
            result.destination.index
          );
          setCentralList(items);
    };
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
                return (editMode ? 
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
                  </div>
                  // </Row>
                  )
                  // return (
                    
                    // {!editMode ? 
                      // <div key={dest.id}>
                      //     <DestItem
                      //         id={dest.id}
                      //         key={dest.id}
                      //         name={dest.name}
                      //         description={dest.description}
                      //         image={dest.image}
                      //         location={dest.location}
                      //         cost={dest.cost}
                      //         days={dest.days}
                      //         activities={dest.activities}
                      //     ></DestItem>
                      // </div>
                    // :
                    // }
                  // );
              })}
          </div>
      </div>
  );

    // return (
    //     <div>
    //     <Container>
    //       <Row>
    //         <h3>Destinations:</h3>
    //         <p style={{margin: 0}}>Change Edit Mode</p>
    //         <Form.Check
    //           type="switch"
    //           id="editModeSwitch"
    //           checked={editMode}
    //           onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
    //           setEditMode(event.target.checked)}/>
    //            <DragDropContext onDragEnd={onDragEnd}>
    //            <Col>
    //             <Droppable droppableId="central-list">
    //               {(provided, snapshot): JSX.Element => (
    //                 <div
    //                   {...provided.droppableProps}
    //                   ref={provided.innerRef}
    //                   className="container"
    //                 >
    //                   <div className="panel-group">                        
    //                     {centralList.map((item, index) => (
    //                       <Draggable
    //                         key={item.id}
    //                         draggableId={String(item.id)}
    //                         index={index}
    //                       >
    //                         {(provided, snapshot): JSX.Element => (
    //                           <div
    //                             ref={provided.innerRef}
    //                             {...provided.draggableProps}
    //                             {...provided.dragHandleProps}
    //                             style={getItemStyle(
    //                               snapshot.isDragging,
    //                               provided.draggableProps.style
    //                             )}
    //                             className="panel panel-default"
    //                           >{!editMode ? <Row>
    //                             <Col xs={5}>                                      
    //                                 <img src={require('../images/' + item.image)} alt={item.location}></img>
    //                             </Col>
    //                             <Col xs={7}>
    //                               <span style={{fontWeight: 'bold', fontSize: 18, color: "#212A3E", display: "flex", justifyContent:'left', textAlign: "left"}}>{item.name}, {item.location}</span>
    //                               <span style={{display: "flex", justifyContent:'left', textAlign: "left", fontStyle: "italic"}}>{item.description}</span>
    //                               <span style={{display: "flex", justifyContent:'left', textAlign: "left"}}>Activities: {item.activities.join(", ")}</span>
    //                               <span style={{display: "flex", justifyContent:'left', textAlign: "left"}}>Cost: ${item.cost}</span>
                                  
    //                             </Col>
    //                           </Row>: 
    //                           <Form.Group controlId="editDestination">
    //                             <Form.Label style={{display: "inline-block", float: "left", paddingRight: 10}}>Name</Form.Label>
    //                             <Form.Control defaultValue={item.name} name="name" onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
    //                                     editDestination(event, item.id)} />
    //                             <Form.Label style={{display: "inline-block", float: "left", paddingRight: 10}}>Description</Form.Label>
    //                             <Form.Control defaultValue={item.description} name="description" onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
    //                                     editDestination(event, item.id)} />
    //                             <Form.Label style={{display: "inline-block", float: "left", paddingRight: 10}}>Location</Form.Label>
    //                             <Form.Control defaultValue={item.location} name="location" onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
    //                                     editDestination(event, item.id)} />
    //                             <Form.Label style={{display: "inline-block", float: "left", paddingRight: 10}}>Cost</Form.Label>
    //                             <Form.Control defaultValue={item.cost} name="cost" type="number" onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
    //                                     editDestination(event, item.id)} />
    //                             <Form.Label style={{display: "inline-block", float: "left", paddingRight: 10}}>Activities</Form.Label>
    //                             <Form.Control defaultValue={item.activities} name="activities" onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
    //                                     editDestination(event, item.id)} />
    //                           </Form.Group>
    //                           }
    //                           </div>
    //                         )}
    //                       </Draggable>
    //                     ))}
    //                     {provided.placeholder}
    //                   </div>
    //                 </div>
    //               )}
    //             </Droppable>
    //         </Col> 
    //           </DragDropContext>
    //       </Row>
    //     </Container>
    //   </div>
    // );
}
