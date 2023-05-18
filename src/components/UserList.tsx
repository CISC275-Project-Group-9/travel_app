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
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { Sort, priceFilter, SearchFilter } from "../interfaces/filterSort";
import { SearchDescForm } from "./SearchDescForm";
import { UserEdit } from "./UserEdit";

// encapsulates main functionality of the app when user role is basic
export function UserList({
  centralList,
  itinerary1,
  itinerary2,
  setItinerary,
  currentUser,
  setCurrentUser,
  users,
  setUsers,
}: UserListProps): JSX.Element {
  // state hooks
  const [displayList, setDisplayList] = useState<Destination[]>(centralList);
  const [totalPrice, setPrice] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [currItinerary, setCurrItinerary] = useState<number>(1);
  const [editMode, setEditMode] = useState<boolean>(false);

  // function to update the display values
  function updateDisplayVals() {
    let newInitialPriceList;
    if (currentUser.currItinerary === 1) {
      newInitialPriceList = itinerary1.map((dest) => dest.cost, 0);
    } else {
      newInitialPriceList = itinerary2.map((dest) => dest.cost, 0);
    }
    const newInitialPrice = newInitialPriceList.reduce(
      (dest, cost) => dest + cost,
      0
    );
    setPrice(newInitialPrice);
    let newTotalDaysList;
    if (currentUser.currItinerary === 1) {
      newTotalDaysList = itinerary1.map((dest) => dest.days, 0);
    } else {
      newTotalDaysList = itinerary2.map((dest) => dest.days, 0);
    }
    const newTotalDays = newTotalDaysList.reduce(
      (dest, days) => dest + days,
      0
    );
    setTotalDays(newTotalDays);
  }
  useEffect(() => {
    updateDisplayVals();
  });

  // function to add a destination to the itinerary
  function addDestToItinerary(name: string) {
    console.log(name);
    const addedDest = centralList.filter(
      (dest: Destination) => name === dest.name
    );
    if (currentUser.currItinerary === 1) {
      setItinerary([...itinerary1, addedDest[0]]);
    } else {
      setItinerary([...itinerary2, addedDest[0]]);
    }
    let newItinerary;
    if (currentUser.currItinerary === 1) {
      newItinerary = [...itinerary1, addedDest[0]];
      currentUser.itinerary1 = newItinerary;
    } else {
      newItinerary = [...itinerary2, addedDest[0]];
      currentUser.itinerary2 = newItinerary;
    }
  }

  // drag and drop hook for itinerary
  const [{ isOver }, drop] = useDrop({
    accept: "destItem",
    drop: (item: Destination) => addDestToItinerary(item.name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // drag and drop hook for display (central)
  const [{ isOverDisplay }, dropOnDisplay] = useDrop({
    accept: "destItem",
    drop: (item: Destination, monitor) => {
      const draggedItem = monitor.getItem();
      const draggedIndex = displayList.findIndex(
        (dest: Destination) => dest.name === draggedItem.name
      );
      const { y } = monitor.getDifferenceFromInitialOffset() || { y: 0 };
      const distanceInPixels = Math.abs(y);

      if (distanceInPixels >= 20) {
        const direction = y > 0 ? 1 : -1;
        const droppedIndex = draggedIndex + direction;
        reorderDisplay(item, draggedIndex, droppedIndex);
      }
    },
    collect: (monitor) => ({
      isOverDisplay: !!monitor.isOver(),
    }),
  });

  // function to reorder the display list for drag and drop
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

  // function to filter the central list by price
  function filterByPrice(newPrices: priceFilter) {
    const newCentralList = [...centralList];
    setDisplayList(
      newCentralList.filter(
        (dest: Destination): boolean =>
          dest.cost >= newPrices.min && dest.cost <= newPrices.max
      )
    );
  }

  // function to filter the central list by location
  function filterByLoc(sq: SearchFilter) {
    const newCentralList = [...centralList];
    setDisplayList(
      newCentralList.filter((dest: Destination): boolean =>
        dest.location.toLowerCase().includes(sq.searchQuery.toLowerCase())
      )
    );
  }

  // function to filter the central list by description
  function filterByDesc(sq: SearchFilter) {
    const newCentralList = [...centralList];
    setDisplayList(
      newCentralList.filter((dest: Destination): boolean =>
        dest.description.toLowerCase().includes(sq.searchQuery.toLowerCase())
      )
    );
  }

  // function to sort the central list
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

  // function to set the days for a destination in the itinerary
  function setDays(event: React.ChangeEvent<HTMLInputElement>, destId: number) {
    let newItinerary: Destination[];
    let findTarget;
    if (currentUser.currItinerary === 1) {
      newItinerary = [...itinerary1];
      findTarget = itinerary1.findIndex(
        (destination: Destination): boolean => destination.id === destId
      );
    } else {
      newItinerary = [...itinerary2];
      findTarget = itinerary2.findIndex(
        (destination: Destination): boolean => destination.id === destId
      );
    }
    const oldDest: Destination = { ...newItinerary[findTarget] };
    const newDest: Destination = {
      ...oldDest,
      days: event.target.valueAsNumber,
    };
    newItinerary.splice(findTarget, 1, newDest);
    if (currentUser.currItinerary === 1) {
      currentUser.itinerary1 = newItinerary;
    } else {
      currentUser.itinerary2 = newItinerary;
    }
    setItinerary(newItinerary);
  }

  // function to reset the display list
  function reset() {
    setDisplayList(centralList);
  }

  // function to remove a destination from the itinerary
  function removeDestination(id: number) {
    let index;
    if (currentUser.currItinerary === 1) {
      index = itinerary1.findIndex((dest: Destination) => dest.id === id);
    } else {
      index = itinerary2.findIndex((dest: Destination) => dest.id === id);
    }
    if (index !== -1) {
      let newItinerary;
      if (currentUser.currItinerary === 1) {
        newItinerary = [...itinerary1];
        newItinerary.splice(index, 1);
        currentUser.itinerary1 = newItinerary;
      } else {
        newItinerary = [...itinerary2];
        newItinerary.splice(index, 1);
        currentUser.itinerary2 = newItinerary;
      }
      setItinerary(newItinerary);
    }
  }

  // function to clear the itinerary
  function clearItinerary() {
    if (currentUser.currItinerary === 1) {
      currentUser.itinerary1 = [];
    } else {
      currentUser.itinerary2 = [];
    }
    setItinerary([]);
  }

  // function to use itinerary 1
  function useItinerary1() {
    currentUser.currItinerary = 1;
    setCurrItinerary(1);
    setCurrentUser({ ...currentUser, currItinerary: 1 });
    setUsers([...users, { ...currentUser, currItinerary: 1 }]);
    setItinerary(currentUser.itinerary1);
  }

  // function to use itinerary 2
  function useItinerary2() {
    currentUser.currItinerary = 2;
    setCurrItinerary(2);
    setCurrentUser({ ...currentUser, currItinerary: 2 });
    setUsers([...users, { ...currentUser, currItinerary: 2 }]);
    setItinerary(currentUser.itinerary2);
  }

  const SortableItem = SortableElement(({ dest }: { dest: Destination }) => (
    <div key={dest.id} style={{ marginLeft: "30px" }}>
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
  ));

  const SortableList = SortableContainer(
    ({ itinerary }: { itinerary: Destination[] }) => {
      return (
        <div>
          {itinerary.map((dest: Destination, index) => (
            <SortableItem
              key={dest.id}
              index={index}
              dest={dest}
            ></SortableItem>
          ))}
        </div>
      );
    }
  );

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    let newItinerary;
    if (currentUser.currItinerary === 1) {
      newItinerary = [...itinerary1];
    } else {
      newItinerary = [...itinerary2];
    }
    const [removed] = newItinerary.splice(oldIndex, 1);
    newItinerary.splice(newIndex, 0, removed);
    setItinerary(newItinerary);
    if (currentUser.currItinerary === 1) {
      currentUser.itinerary1 = newItinerary;
    } else {
      currentUser.itinerary2 = newItinerary;
    }
  };

  function editDestination(
    event: React.ChangeEvent<HTMLInputElement>,
    destId: number
  ) {
    let newItinerary: Destination[];
    if (currentUser.currItinerary === 1) {
      newItinerary = [...itinerary1];
    } else {
      newItinerary = [...itinerary2];
    }
    let findTarget;
    if (currentUser.currItinerary === 1) {
      findTarget = itinerary1.findIndex(
        (destination: Destination): boolean => destination.id === destId
      );
    } else {
      findTarget = itinerary2.findIndex(
        (destination: Destination): boolean => destination.id === destId
      );
    }
    const oldDest: Destination = { ...newItinerary[findTarget] };
    let newDest: Destination;
    if (event.target.name === "activities") {
      newDest = {
        ...oldDest,
        [event.target.name]: event.target.value.split(","),
      };

      newItinerary.splice(findTarget, 1, newDest);
      setItinerary(newItinerary);
      if (currentUser.currItinerary === 1) {
        currentUser.itinerary1 = newItinerary;
      } else {
        currentUser.itinerary2 = newItinerary;
      }
    }
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
            backgroundColor: isOverDisplay ? "gray" : "gray",
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
        <br></br>
        <br></br>
        <div className="panel panel-default" ref={dropOnDisplay}>
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
      <div className="itinierary-select">
        <Button style={{ margin: 10 }} onClick={useItinerary1}>
          Itinerary 1
        </Button>
        <Button onClick={useItinerary2}>Itinerary 2</Button>
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
          <h5>Edit List Items</h5>
          <Form.Check
            data-testid="switch"
            type="switch"
            id="editModeSwitch"
            checked={editMode}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEditMode(event.target.checked)
            }
          />
        </div>
        {currItinerary === 1 ? (
          // itinerary 1:
          itinerary1.length === 0 ? (
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
          ) : editMode ? ( 
            itinerary1.map((dest: Destination) => {
              return (
                <div key={dest.id}>
                  <UserEdit
                    id={dest.id}
                    key={dest.id}
                    name={dest.name}
                    description={dest.description}
                    image={dest.image}
                    location={dest.location}
                    cost={dest.cost}
                    days={dest.days}
                    activities={dest.activities}
                    editDestination={editDestination}
                  ></UserEdit>
                </div>
              );
              })
          ) : (
            <SortableList
              itinerary={itinerary1}
              onSortEnd={onSortEnd}
              lockAxis="y"
              lockToContainerEdges
              helperClass="sortableHelper"
            />
          )
        ) : // itinerary2:
        itinerary2.length === 0 ? (
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
        ) : 
        editMode ? ( 
          itinerary2.map((dest: Destination) => {
            return (
              <div key={dest.id}>
                <UserEdit
                  id={dest.id}
                  key={dest.id}
                  name={dest.name}
                  description={dest.description}
                  image={dest.image}
                  location={dest.location}
                  cost={dest.cost}
                  days={dest.days}
                  activities={dest.activities}
                  editDestination={editDestination}
                ></UserEdit>
              </div>
            );
          })
        ) :
        (
          <SortableList
            itinerary={itinerary2}
            onSortEnd={onSortEnd}
            lockAxis="y"
            lockToContainerEdges
            helperClass="sortableHelper"
          />
        )}
        {currentUser.currItinerary === 1 ? (
          itinerary1.length !== 0 ? (
            <Button onClick={clearItinerary}>Remove All</Button>
          ) : null
        ) : itinerary2.length !== 0 ? (
          <Button onClick={clearItinerary}>Remove All</Button>
        ) : null}
      </div>
    </div>
  );
}
