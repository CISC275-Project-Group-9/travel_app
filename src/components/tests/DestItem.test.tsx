/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import userEvent from "@testing-library/user-event";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DestItem } from "../DestItem";

describe("DestItem Component tests", () => {
    test("Displays image", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <DestItem 
                    id={1} 
                    name={"Sample Name"} 
                    description={"Sample Description"} 
                    image={"ZZ.jpeg"} 
                    location={"ZZ"} 
                    days={0} 
                    cost={23} 
                    activities={["activity 1", "activity 2"]} />
            </DndProvider>
        );
        expect(screen.getByRole("img")).toHaveAttribute("src", "ZZ.jpeg");
    });
    test("Displays Name followed by Location", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <DestItem 
                    id={1} 
                    name={"Sample Name"} 
                    description={"Sample Description"} 
                    image={"ZZ.jpeg"} 
                    location={"ZZ"} 
                    days={0} 
                    cost={23} 
                    activities={["activity 1", "activity 2"]} />
            </DndProvider>
        );
        expect(screen.getByTestId("title")).toHaveTextContent("Sample Name, ZZ");
    });
    test("Displays Description", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <DestItem 
                    id={1} 
                    name={"Sample Name"} 
                    description={"Sample Description"} 
                    image={"ZZ.jpeg"} 
                    location={"ZZ"} 
                    days={0} 
                    cost={23} 
                    activities={["activity 1", "activity 2"]} />
            </DndProvider>
        );
        expect(screen.getByTestId("description")).toHaveTextContent("Sample Description");
    });
    test("Displays Activities", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <DestItem 
                    id={1} 
                    name={"Sample Name"} 
                    description={"Sample Description"} 
                    image={"ZZ.jpeg"} 
                    location={"ZZ"} 
                    days={0} 
                    cost={23} 
                    activities={["activity 1", "activity 2"]} />
            </DndProvider>
        );
        expect(screen.getByTestId("activities")).toHaveTextContent("activity 1, activity 2");
    });
    test("Displays Cost", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <DestItem 
                    id={1} 
                    name={"Sample Name"} 
                    description={"Sample Description"} 
                    image={"ZZ.jpeg"} 
                    location={"ZZ"} 
                    days={0} 
                    cost={23} 
                    activities={["activity 1", "activity 2"]} />
            </DndProvider>
        );
        expect(screen.getByTestId("cost")).toHaveTextContent("$23");
    });
    
})