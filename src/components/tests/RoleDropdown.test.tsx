/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, ReactNode } from "react";
import { render, screen } from "@testing-library/react";

import { DndProvider } from "react-dnd";
import userEvent from "@testing-library/user-event";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RoleDropdown } from "../RoleDropdown";


describe("RoleDropdown Component tests", () => {
    test("There is a Choose your role label", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
            </DndProvider>
        );
        
        expect(screen.getByText(/Choose your/i)).toBeInTheDocument();
    });
    test("There is a dropdown box", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <RoleDropdown />
            </DndProvider>
        );   
    
    })
    
})