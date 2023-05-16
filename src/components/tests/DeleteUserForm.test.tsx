/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import userEvent from "@testing-library/user-event";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DeleteUserForm } from "../DeleteUserForm";
import { RoleDropdown, User } from "../RoleDropdown";

const users = [
    {
      id: 1,
      name: "Default Basic User",
      role: "Basic",
      itinerary: [],
    },
    {
      id: 2,
      name: "Default Staff User",
      role: "Staff",
      itinerary: [],
    },
    {
      id: 3,
      name: "Default Faculty User",
      role: "Faculty",
      itinerary: [],
    },
  ]

describe("DeleteUserForm Component tests", () => {
    test("There is a delete user label", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <DeleteUserForm onSubmit={function (u: User): void {
                    throw new Error("Function not implemented.");
                } } users={users} />
            </DndProvider>
        );
        expect(screen.getByText(/Delete User:/i)).toBeInTheDocument();
    });
    test("There is a user dropdown", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <DeleteUserForm onSubmit={function (u: User): void {
                    throw new Error("Function not implemented.");
                } } users={users} />
            </DndProvider>
        );
        expect(screen.getByTestId("deleteUserDropdown")).toBeInTheDocument();
    });
    test("There are 3 roles to delete", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <DeleteUserForm onSubmit={function (u: User): void {
                    throw new Error("Function not implemented.");
                } } users={users} />
            </DndProvider>
        );
        const dropdown = screen.getByTestId("deleteUserDropdown") as HTMLSelectElement  
        expect(dropdown.options.length).toEqual(3); 
    });
    test("There is delete button", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <DeleteUserForm onSubmit={function (u: User): void {
                    throw new Error("Function not implemented.");
                } } users={users} />
            </DndProvider>
        );
        expect(screen.getByRole("button")).toBeInTheDocument();
    });
    test("Can delete user", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <DeleteUserForm onSubmit={function (u: User): void {
                    throw new Error("Function not implemented.");
                } } users={users} />
            </DndProvider>
        ); 
        const dropdown = screen.getByTestId("deleteUserDropdown") as HTMLSelectElement
        fireEvent.change(dropdown, {target: {value: "Default Basic User"}})
        const button = screen.getByRole("button", {name: "Delete User"});
        expect(dropdown.options.length).toEqual(3);
    });
})