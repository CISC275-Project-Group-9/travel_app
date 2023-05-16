import { AddForm } from "./AddForm";
import { Destination } from "../interfaces/destination";
import "./UserList.css";
import { CentralListProps } from "../interfaces/props";
import { Button, FormGroup, Form } from "react-bootstrap";
import { DestItem } from "./DestItem";
import { useDrop } from "react-dnd";
import React, { useState } from "react";
import { FilterForm } from "./FilterForm";
import { SearchForm } from "./SearchForm";
import { SortForm } from "./SortForm";
// import { handleSort, filterByLoc, filterByState } from "./UserList";
import { priceFilter, Sort, SearchFilter } from "../interfaces/filterSort";
const grid = 8;

export function SuperList({
  centralList,
  setCentralList,
  sharedList,
  setSharedList,
}: CentralListProps): JSX.Element {
  const [displayList, setDisplayList] = useState<Destination[]>(centralList);
  const [editMode, setEditMode] = useState<boolean>(false);

  function editDestination(
    event: React.ChangeEvent<HTMLInputElement>,
    destId: number
  ) {
    const newSharedList: Destination[] = [...sharedList];
    const findTarget = sharedList.findIndex(
      (destination: Destination): boolean => destination.id === destId
    );
    const oldDest: Destination = { ...newSharedList[findTarget] };
    let newDest: Destination;
    if (event.target.name === "activities") {
      newDest = {
        ...oldDest,
        [event.target.name]: event.target.value.split(","),
      };
    } else if (event.target.name === "cost") {
      newDest = {
        ...oldDest,
        [event.target.name]: event.target.valueAsNumber,
      };
    } else {
      newDest = { ...oldDest, [event.target.name]: event.target.value };
    }
    console.log("here" + event.target.name + " value: " + event.target.value);
    newSharedList.splice(findTarget, 1, newDest);
    setSharedList(newSharedList);
  }

  function newDestinationToList(newDestination: Destination) {
    if (!centralList.includes(newDestination)) {
      const newCentralList = [...centralList, newDestination];
      setCentralList(newCentralList);
    }
  }

  function addDestToShared(name: string) {
    console.log(name);
    const addedDest = centralList.filter(
      (dest: Destination) => name === dest.name
    );
    setSharedList([...sharedList, addedDest[0]]);
  }

  const [, drop] = useDrop({
    accept: "destItem",
    drop: (item: Destination) => addDestToShared(item.name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  function removeDestination(id: number) {
    const index = sharedList.findIndex((dest: Destination) => dest.id === id);
    if (index !== -1) {
      const newItinerary = [...sharedList];
      newItinerary.splice(index, 1);
      setSharedList(newItinerary);
    }
  }

  function removeDestFromCentral(id: number) {
    const index = centralList.findIndex((dest: Destination) => dest.id === id);
    if (index !== -1) {
      const newCentralList = [...centralList];
      newCentralList.splice(index, 1);
      setCentralList(newCentralList);
    }
    // doesnt remove from shared or itinerary if its there
  }

    function filterByPrice(newPrices: priceFilter) {
    const newCentralList = [...centralList];
    setDisplayList(
      newCentralList.filter(
        (dest: Destination): boolean =>
          dest.cost >= newPrices.min && dest.cost <= newPrices.max
      )
    );
  }

  function filterByLoc(sq: SearchFilter) {
    const newCentralList = [...centralList];
    setDisplayList(
      newCentralList.filter((dest: Destination): boolean =>
        dest.location.toLowerCase().includes(sq.searchQuery.toLowerCase())
      )
    );
  }

  function handleSort(sort: Sort) {
    const newCentralList = [...centralList];
    if (sort.sortQuery === "State") {
        newCentralList.sort((a, b) => (a.location > b.location) ? 1 : -1)
    } else if (sort.sortQuery === "Cost") {
        newCentralList.sort((a, b) => (a.cost > b.cost) ? 1 : -1)
    } else if (sort.sortQuery === "CostDesc") {
        newCentralList.sort((a, b) => (a.cost < b.cost) ? 1 : -1)
    } 
    setDisplayList(newCentralList);
  }

  function reset() {
    setDisplayList(centralList);
  }

  return (
    <>
      <div className="column-left">
        <h3>Destinations:</h3>
        <AddForm onSubmit={newDestinationToList}></AddForm><br></br>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "gray",
            borderRadius: "10px",
            padding: "10px",
            background: "#BDBDBD",
          }}
        >
          <div style={{ paddingBottom: "20px" }}>
            <SearchForm onSubmit={filterByLoc}></SearchForm>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <FilterForm onSubmit={filterByPrice}></FilterForm>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <SortForm onSubmit={handleSort}></SortForm>
          </div>
          <div style={{ textAlign: "right" }}>
            <Button type="submit" onClick={reset}>
              Reset
            </Button>
          </div>
        </div>
        <div>
          {displayList.map((dest: Destination) => {
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
                  <Button onClick={() => removeDestFromCentral(dest.id)}>
                    ❌
                  </Button>
                </FormGroup>
              </div>
            );
          })}
          {displayList.length === 0 ? (
            <p
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                padding: "10px",
                paddingTop: "100px",
                paddingBottom: "100px",
                background: "#BDBDBD",
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "20px",
              }}
            >
              No destinations matched your search
            </p>
          ) : null}
        </div>
      </div>
      <div className="column-right" ref={drop}>
        <p style={{ margin: 0 }}>Change Edit Mode</p>
        <Form.Check
          type="switch"
          id="editModeSwitch"
          checked={editMode}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEditMode(event.target.checked)
          }
        />
        <Button
          onClick={() => {
            const newCentralList = [...centralList];
            const newSharedList = [...sharedList];
            newSharedList.forEach((dest: Destination) => {
              const findTarget = centralList.findIndex(
                (destination: Destination): boolean =>
                  destination.id === dest.id
              );
              const oldDest: Destination = { ...newCentralList[findTarget] };
              const newDest: Destination = { ...oldDest, ...dest };
              newCentralList.splice(findTarget, 1, newDest);
            });
            setCentralList(newCentralList);
            setSharedList([]);
          }}
        >
          Push changes
        </Button>
        <h3>Shared List:</h3>
        <div className="panel panel-default">
          {sharedList.map((dest: Destination) => {
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
                <FormGroup controlId="formChangeDuration">
                  <Button onClick={() => removeDestination(dest.id)}>❌</Button>
                </FormGroup>
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
                <Form.Group
                  controlId="editDestination"
                  style={{ width: "75%" }}
                >
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      editDestination(event, dest.id)
                    }
                  />
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      editDestination(event, dest.id)
                    }
                  />
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      editDestination(event, dest.id)
                    }
                  />
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      editDestination(event, dest.id)
                    }
                  />
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      editDestination(event, dest.id)
                    }
                  />
                </Form.Group>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
