import { AddForm } from "./AddForm";
import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import "./UserList.css";
import { CentralListProps } from "../interfaces/props";
import { Button, Form, FormGroup } from "react-bootstrap";
import { DestItem } from "./DestItem";
import { useDrop } from "react-dnd";
import destinationsData from "../data/destinations.json";


export function SuperList({centralList, setCentralList, sharedList, setSharedList} : CentralListProps): JSX.Element {

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
  
    const [{ isOver }, drop] = useDrop({
        accept: "destItem",
        drop: (item: Destination) => addDestToShared(item.name),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    });

    function removeDestination(id: number) {
        const index = sharedList.findIndex(
            (dest: Destination) => dest.id === id
        );
        if (index !== -1) {
            const newItinerary = [...sharedList];
            newItinerary.splice(index, 1);
            setSharedList(newItinerary);
        }
    }

    return (
        <><div className="column-left">
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
        </div><div className="column-right" ref={drop}>
                <h3>Shared List:</h3>
                <div className="panel panel-default">
                    {sharedList.map((dest: Destination) => {
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
                            <Button
                                onClick={() => removeDestination(dest.id)}
                            >
                                ❌
                            </Button>
                        </FormGroup>
                            </div>
                        );
                    })}
                </div>
            </div></>
  );
    
}
