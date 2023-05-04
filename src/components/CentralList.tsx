import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import "./UserList.css";
import destinationsData from "../data/destinations.json";
import { AddForm } from "./AddForm";
import UserList from "./UserList";

export function makeNewDest(
    id: number, 
    name: string, 
    description: string,
    image: string, 
    location: string, 
    days: number, 
    cost: number, 
    activities: string[]
) : Destination{
    return {
        id: id, 
        name: name, 
        description: description,
        image: image, 
        location: location, 
        days: days, 
        cost: cost, 
        activities: activities
    }
}

const { DESTINATIONS }: Record<string, Destination[]> =
  // Typecast the test data that we imported to be a record matching
  //  strings to the question list
  destinationsData as Record<string, Destination[]>;

export function CentralList(): JSX.Element {
  const [centralList, setCentralList] = useState<Destination[]>(DESTINATIONS);
  const [itinerary, setItinerary] = useState<Destination[]>([]);
  const [initialPrice, setInitialPrice] = useState<number>(0);

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

  return (
    <div>
        <AddForm onSubmit={addDestination}></AddForm>
    </div>
  )
};

export default UserList;
