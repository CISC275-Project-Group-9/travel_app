/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, ReactNode } from "react";
import { render, screen } from "@testing-library/react";

import { DndProvider } from "react-dnd";
import userEvent from "@testing-library/user-event";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from "./App"

describe("RoleDropdown Component tests", () => {
    test("There is the name of the app", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <App />
            </DndProvider>
        ); 
        expect(screen.getByText(/ExplorerPro/i)).toBeInTheDocument();
    });
    test("There is the team number", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <App />
            </DndProvider>
        );   
        expect(screen.getByText(/Team 9/i)).toBeInTheDocument();
    
    });
    test("Benita's name", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <App />
            </DndProvider>
        );   
        expect(screen.getByText(/Benita/i)).toBeInTheDocument();
    
    });
    test("Sneha's name", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <App />
            </DndProvider>
        );   
        expect(screen.getByText(/Sneha/i)).toBeInTheDocument();
    
    });
    test("Joey's name", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <App />
            </DndProvider>
        );   
        expect(screen.getByText(/Joey/i)).toBeInTheDocument();
    
    });
    test("Sam's name", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <App />
            </DndProvider>
        );   
        expect(screen.getByText(/Sam/i)).toBeInTheDocument();
    
    });
    test("Chris's name", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <App />
            </DndProvider>
        );   
        expect(screen.getByText(/Chris/i)).toBeInTheDocument();
    
    })
    
})