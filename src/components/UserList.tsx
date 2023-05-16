import React, { useEffect, useState } from "react";
import { Destination } from "../interfaces/destination";
import "./UserList.css";
import { useDrop } from "react-dnd";
import { DestItem } from "./DestItem";
import { Button, Form, FormGroup } from "react-bootstrap";
import { FilterForm } from "./FilterForm";
import { SearchForm } from "./SearchForm";
import { UserListProps } from "../interfaces/props";
import { SortForm } from "./SortForm";
import { Sort, priceFilter, SearchFilter } from "../interfaces/filterSort";

export function UserList({
  centralList,
  setCentralList,
  itinerary,
  setItinerary,
  currentUser,
}: UserListProps): JSX.Element {
  const [displayList, setDisplayList] = useState<Destination[]>(centralList);
  const [totalPrice, setPrice] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);

  function updateDisplayVals() {
    const newInitialPriceList = itinerary.map((dest) => dest.cost, 0);
    const newInitialPrice = newInitialPriceList.reduce(
      (dest, cost) => dest + cost,
      0
    );
    setPrice(newInitialPrice);
    const newTotalDaysList = itinerary.map((dest) => dest.days, 0);
    const newTotalDays = newTotalDaysList.reduce(
      (dest, days) => dest + days,
      0
    );
    setTotalDays(newTotalDays);
  }

  useEffect(() => {
    updateDisplayVals();
  });

  function addDestToItinerary(name: string) {
    console.log(name);
    const addedDest = centralList.filter(
      (dest: Destination) => name === dest.name
    );
    setItinerary([...itinerary, addedDest[0]]);
    const newItinerary = [...itinerary, addedDest[0]];
    currentUser.itinerary = newItinerary;
  }

  const [{ isOver }, drop] = useDrop({
    accept: "destItem",
    drop: (item: Destination) => addDestToItinerary(item.name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const MIN_PIXELS_TO_MOVE = 20; // Adjust this value based on your requirements

  const [{ isOverCentral }, dropCentral] = useDrop({
    accept: "destItem",
    drop: (item: Destination, monitor) => {
      const draggedItem = monitor.getItem();
      const draggedIndex = centralList.findIndex(
        (dest: Destination) => dest.name === draggedItem.name
      );
      const { y } = monitor.getDifferenceFromInitialOffset() || { y: 0 };
      const distanceInPixels = Math.abs(y);

      if (distanceInPixels >= MIN_PIXELS_TO_MOVE) {
        const direction = y > 0 ? 1 : -1;
        const droppedIndex = draggedIndex + direction;
        reorderDisplay(item, draggedIndex, droppedIndex);
      }
    },
    collect: (monitor) => ({
      isOverCentral: !!monitor.isOver(),
    }),
  });

  const reorderDisplay = (
    draggedItem: Destination,
    draggedIndex: number,
    droppedIndex: number
  ) => {
    if (draggedIndex === -1 || droppedIndex === -1) {
      return;
    }

    const updatedCentralList = [...centralList];
    const [removedItem] = updatedCentralList.splice(draggedIndex, 1);
    updatedCentralList.splice(droppedIndex, 0, removedItem);

    setDisplayList(updatedCentralList);
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

  function handleSort(sort: Sort) {
    const newCentralList = [...centralList];
    if (sort.sortQuery === "State") {
      newCentralList.sort((a, b) => (a.location > b.location ? 1 : -1));
    } else if (sort.sortQuery === "Cost") {
      newCentralList.sort((a, b) => (a.cost > b.cost ? 1 : -1));
    } else if (sort.sortQuery === "CostDesc") {
      newCentralList.sort((a, b) => (a.cost < b.cost ? 1 : -1));
    }
    setDisplayList(newCentralList);
  }

  function setDays(event: React.ChangeEvent<HTMLInputElement>, destId: number) {
    const newItinerary: Destination[] = [...itinerary];
    const findTarget = itinerary.findIndex(
      (destination: Destination): boolean => destination.id === destId
    );
    const oldDest: Destination = { ...newItinerary[findTarget] };
    const newDest: Destination = {
      ...oldDest,
      days: event.target.valueAsNumber,
    };
    newItinerary.splice(findTarget, 1, newDest);
    currentUser.itinerary = newItinerary;
    setItinerary(newItinerary);
  }

  function reset() {
    setDisplayList(centralList);
  }

  function removeDestination(id: number) {
    const index = itinerary.findIndex((dest: Destination) => dest.id === id);
    if (index !== -1) {
      const newItinerary = [...itinerary];
      newItinerary.splice(index, 1);
      currentUser.itinerary = newItinerary;
      setItinerary(newItinerary);
    }
  }

  function clearItinerary() {
    currentUser.itinerary = [];
    setItinerary([]);
  }

  return (
    <div>
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
        <br></br>
        <br></br>
        <div className="panel panel-default" ref={dropCentral}>
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
              </div>
            );
          })}
          {displayList.length === 0 ? (
            <p
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: isOver ? "#6699CC" : "#BDBDBD",
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
      <div className="column-right panel panel-default" ref={drop}>
        <h3>Itinerary:</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "gray",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "20px",
            background: "#BDBDBD",
            width: "50%",
            margin: "auto",
          }}
        >
          <h5>Total Price: ${totalPrice} </h5>
          <h5>Total Days: {totalDays} </h5>
        </div>
        {itinerary.length === 0 ? (
          <p
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: isOver ? "#6699CC" : "#BDBDBD",
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
            Drop a place here to get started
          </p>
        ) : (
          itinerary.map((dest: Destination, index) => {
            return (
              <div key={index} style={{ marginLeft: "30px" }}>
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
                  <Form.Label
                    style={{
                      display: "inline-block",
                      float: "none",
                      paddingRight: 10,
                      backgroundColor: "BDBDBD",
                    }}
                  >
                    Length of Stay:
                  </Form.Label>
                  <Form.Control
                    style={{
                      display: "inline-block",
                      width: 75,
                      height: 25,
                      float: "none",
                    }}
                    type="number"
                    defaultValue={dest.days}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setDays(event, dest.id)
                    }
                  ></Form.Control>
                  <button onClick={() => removeDestination(dest.id)}>❌</button>
                </FormGroup>
              </div>
            );
          })
        )}
        {itinerary.length !== 0 ? (
          <Button onClick={clearItinerary}>Remove All</Button>
        ) : null}
      </div>
    </div>
  );
}
