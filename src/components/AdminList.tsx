/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
/* eslint-disable @typescript-eslint/no-unused-vars */
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

export function AdminList(): JSX.Element {
    const [centralList, setCentralList] = useState<Destination[]>(DESTINATIONS);

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

    return (
        <div>
        <Container>
          <Row>
              <h3>Destinations:</h3>
               <DragDropContext onDragEnd={onDragEnd}>
               <Col>
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
                                    <span style={{display: "flex", justifyContent:'left', textAlign: "left"}}>Cost: ${item.cost}</span>
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
              </DragDropContext>
          </Row>
        </Container>
      </div>
    );
}
