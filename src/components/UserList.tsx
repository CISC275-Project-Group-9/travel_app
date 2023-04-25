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

const { DESTINATIONS }: Record<string, Destination[]> =
    // Typecast the test data that we imported to be a record matching
    //  strings to the question list
    destinationsData as Record<string, Destination[]>;


// interface Item {
//   id: string;
//   content: string;
// }

// // fake data generator
// const getItems = (count: number): Item[] =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `Destination-${k}`,
//     content: `Destination ${k}`
//   }));

const usaStates: Destination[] = [
  { location: "DE", name: "Delaware", description: "Dover", id: 1, days: 0, cost: 0, image: "", activities: [] },
  { location: "MD", name: "Maryland", description: "Annapolis", id: 2, days: 0, cost: 0, image: "", activities: [] },
  { location: "VA", name: "Virginia", description: "Richmond", id: 3, days: 0, cost: 0, image: "", activities: [] },
  { location: "PA", name: "Pennsylvania", description: "Harrisburg", id: 4, days: 0, cost: 0, image: "", activities: [] }
];

// a little function to help us with reordering the result
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
    const [itinerary, setItinerary] = useState<Destination[]>(DESTINATIONS.splice(0,4));
    
  
   const onDragEnd = (result: DropResult): void => {
    // dropped outside the lists
    if (!result.destination) {
      return;
    }

    const sourceList = result.source.droppableId;
    const destinationList = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // dropped within the same list
    if (sourceList === destinationList) {
      if (sourceList === "droppable") {
        const items = reorder(centralList, sourceIndex, destinationIndex);
        setCentralList(items);
      } else if (sourceList === "itinerary") {
        const items = reorder(itinerary, sourceIndex, destinationIndex);
        setItinerary(items);
      }
    } else {
      if (sourceList === "droppable") {
        const draggedItem = centralList[sourceIndex];
        const newItinerary = [...itinerary, draggedItem];
        setItinerary(newItinerary);

        const newCentralList = centralList.filter(
          (item: Destination, index: number) => index !== sourceIndex
        );
        setCentralList(newCentralList);
      } else if (sourceList === "itinerary") {
        const draggedItem = itinerary[sourceIndex];
        const newCentralList = [...centralList, draggedItem];
        setCentralList(newCentralList);

        const newItinerary = itinerary.filter(
          (item: Destination, index: number) => index !== sourceIndex
        );
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
  
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <h3>Destinations:</h3>
               <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
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
                                <div>
                                  <span style={{fontWeight: 'bold'}}>{item.name}</span>
                                  
                                </div>
                                
                                <img src={require('../images/' + item.location + '.jpeg')} alt={item.location}></img>
                                <div>Activities: {item.activities.join(", ")}</div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Col> 
            <Col>
              <h3>My Itinerary:</h3>
               <DragDropContext onDragEnd={onDragEnd}>
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
                                <div>
                                  <span style={{fontWeight: 'bold'}}>{item.name}</span>
                                </div>
                                
                                <img src={require('../images/' + item.location + '.jpeg')} alt={item.location}></img>
                                <div>Activities: {item.activities.join(", ")}</div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
  
  export default UserList;