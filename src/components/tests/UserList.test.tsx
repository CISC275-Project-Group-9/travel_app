/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import userEvent from "@testing-library/user-event";
import { HTML5Backend } from "react-dnd-html5-backend";
import { UserList } from "../UserList";
import { Destination } from "../../interfaces/destination";
import { User } from "../../interfaces/user";


describe("UserList Component tests", () => {
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
            location: "AA",
            image: "panda.JPG",
            days: 0,
            cost: 32,
            activities: ["activity 1", "activity 2"]
        },
        {
            id: 3,
            name: "Sample3",
            description: "Sample3",
            location: "BB",
            image: "panda.JPG",
            days: 0,
            cost: 46,
            activities: ["activity 1", "activity 2"]
        },
        {
            id: 4,
            name: "Sample4",
            description: "Sample4",
            location: "CC",
            image: "panda.JPG",
            days: 0,
            cost: 6,
            activities: ["activity 1", "activity 2"]
        }
    ] as Destination[]

    let it1 = [
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
            id: 4,
            name: "Sample4",
            description: "Sample4",
            location: "CC",
            image: "panda.JPG",
            days: 0,
            cost: 6,
            activities: ["activity 1", "activity 2"]
        }
    ]

    let testuser = {
        id: 1,
        name: "test",
        role: "user",
        itinerary1: it1,
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
        expect(screen.getAllByText(/itinerary/i)).toHaveLength(3);
        expect(screen.getByText(/Drop a place here to get started/i)).toBeInTheDocument();
    });

    test("Drop an item into itinerary 1", () => {
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
        let dragItem = screen.getByTestId("box2");
        const dropBox = screen.getByTestId("dropbox");
        fireEvent.dragStart(dragItem);
        fireEvent.drop(dropBox);
        expect(testi1.length).toEqual(1);
    });

    test("Drop an item into itinerary 2", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <UserList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } itinerary1={[]} itinerary2={testi2} setItinerary={function (newItinerary: Destination[]): void {
                    testi2 = newItinerary
                } } currentUser={testuser} setCurrentUser={function (newUser: User): void {
                } } users={[]} setUsers={function (newUsers: User[]): void {
                } } />
            </DndProvider>
        );
        expect(testi2.length).toEqual(0);
        const ibutton = screen.getByText("Itinerary 2");
        fireEvent.click(ibutton);
        let dragItem = screen.getByTestId("box3");
        const dropBox = screen.getByTestId("dropbox");
        fireEvent.dragStart(dragItem);
        fireEvent.drop(dropBox);
        expect(testi2.length).toEqual(1);
    });

    test("Change length of stay", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <UserList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } itinerary1={it1} itinerary2={testi2} setItinerary={function (newItinerary: Destination[]): void {
                    it1 = newItinerary
                } } currentUser={testuser} setCurrentUser={function (newUser: User): void {
                } } users={[]} setUsers={function (newUsers: User[]): void {
                } } />
            </DndProvider>
        );
        const button = screen.getByRole("button", {name: "Itinerary 1"})
        userEvent.click(button)
        const inputBox = screen.getByTestId("lengthstay1")
        userEvent.clear(inputBox);
        userEvent.type(inputBox, "2");
        expect(inputBox).toHaveValue(2);
        expect(screen.getByText(/total days: 0/i)).toBeInTheDocument();
    });

    test("Filters by price", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <UserList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } itinerary1={[]} itinerary2={testi2} setItinerary={function (newItinerary: Destination[]): void {
                    testi2 = newItinerary
                } } currentUser={testuser} setCurrentUser={function (newUser: User): void {
                } } users={[]} setUsers={function (newUsers: User[]): void {
                } } />
            </DndProvider>
        );
        const minBox = screen.getByTestId("formMin");
        const maxBox = screen.getByTestId("formMax");
        userEvent.clear(minBox);
        userEvent.clear(maxBox);
        userEvent.type(minBox, "20");
        userEvent.type(maxBox, "30");
        const button = screen.getByRole("button", {name: "Filter"});
        userEvent.click(button)
        expect(screen.getAllByTestId(/userlistdest/i)).toHaveLength(1);
    });
    test("Filters by location", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <UserList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } itinerary1={[]} itinerary2={testi2} setItinerary={function (newItinerary: Destination[]): void {
                    testi2 = newItinerary
                } } currentUser={testuser} setCurrentUser={function (newUser: User): void {
                } } users={[]} setUsers={function (newUsers: User[]): void {
                } } />
            </DndProvider>
        );
        const resetButton = screen.getByRole("button", {name: "Reset"})
        userEvent.click(resetButton);
        const abbrevBox = screen.getByTestId("abbrevBox");
        userEvent.clear(abbrevBox)
        userEvent.type(abbrevBox, "aa")
        const button = screen.getByTestId("searchLoc")
        userEvent.click(button)
        expect(screen.getAllByTestId(/userlistdest/i)).toHaveLength(1);
    });
    test("Filters by Description", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <UserList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } itinerary1={[]} itinerary2={testi2} setItinerary={function (newItinerary: Destination[]): void {
                    testi2 = newItinerary
                } } currentUser={testuser} setCurrentUser={function (newUser: User): void {
                } } users={[]} setUsers={function (newUsers: User[]): void {
                } } />
            </DndProvider>
        );
        const resetButton = screen.getByRole("button", {name: "Reset"})
        userEvent.click(resetButton);
        const wordBox = screen.getByTestId("formName");
        userEvent.clear(wordBox)
        userEvent.type(wordBox, "2")
        const button = screen.getByTestId("searchDesc")
        userEvent.click(button)
        expect(screen.getAllByTestId(/dest/i)).toHaveLength(1);
    });
    test("Sorts by all features", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <UserList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } itinerary1={[]} itinerary2={testi2} setItinerary={function (newItinerary: Destination[]): void {
                    testi2 = newItinerary
                } } currentUser={testuser} setCurrentUser={function (newUser: User): void {
                } } users={[]} setUsers={function (newUsers: User[]): void {
                } } />
            </DndProvider>
        );
        const resetButton = screen.getByRole("button", {name: "Reset"})
        userEvent.click(resetButton);
        const dropdown = screen.getByTestId("formQuery");
        fireEvent.change(dropdown, {target: {value: 'HighCost'}})
        const button = screen.getByRole("button", {name: "Sort"});
        userEvent.click(button)
        expect(screen.getAllByTestId(/cost/i)[0]).toHaveTextContent("Cost: $46")
        fireEvent.change(dropdown, {target: {value: 'LowCost'}})
        userEvent.click(button)
        expect(screen.getAllByTestId(/cost/i)[0]).toHaveTextContent("Cost: $6")
        fireEvent.change(dropdown, {target: {value: 'State'}})
        userEvent.click(button)
        expect(screen.getAllByTestId(/title/i)[0]).toHaveTextContent("Sample2, AA")
    });
})