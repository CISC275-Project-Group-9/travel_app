import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import "./UserList.css";
import { CentralListProps } from "../interfaces/props";
import { DestItem } from "./DestItem";
import { useDrop } from "react-dnd";
import { Button, Form, FormGroup } from "react-bootstrap";
import { FilterForm } from "./FilterForm";
import { SearchForm } from "./SearchForm";
import { SortForm } from "./SortForm";
import { SearchDescForm } from "./SearchDescForm";
import { priceFilter, Sort, SearchFilter } from "../interfaces/filterSort";


const grid = 8;

export function AdminList({
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
    newSharedList.splice(findTarget, 1, newDest);
    setSharedList(newSharedList);
  }

  function addDestToShared(name: string) {
    const addedDest = centralList.find(
      (dest: Destination) => name === dest.name
    );
    if (
      addedDest &&
      !sharedList.some((dest: Destination) => dest.id === addedDest.id)
    ) {
      const newDest = { ...addedDest };
      setSharedList([...sharedList, newDest]);
    }
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

  const onClick = async () => {
    const newCentralList = [...centralList];
    const newSharedList = [...sharedList];
    newSharedList.forEach((dest: Destination) => {
      const findTarget = newCentralList.findIndex(
        (destination: Destination): boolean => destination.id === dest.id
      );
      if (findTarget !== -1) {
        const oldDest: Destination = newCentralList[findTarget];
        const newDest: Destination = { ...dest, id: oldDest.id };
        newCentralList[findTarget] = newDest;
      }
    });
    setCentralList(newCentralList);
    setSharedList([]);
    setDisplayList(newCentralList);
  };

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

  function filterByDesc(sq: SearchFilter) {
    const newCentralList = [...centralList];
    setDisplayList(
      newCentralList.filter((dest: Destination): boolean =>
        dest.description.toLowerCase().includes(sq.searchQuery.toLowerCase())
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
        <br></br>
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
            <SearchDescForm onSubmit={filterByDesc}></SearchDescForm>
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
        <div data-testid="displayList" className="panel panel-default">
        {displayList.map((dest: Destination) => {
            return (
              <div key={dest.id} data-testid={"dest" + dest.id} >
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
      <div data-testid="dropbox" className="column-right" ref={drop}>
        <p style={{ margin: 0 }}>Change Edit Mode</p>
        <Form.Check
          data-testid="switch"
          type="switch"
          id="editModeSwitch"
          checked={editMode}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEditMode(event.target.checked)
          }
        />
        <Button onClick={onClick}>Push changes</Button>
        <h3>Shared List:</h3>
        <div className="panel panel-default">
          {sharedList.map((dest: Destination) => {
            return !editMode ? (
              <div key={dest.id} data-testid={"shared" + dest.id} >
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
                  <Button data-testid={"deleteButton"+dest.id} onClick={() => removeDestination(dest.id)}>❌</Button>
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
                    data-testid={"editName"+dest.id}
                    defaultValue={dest.name}
                    name="name"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      editDestination(event, dest.id)
                    }
                  />
                </Form.Group>
                <Form.Group>
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
                    data-testid={"editDescription"+dest.id}
                    defaultValue={dest.description}
                    name="description"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      editDestination(event, dest.id)
                    }
                  />
                </Form.Group>
                <Form.Group>
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
                    data-testid={"editLocation"+dest.id}
                    defaultValue={dest.location}
                    name="location"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      editDestination(event, dest.id)
                    }
                  />
                </Form.Group>
                <Form.Group>
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
                    data-testid={"editCost"+dest.id}
                    defaultValue={dest.cost}
                    name="cost"
                    type="number"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      editDestination(event, dest.id)
                    }
                  />
                </Form.Group>
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
                    data-testid={"editActivities"+dest.id}
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
