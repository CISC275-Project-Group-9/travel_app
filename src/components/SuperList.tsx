/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import { Button } from "react-bootstrap";
import { AddForm } from "./AddForm";
import { useDrag } from "react-dnd";
import { CentralListProps } from "../interfaces/props";
import { DestItem } from "./DestItem";

export function SuperList({centralList, setCentralList} : CentralListProps): JSX.Element {
    // const [centralList, setCentralList] = useState<Destination[]>([]);
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

    const grid = 8;

    const getItemStyle = (
        isDragging: boolean,
      ): React.CSSProperties => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `${grid}px ${grid}px 0 0`,
        borderRadius: 5,
      
        // change background colour if dragging
        background: isDragging ? "#6699CC" : "#BDBDBD",
      });
  
      const [{ isDragging }, drag] = useDrag({
        type: "destItem",
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <div>
            <h3>Destinations:</h3>
            <AddForm onSubmit={newDestinationToList}></AddForm>
            <div>
                {centralList.map((dest: Destination) => {
                    return (
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
                    );
                })}
            </div>
        </div>
    );
}
