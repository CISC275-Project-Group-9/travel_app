/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Destination } from "../interfaces/destination";

export function AdminList(): JSX.Element {
    const [centralList, setCentralList] = useState<Destination[]>([]);
    const [itinerary, setItinerary] = useState<Destination[]>([]);

    function newDestinationToList(newDestination: Destination) {
        if (!centralList.includes(newDestination)) {
            const newCentralList = [...centralList, newDestination];
            setCentralList(newCentralList);
        }
    }

    function reviewDestination(Destination: Destination) {
        if (centralList.includes(Destination)) {
            const newCentralList = [...centralList, Destination];
            setCentralList(newCentralList);
        }
    }

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

    return (
        <div>
            <h3>Destinations:</h3>
            <ul>
                {centralList.map((destination: Destination) => (
                    <li key={destination.id}>{destination.name}</li>
                ))}
            </ul>
        </div>
    );
}
