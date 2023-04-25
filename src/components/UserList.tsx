/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./UserList.css"; 

import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle
} from "react-beautiful-dnd";

interface Item {
  id: string;
  content: string;
}

// fake data generator
const getItems = (count: number): Item[] =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `Destination-${k}`,
    content: `Destination ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (
  list: Item[],
  startIndex: number,
  endIndex: number
): Item[] => {
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
  background: isDragging ? "#394867" : "#9BA4B5",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

const UserList = (): JSX.Element => {
    const [centralList, setCentralList] = useState<Item[]>(getItems(5));
    const [itinerary, setItinerary] = useState<Item[]>(getItems(5));
  
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
          (item: Item, index: number) => index !== sourceIndex
        );
        setCentralList(newCentralList);
      } else if (sourceList === "itinerary") {
        const draggedItem = itinerary[sourceIndex];
        const newCentralList = [...centralList, draggedItem];
        setCentralList(newCentralList);

        const newItinerary = itinerary.filter(
          (item: Item, index: number) => index !== sourceIndex
        );
        setItinerary(newItinerary);
      }
    }
  };
  
    function addDestination(newDestination: Item) {
      if (!itinerary.includes(newDestination)) {
        const newItinerary = [...itinerary, newDestination];
        setItinerary(newItinerary);
      }
    }
  
    function removeDestination(destination: Item) {
      if (itinerary.includes(destination)) {
        const id = destination.id;
        const newItinerary = itinerary.filter(
          (dest: Item): boolean => dest.id !== id
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
                            draggableId={item.id}
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
                                <div className="panel-heading">
                                  {item.content}
                                </div>
                                <div className="panel-body">Activities</div>
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
                            draggableId={item.id}
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
                                <div className="panel-heading">
                                  {item.content}
                                </div>
                                <div className="panel-body">Activities</div>
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