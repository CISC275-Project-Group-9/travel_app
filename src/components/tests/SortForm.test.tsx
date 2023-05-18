/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import userEvent from "@testing-library/user-event";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SortForm } from "../SortForm";
import { Sort } from "../../interfaces/filterSort";

describe("SortForm Component tests", () => {
    test("There is a Sort by label", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <SortForm onSubmit={function (sort: Sort): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    });
    test("There is a dropdown box", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <SortForm onSubmit={function (sort: Sort): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );  
        expect(screen.getByTestId("formQuery")).toBeInTheDocument();    
    });
    test("Initially 3 options", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <SortForm onSubmit={function (sort: Sort): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        const dropdown = screen.getByTestId("formQuery") as HTMLSelectElement  
        expect(dropdown.options.length).toEqual(3); 
    })
    test("Default sort is by 'State'", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <SortForm onSubmit={function (sort: Sort): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );  
        expect(screen.getByTestId("formQuery")).toHaveValue('State');    
    });
    test("Select different sort", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <SortForm onSubmit={function (sort: Sort): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        const dropdown = screen.getByTestId("formQuery");
        fireEvent.change(dropdown, {target: {value: 'State'}})
        expect(dropdown).toHaveValue('State');
        fireEvent.change(dropdown, {target: {value: 'LowCost'}})
        expect(dropdown).toHaveValue('LowCost');
        fireEvent.change(dropdown, {target: {value: 'HighCost'}})
        expect(dropdown).toHaveValue('HighCost');
    });
    test("There is a Sort button that submits", () => {
        const onSubmit = jest.fn();
        const { getByTestId } = render(<SortForm onSubmit={onSubmit} />);
        fireEvent.click(screen.getByText("Sort"));
        expect(onSubmit).toHaveBeenCalled();
    });
})