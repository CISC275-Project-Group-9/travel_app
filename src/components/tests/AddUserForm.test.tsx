/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import userEvent from "@testing-library/user-event";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AddUserForm } from "../AddUserForm";
import { RoleDropdown } from "../RoleDropdown";
import { User } from "../../interfaces/user";

describe("AddUserForm Component tests", () => {
    test("There is a name label", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
                <AddUserForm onSubmit={function (u: User): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByText(/name/i)).toBeInTheDocument();
    });
    test("There is a name box", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
                <AddUserForm onSubmit={function (u: User): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByTestId(/name/i)).toBeInTheDocument();
    });
    test("There is a role label", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
                <AddUserForm onSubmit={function (u: User): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByText(/role/i)).toBeInTheDocument();
    });
    test("There is a role dropdown", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
                <AddUserForm onSubmit={function (u: User): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByTestId("role")).toBeInTheDocument();
    });
    test("There is a new user button", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
                <AddUserForm onSubmit={function (u: User): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByRole("button", {name: "Add User"})).toBeInTheDocument();
    });
    test("Create new Faculty user", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
                <AddUserForm onSubmit={function (u: User): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        const nameBox = screen.getByTestId("newUserName");
        const roleDropdown = screen.getByTestId("role");
        userEvent.type(nameBox, "Benita")
        fireEvent.change(roleDropdown, {target: {value: 'Faculty'}})
        expect(screen.getByRole("button", {name: "Add User"})).toBeInTheDocument();
    });
    
})