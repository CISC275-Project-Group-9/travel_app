/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, ReactNode, useState } from "react";
import { render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import userEvent from "@testing-library/user-event";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AddForm } from "../AddForm";
import { Destination } from "../../interfaces/destination";

describe("AddForm Component tests", () => {
    test("There is a name label and textbox", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <AddForm onSubmit={function (newDestination: Destination): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByText(/name/i)).toBeInTheDocument();
        expect(screen.getByRole("textbox", {name: /name/i})).toBeInTheDocument();
    });
    test("There is a description label and textbox", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <AddForm onSubmit={function (newDestination: Destination): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByText(/description/i)).toBeInTheDocument();
        expect(screen.getByRole("textbox", {name: /description/i})).toBeInTheDocument();
    });
    test("There is a location label and textbox", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <AddForm onSubmit={function (newDestination: Destination): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByText(/location/i)).toBeInTheDocument();
        expect(screen.getByRole("textbox", {name: /location/i})).toBeInTheDocument();
    });
    test("There is a cost label and textbox", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <AddForm onSubmit={function (newDestination: Destination): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByText(/cost/i)).toBeInTheDocument();
        expect(screen.getByRole("spinbutton", {name: /cost/i})).toBeInTheDocument();
    });
    test("There is a activities label and textbox", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <AddForm onSubmit={function (newDestination: Destination): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByText(/activities/i)).toBeInTheDocument();
        expect(screen.getByRole("textbox", {name: /activities/i})).toBeInTheDocument();
    });
    test("Can add new destination", () => {
        let dest = {} as Destination
        render(
            <DndProvider backend={HTML5Backend}>
                <AddForm onSubmit={function (newDestination: Destination): void {
                    dest = newDestination;
                } } />
            </DndProvider>
        );
        const nameTextbox = screen.getByRole("textbox", {name: /name/i})
        const descTextbox = screen.getByRole("textbox", {name: /description/i})
        const locationTextbox = screen.getByRole("textbox", {name: /location/i})
        const costBox = screen.getByRole("spinbutton", {name: /cost/i})
        const activitiesTextbox = screen.getByRole("textbox", {name: /activities/i})
        const addButton = screen.getByRole("button", {name: /add/i})
        userEvent.type(nameTextbox, "Sample")
        userEvent.type(descTextbox, "Sample")
        userEvent.type(locationTextbox, "ZZ")
        userEvent.type(costBox, "23")
        userEvent.type(activitiesTextbox, "activity 1, activity 2")
        userEvent.click(addButton)
        expect(dest).toEqual({id: 40, name: "Sample", location: "ZZ", description: "Sample", image: "panda.JPG", cost: 23, days: 0, activities: ["activity 1", " activity 2"]});
    });
    
})