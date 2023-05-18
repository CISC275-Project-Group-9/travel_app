/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import userEvent from "@testing-library/user-event";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RoleDropdown } from "../RoleDropdown";


describe("RoleDropdown Component tests", () => {
    test("There is a Choose your user label", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
            </DndProvider>
        );
        
        expect(screen.getByText(/Choose your user/i)).toBeInTheDocument();
    });
    test("There is a dropdown box", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
            </DndProvider>
        );  
        expect(screen.getByTestId("changeUser")).toBeInTheDocument();    
    });
    test("Initially 3 options", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
            </DndProvider>
        );
        const dropdown = screen.getByTestId("changeUser") as HTMLSelectElement  
        expect(dropdown.options.length).toEqual(3); 
    })
    test("Default user is 'Default Basic User'", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
            </DndProvider>
        );  
        expect(screen.getByTestId("changeUser")).toHaveValue('Default Basic User');    
    });
    test("selectUser function", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
            </DndProvider>
        );  
        const dropdown = screen.getByTestId("changeUser");
        fireEvent.change(dropdown, {target: {value: 'Default Staff User'}})
        expect(dropdown).toHaveValue('Default Staff User');    
    });
    test("addNewUser function", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
            </DndProvider>
        );
        const dropdown = screen.getByTestId("changeUser");
        fireEvent.change(dropdown, {target: {value: 'Default Faculty User'}})
        const nameBox = screen.getByTestId("newUserName")
        userEvent.type(nameBox, "Benita")
        const addUserButton = screen.getByRole("button", {name: "Add User"})
        userEvent.click(addUserButton)
        expect(dropdown).toHaveValue("Benita"); 
    });
    test("deleteUser function", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
            </DndProvider>
        );
        const dropdown = screen.getByTestId("changeUser");
        fireEvent.change(dropdown, {target: {value: 'Default Faculty User'}});
        const nameBox = screen.getByTestId("newUserName");
        userEvent.type(nameBox, "Benita");
        const addUserButton = screen.getByRole("button", {name: "Add User"});
        userEvent.click(addUserButton);
        fireEvent.change(dropdown, {target: {value: 'Default Faculty User'}});
        const deleteUserDropdown = screen.getByTestId("deleteUserDropdown")
        fireEvent.change(deleteUserDropdown, {target: {value: 'Benita'}});
        const deleteUserButton = screen.getByRole("button", {name: "Delete User"});
        userEvent.click(deleteUserButton);
        expect(screen.queryByText(/Benita/)).not.toBeInTheDocument();
    });
    test("Basic user has empty itinerary", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
            </DndProvider>
        );
        expect(screen.getAllByText(/itinerary/i)).toHaveLength(3);
    });
    test("User can change itinerary", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
            </DndProvider>
        );
        const it1button = screen.getByRole("button", {name: "Itinerary 1"})
        const it2button = screen.getByRole("button", {name: "Itinerary 2"})
        expect(screen.getByText(/Itinerary 1/)).toBeInTheDocument();
        userEvent.click(it2button)
        expect(screen.getByText(/Itinerary 2/)).toBeInTheDocument();
        userEvent.click(it1button)
        expect(screen.getByText(/Itinerary 1/)).toBeInTheDocument();
    });
    
})