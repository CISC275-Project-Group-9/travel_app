/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import "./UserList.css";
import { useDrop } from "react-dnd";
import { DestItem } from "./DestItem";
import destinationsData from "../data/destinations.json"
import { Form, Button } from "react-bootstrap";

export function UserList(): JSX.Element {
  const { DESTINATIONS }: Record<string, Destination[]> =
      // Typecast the test data that we imported to be a record matching
      //  strings to the question list
      destinationsData as Record<string, Destination[]>;

  const [centralList, setCentralList] = useState<Destination[]>(DESTINATIONS);
  const [totalPrice, setPrice] = useState<number>(0);
  const [itinerary, setItinerary] = useState<Destination[]>([]);

  function addDestToItinerary(name: string){
    console.log(name);
    const addedDest = centralList.filter((dest: Destination) => name === dest.name);
    setItinerary((itinerary) => [...itinerary, addedDest[0]]);
  }

  function setDays(event: React.ChangeEvent<HTMLInputElement>, destId: number) {
    const newItinerary: Destination[] = [...itinerary];
    const findTarget = itinerary.findIndex((destination: Destination): boolean => destination.id === destId);
    const oldDest: Destination = {...newItinerary[findTarget]};
    const newDest: Destination = {...oldDest, days: event.target.valueAsNumber};
    newItinerary.splice(findTarget, 1, newDest);
    setItinerary(newItinerary)
  }

  const [{isOver}, drop] = useDrop({
    accept: "destItem", 
    drop: (item: Destination) => addDestToItinerary(item.name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

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
        <div className="column-left">
          <h3>Destinations:</h3>
          <div className="panel panel-default">
            {centralList.map((dest: Destination) => {
                return (
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
                );
            })}
            </div> 
        </div>
        <div className="column-right panel panel-default" ref={drop} style={{backgroundColor: isOver ? "#6699CC" : "whitesmoke"}}>
          <h3>Total Price: {totalPrice} </h3>
          <h3>Itinerary:</h3>
            {itinerary.map((dest: Destination) => {
              return (
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
                    <Form.Group controlId="formChangeDuration">
                      <Form.Label  style={{display: "inline-block", float: "none", paddingRight: 10, backgroundColor:  "#BDBDBD"}}>Length of Stay: 
                      </Form.Label>
                      <Form.Control
                        style={{display: "inline-block", width: 70, height: 25, float: "none"}}
                        type="number"
                        defaultValue={dest.days}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          setDays(event, dest.id)}
                      />
                    </Form.Group>
                </div>
              );
            })}
          {itinerary.length !== 0 ? <Button onClick={clearItinerary}>Remove All</Button> : null}
        </div>
    </div>
  )
}

/* import {
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
    const [itinerary, setItinerary] = useState<Destination[]>([]);
    const [initialPrice, setInitialPrice] = useState<number>(0);
    
   const onDragEnd = (result: DropResult): void => {
      
    // Change price
      const newInitialPriceList = itinerary.map((acc, curr) => acc.cost, 0);
      const newInitialPrice = newInitialPriceList.reduce((acc, curr) => acc+curr, 0);
      setInitialPrice(newInitialPrice);

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
      const newItinerary: Destination[] = [...itinerary];
      const findTarget = itinerary.findIndex((destination: Destination): boolean => destination.id === destId);
      const oldDest: Destination = {...newItinerary[findTarget]};
      const newDest: Destination = {...oldDest, days: event.target.valueAsNumber};
      newItinerary.splice(findTarget, 1, newDest);
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
            <Col>
            <h3>Initial Price: {initialPrice} </h3>
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
  
  export default UserList; */
