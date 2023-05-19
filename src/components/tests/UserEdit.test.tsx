/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import userEvent from "@testing-library/user-event";
import { HTML5Backend } from "react-dnd-html5-backend";
import { UserList } from "../UserList";
import { Destination } from "../../interfaces/destination";
import { User } from "../../interfaces/user";


describe("UserEdit Component tests", () => {
    let sampleCentralList = [
        {
            id: 1,
            name: "Sample1",
            description: "Sample1",
            location: "ZZ",
            image: "ZZ.jpeg",
            days: 0,
            cost: 23,
            activities: ["activity 1", "activity 2"]
        },
        {
            id: 2,
            name: "Sample2",
            description: "Sample2",
            location: "ZZ",
            image: "panda.JPG",
            days: 0,
            cost: 32,
            activities: ["activity 1", "activity 2"]
        },
        {
            id: 3,
            name: "Sample3",
            description: "Sample3",
            location: "ZZ",
            image: "panda.JPG",
            days: 0,
            cost: 46,
            activities: ["activity 1", "activity 2"]
        },
        {
            id: 4,
            name: "Sample4",
            description: "Sample4",
            location: "ZZ",
            image: "panda.JPG",
            days: 0,
            cost: 6,
            activities: ["activity 1", "activity 2"]
        }
    ] as Destination[]

    let testuser = {
        id: 1,
        name: "test",
        role: "user",
        itinerary1: [],
        itinerary2: [],
        currItinerary: 1
    }

    let testi1 = [] as Destination[]
    let testi2 = [] as Destination[]


    test("Tests proper label(s) are present", () => {
        
        render(
            <DndProvider backend={HTML5Backend}>
                <UserList centralList={[]} setCentralList={function (newCentralList: Destination[]): void {
                    throw new Error("Function not implemented.");
                } } itinerary1={[]} itinerary2={[]} setItinerary={function (newItinerary: Destination[]): void {
                    throw new Error("Function not implemented.");
                } } currentUser={testuser} setCurrentUser={function (newUser: User): void {
                    throw new Error("Function not implemented.");
                } } users={[]} setUsers={function (newUsers: User[]): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByText(/Edit list items/i)).toBeInTheDocument();
        expect(screen.getByText(/Total days/i)).toBeInTheDocument();
        expect(screen.getByText(/Total price/i)).toBeInTheDocument();


    });

    test("Drop an item into itinerary 1 and edit", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <UserList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } itinerary1={testi1} itinerary2={[]} setItinerary={function (newItinerary: Destination[]): void {
                    testi1 = newItinerary
                } } currentUser={testuser} setCurrentUser={function (newUser: User): void {
                } } users={[]} setUsers={function (newUsers: User[]): void {
                } } />
            </DndProvider>
        );
        expect(testi1.length).toEqual(0);
        let dragItem = screen.getByTestId("box1");
        const dropBox = screen.getByTestId("dropbox");
        fireEvent.dragStart(dragItem);
        fireEvent.drop(dropBox);
        expect(testi1.length).toEqual(1);
        const swi = screen.getByTestId(/switch/);
        fireEvent.click(swi);
    });
})