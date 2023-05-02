/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
import { Form } from "react-bootstrap";

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

const UserList = (): JSX.Element => {
    const [centralList, setCentralList] = useState<Destination[]>(DESTINATIONS);
    const startItinerary: Destination[] = DESTINATIONS.splice(0,1)
    const [itinerary, setItinerary] = useState<Destination[]>(startItinerary);
    
   const onDragEnd = (result: DropResult): void => {
  
      if (!result.destination) {
        return;
      }
      
      if (result.destination.droppableId === result.source.droppableId) {
        if (result.destination.droppableId === "central-list") {
          const items = reorder(
            centralList,
            result.source.index,
            result.destination.index
          );
          setCentralList(items);
        } else if (result.destination.droppableId === "itinerary") {
          const items = reorder(
            itinerary,
            result.source.index,
            result.destination.index
          );
          setItinerary(items);
        }
      } else { // dropped in a different list
        if (result.destination.droppableId === "itinerary") {
          const item = centralList[result.source.index];
          const newItinerary = [...itinerary]; 
          newItinerary.splice(result.destination.index, 0, item);
          setItinerary(newItinerary);
          const newCentralList = [...centralList]; 
          newCentralList.splice(result.source.index, 1);
          setCentralList(newCentralList);
        } else if (result.destination.droppableId === "central-list") {
          const item = itinerary[result.source.index];
          const newCentralList = [...centralList]; 
          newCentralList.splice(result.destination.index, 0, item);
          setCentralList(newCentralList);
          const newItinerary = [...itinerary]; 
          newItinerary.splice(result.source.index, 1);
          setItinerary(newItinerary);
        }
      }
  };
  
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

    function setDays(event: React.ChangeEvent<HTMLInputElement>, destId: number) {
      const newItinerary = itinerary.map((destination: Destination): Destination => (
        destination.id === destId) ? 
        ({...destination, days: event.target.valueAsNumber}): 
        {...destination}
        );
      setItinerary(newItinerary)
    }
  
    return (
      <div>
        <Container>
          <Row>
               <DragDropContext onDragEnd={onDragEnd}>
               <Col>
               <h3>Destinations:</h3>
                <Droppable droppableId="central-list">
                  {(provided, snapshot): JSX.Element => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="container"
                    >
                      <div className="panel-group">                        
                        {centralList.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={String(item.id)}
                            index={index}
                          >
                            {(provided, snapshot): JSX.Element => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                                className="panel panel-default"
                              >
                                <Row>
                                  <Col xs={5}>                                      
                                      <img src={require('../images/' + item.image)} alt={item.location}></img>
                                  </Col>
                                  <Col xs={7}>
                                    <span style={{fontWeight: 'bold', fontSize: 18, color: "#212A3E", display: "flex", justifyContent:'left', textAlign: "left"}}>{item.name}, {item.location}</span>
                                    <span style={{display: "flex", justifyContent:'left', textAlign: "left", fontStyle: "italic"}}>{item.description}</span>
                                    <span style={{display: "flex", justifyContent:'left', textAlign: "left"}}>Activities: {item.activities.join(", ")}</span>
                                    <span style={{display: "flex", justifyContent:'left', textAlign: "left"}}>Cost: ${item.days}</span>
                                  </Col>
                                </Row>
                                
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
            </Col> 
            <Col>
              <h3>My Itinerary:</h3>
                <Droppable droppableId="itinerary">
                  {(provided, snapshot): JSX.Element => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="container"
                    >
                      <div className="panel-group">
                        {itinerary.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={String(item.id)}
                            index={index}
                          >
                            {(provided, snapshot): JSX.Element => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                                className="panel panel-default"
                              >
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
                                      <Form.Label  style={{display: "inline-block", float: "left", paddingRight: 10}}>Length of Stay: 
                                      </Form.Label>
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
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
                </Col>
              </DragDropContext>
          </Row>
        </Container>
      </div>
    );
  };
  
  export default UserList;