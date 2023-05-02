/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import { Button } from "react-bootstrap";
import { AddForm } from "./AddForm";

export function SuperList(): JSX.Element {
    const [centralList, setCentralList] = useState<Destination[]>([]);
    const [itinerary, setItinerary] = useState<Destination[]>([]);
    const [userList, setUsers] = useState<Destination[]>([]);

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
            <AddForm onSubmit={newDestinationToList}></AddForm>
            <ul>
                {centralList.map((destination: Destination) => (
                    <li key={destination.id}>{destination.name}</li>
                ))}
            </ul>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
            ></link>
            <div className="panel-group">
                <div className="panel panel-default">
                    <div className="panel-body">Location</div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-body">Location</div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-body">Location</div>
                </div>
            </div>
        </div>
    );
}
