/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Destination } from "../interfaces/destination";

export function UserList(): JSX.Element {
    const [centralList] = useState<Destination[]>([]);
    const [itinerary, setItinerary] = useState<Destination[]>([]);

    function addDestination(newDestination: Destination) {
        if (!itinerary.includes(newDestination)) {
            const newItinerary = [...itinerary, newDestination];
            setItinerary(newItinerary);
        }
    }

    function removeDestination(destination: Destination) {
        if (itinerary.includes(destination)){
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
            <h3>Itinerary</h3>
            <ul>
                { itinerary.map((destination: Destination) => <li key={destination.id}>{destination.name}</li>) }
            </ul>
        </div>
    );
}