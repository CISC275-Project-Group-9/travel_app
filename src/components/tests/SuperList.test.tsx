/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import userEvent from "@testing-library/user-event";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SuperList } from "../SuperList";
import { Destination } from "../../interfaces/destination";

describe("SuperList Component tests", () => {
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
        }
    ] as Destination[]

    let sampleSharedList = [{
        id: 3,
        name: "Sample3",
        description: "Sample3",
        location: "ZZ",
        image: "panda.JPG",
        days: 0,
        cost: 46,
        activities: ["activity 1", "activity 2"]
    }] as Destination[]
    test("Displays central list", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <SuperList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } sharedList={sampleSharedList} setSharedList={function (newSharedList: Destination[]): void {
                    sampleSharedList = newSharedList;
                } } />
            </DndProvider>
        );
        expect(screen.getAllByTestId(/dest/).length).toEqual(3);
    });
    test("Displays shared list", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <SuperList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } sharedList={sampleSharedList} setSharedList={function (newSharedList: Destination[]): void {
                    sampleSharedList = newSharedList;
                } } />
            </DndProvider>
        );
        const dragItem = screen.getByTestId("box1");
        const dropBox = screen.getByTestId("dropbox");
        fireEvent.dragStart(dragItem);
        fireEvent.drop(dropBox);
        expect(screen.getAllByTestId(/shared/).length).toEqual(1);
    });
    test("Edits Destination name", () => {
        
        render(
            <DndProvider backend={HTML5Backend}>
                <SuperList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } sharedList={sampleSharedList} setSharedList={function (newSharedList: Destination[]): void {
                    sampleSharedList = newSharedList;
                } } />
            </DndProvider>
        );
        const editMode = screen.getByRole("checkbox");
        userEvent.click(editMode);
        const nameTextbox = screen.getByTestId("editName3")
        userEvent.type(nameTextbox, "+NewName")
        expect(sampleSharedList[0].name).toEqual("Sample3+NewName");
    });
    test("Edits Destination cost", () => {
        
        render(
            <DndProvider backend={HTML5Backend}>
                <SuperList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } sharedList={sampleSharedList} setSharedList={function (newSharedList: Destination[]): void {
                    sampleSharedList = newSharedList;
                } } />
            </DndProvider>
        );
        const editMode = screen.getByRole("checkbox");
        userEvent.click(editMode);
        const costTextbox = screen.getByTestId("editCost3")
        userEvent.clear(costTextbox)
        userEvent.type(costTextbox, "55")
        expect(sampleSharedList[0].cost).toEqual(55);
    });
    test("Edits Destination activities", () => {
        
        render(
            <DndProvider backend={HTML5Backend}>
                <SuperList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } sharedList={sampleSharedList} setSharedList={function (newSharedList: Destination[]): void {
                    sampleSharedList = newSharedList;
                } } />
            </DndProvider>
        );
        const editMode = screen.getByRole("checkbox");
        userEvent.click(editMode);
        const activitiesTextbox = screen.getByTestId("editActivities3")
        userEvent.type(activitiesTextbox, ",activity 3")
        expect(sampleSharedList[0].activities).toEqual(["activity 1", "activity 2", "activity 3"]);
    });
    test("Edits Destination location", () => {
        
        render(
            <DndProvider backend={HTML5Backend}>
                <SuperList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } sharedList={sampleSharedList} setSharedList={function (newSharedList: Destination[]): void {
                    sampleSharedList = newSharedList;
                } } />
            </DndProvider>
        );
        const editMode = screen.getByRole("checkbox");
        userEvent.click(editMode);
        const locTextbox = screen.getByTestId("editLocation3")
        userEvent.clear(locTextbox)
        userEvent.type(locTextbox, "LA")
        expect(sampleSharedList[0].location).toEqual("LA");
    });
    test("Edits Destination description", () => {
        
        render(
            <DndProvider backend={HTML5Backend}>
                <SuperList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } sharedList={sampleSharedList} setSharedList={function (newSharedList: Destination[]): void {
                    sampleSharedList = newSharedList;
                } } />
            </DndProvider>
        );
        const editMode = screen.getByRole("checkbox");
        userEvent.click(editMode);
        const descTextbox = screen.getByTestId("editDescription3")
        userEvent.type(descTextbox, "+NewStuff")
        expect(sampleSharedList[0].description).toEqual("Sample3+NewStuff");
    });
    test("Deletes from shared list", () => {
        
        render(
            <DndProvider backend={HTML5Backend}>
                <SuperList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } sharedList={sampleSharedList} setSharedList={function (newSharedList: Destination[]): void {
                    sampleSharedList = newSharedList;
                } } />
            </DndProvider>
        );
        const editMode = screen.getByRole("checkbox");
        const button = screen.getByTestId("deleteButton3")
        userEvent.click(button)
        expect(sampleSharedList.length).toEqual(1);
    });
    test("Adds new Destination", () => {
        
        render(
            <DndProvider backend={HTML5Backend}>
                <SuperList centralList={sampleCentralList} setCentralList={function (newCentralList: Destination[]): void {
                    sampleCentralList = newCentralList;
                } } sharedList={sampleSharedList} setSharedList={function (newSharedList: Destination[]): void {
                    sampleSharedList = newSharedList;
                } } />
            </DndProvider>
        );
        const nameTextbox = screen.getByRole("textbox", {name: /name/i})
        const descTextbox = screen.getByRole("textbox", {name: /description/i})
        const locationTextbox = screen.getByRole("textbox", {name: /location/i})
        const costBox = screen.getByRole("spinbutton", {name: /cost/i})
        const activitiesTextbox = screen.getByRole("textbox", {name: /activities/i})
        const addButton = screen.getByRole("button", {name: /add/i})
        userEvent.type(nameTextbox, "Beach")
        userEvent.type(descTextbox, "swimming")
        userEvent.type(locationTextbox, "ZZ")
        userEvent.type(costBox, "23")
        userEvent.type(activitiesTextbox, "activity 1, activity 2")
        userEvent.click(addButton)
        expect(sampleCentralList.length).toEqual(4);
        });
})