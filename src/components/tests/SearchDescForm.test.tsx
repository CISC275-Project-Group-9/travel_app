/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import userEvent from "@testing-library/user-event";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SearchDescForm } from "../SearchDescForm";
import { SearchFilter } from "../../interfaces/filterSort";

describe("SearchDescForm Component tests", () => {
    test("There is a Filter by Description contains word label", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <SearchDescForm onSubmit={function (sq: SearchFilter): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByText(/Filter by Description contains word/i)).toBeInTheDocument();
    });
    test("sample words of description", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <SearchDescForm onSubmit={function (sq: SearchFilter): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        const wordBox = screen.getByTestId("formName");
        userEvent.type(wordBox, "park")
        expect(screen.getByTestId("searchDesc")).toBeInTheDocument();
    });
    test("more sample words of description", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <SearchDescForm onSubmit={function (sq: SearchFilter): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        const wordBox = screen.getByTestId("formName");
        userEvent.type(wordBox, "hiking")
        expect(screen.getByRole("button", {name: "Search"})).toBeInTheDocument();
    });
    test("Search button", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <SearchDescForm onSubmit={function (sq: SearchFilter): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByRole("button", {name: "Search"})).toBeInTheDocument();
    });
    test("There is a Search button that submits", () => {
        const onSubmit = jest.fn();
        const { getByTestId } = render(<SearchDescForm onSubmit={onSubmit} />);
        fireEvent.click(screen.getByText("Search"));
        expect(onSubmit).toHaveBeenCalled();
    });
})