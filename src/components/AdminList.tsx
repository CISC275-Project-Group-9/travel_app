import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import "./UserList.css";
import { CentralListProps } from "../interfaces/props";
import { DestItem } from "./DestItem";
import { useDrop } from "react-dnd";
import destinationsData from "../data/destinations.json";
import { Button, Form, FormGroup } from "react-bootstrap";

const grid = 8;

export function AdminList({
  centralList,
  setCentralList,
  sharedList,
  setSharedList
}: CentralListProps): JSX.Element {
  const { DESTINATIONS }: Record<string, Destination[]> =
      // Typecast the test data that we imported to be a record matching
      //  strings to the question list
      destinationsData as Record<string, Destination[]>;

  const [editMode, setEditMode] = useState<boolean>(false);

  function editDestination(
    event: React.ChangeEvent<HTMLInputElement>,
    destId: number
  ) {
    const newCentralList: Destination[] = [...centralList];
    const findTarget = centralList.findIndex(
      (destination: Destination): boolean => destination.id === destId
    );
    const oldDest: Destination = { ...newCentralList[findTarget] };
    let newDest: Destination;
    if (event.target.name === "activities") {
      newDest = {
        ...oldDest,
        [event.target.name]: event.target.value.split(","),
      };
    } else if (event.target.name === "cost"){
      newDest = {
        ...oldDest,
        [event.target.name]: event.target.valueAsNumber,
      };
    }else {
      newDest = { ...oldDest, [event.target.name]: event.target.value };
    }
    console.log("here" + event.target.name + " value: " + event.target.value);
    newCentralList.splice(findTarget, 1, newDest);
    setCentralList(newCentralList);
  }

  function addDestToShared(name: string) {
      console.log(name);
      const addedDest = centralList.filter(
          (dest: Destination) => name === dest.name
      );
      setSharedList([...sharedList, addedDest[0]]);
  }

  const [{ isOver }, drop] = useDrop({
      accept: "destItem",
      drop: (item: Destination) => addDestToShared(item.name),
      collect: (monitor) => ({
          isOver: !!monitor.isOver()
      })
  });

  function removeDestination(id: number) {
    const index = sharedList.findIndex(
        (dest: Destination) => dest.id === id
    );
    if (index !== -1) {
        const newItinerary = [...sharedList];
        newItinerary.splice(index, 1);
        setSharedList(newItinerary);
    }
}


  return (
    <><div className="column-left">
      <h3>Destinations:</h3>
      <p style={{ margin: 0 }}>Change Edit Mode</p>
      <Form.Check
        type="switch"
        id="editModeSwitch"
        checked={editMode}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditMode(event.target.checked)} />
      <div className="panel panel-default">
        {centralList.map((dest: Destination) => {
          return !editMode ? (
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
          ) : (
            <div
              className="panel panel-default"
              style={{
                userSelect: "none",
                padding: grid * 2,
                margin: `${grid}px ${grid}px 0 0`,
                borderRadius: 5,
                background: "#6699CC",
              }}
            >
              <Form.Group controlId="editDestination" style={{ width: "75%" }}>
                <Form.Label
                  style={{
                    display: "inline-block",
                    float: "left",
                    paddingRight: 10,
                  }}
                >
                  Name
                </Form.Label>
                <Form.Control
                  defaultValue={dest.name}
                  name="name"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => editDestination(event, dest.id)} />
                <Form.Label
                  style={{
                    display: "inline-block",
                    float: "left",
                    paddingRight: 10,
                  }}
                >
                  Description
                </Form.Label>
                <Form.Control
                  defaultValue={dest.description}
                  name="description"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => editDestination(event, dest.id)} />
                <Form.Label
                  style={{
                    display: "inline-block",
                    float: "left",
                    paddingRight: 10,
                  }}
                >
                  Location
                </Form.Label>
                <Form.Control
                  defaultValue={dest.location}
                  name="location"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => editDestination(event, dest.id)} />
                <Form.Label
                  style={{
                    display: "inline-block",
                    float: "left",
                    paddingRight: 10,
                  }}
                >
                  Cost
                </Form.Label>
                <Form.Control
                  defaultValue={dest.cost}
                  name="cost"
                  type="number"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => editDestination(event, dest.id)} />
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
                  defaultValue={dest.activities}
                  name="activities"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => editDestination(event, dest.id)} />
              </Form.Group>
            </div>
          );
        })}
      </div>
    </div><div className="column-right" ref={drop}>
        <h3>Shared List:</h3>
        <div className="panel panel-default">
          {sharedList.map((dest: Destination) => {
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
                <FormGroup controlId="formChangeDuration">
                            <Button
                                onClick={() => removeDestination(dest.id)}
                            >
                                ❌
                            </Button>
                        </FormGroup>
              </div>
            ) ; 
          })}
        </div>
      </div></>
  );
}
