/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Destination } from "../interfaces/destination";
import "./UserList.css";
import { useDrop } from "react-dnd";
import { DestItem } from "./DestItem";
import destinationsData from "../data/destinations.json";
import { Button, Form, FormGroup } from "react-bootstrap";
import { priceFilter, FilterForm } from "./FilterForm";
import { SearchFilter, SearchForm } from "./SearchForm";
import { UserListProps } from "../interfaces/props";

export function UserList({centralList, setCentralList, itinerary, setItinerary}: UserListProps): JSX.Element {
  const { DESTINATIONS }: Record<string, Destination[]> =
    // Typecast the test data that we imported to be a record matching
    //  strings to the question list
    destinationsData as Record<string, Destination[]>;

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
  }

  const [{ isOver }, drop] = useDrop({
    accept: "destItem",
    drop: (item: Destination) => addDestToItinerary(item.name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

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
          <div style={{ textAlign: "right" }}>
            <Button type="submit" onClick={reset}>
              Reset
            </Button>
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="panel panel-default">
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
