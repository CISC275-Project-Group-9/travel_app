/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import userEvent from "@testing-library/user-event";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SearchForm } from "../SearchForm";
import { SearchFilter } from "../../interfaces/filterSort";

describe("SearchForm Component tests", () => {
    test("There is a Search by State Abbreviation label", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <SearchForm onSubmit={function (sq: SearchFilter): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByText(/Search by State Abbreviation/i)).toBeInTheDocument();
    });
    test("sample state abbreviation", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <SearchForm onSubmit={function (sq: SearchFilter): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        const abbrevBox = screen.getByTestId("abbrevBox");
        userEvent.type(abbrevBox, "de")
        expect(screen.getByRole("button", {name: "Search"})).toBeInTheDocument();
    });
    test("There is a Search button that submits", () => {
        const onSubmit = jest.fn();
        const { getByTestId } = render(<SearchForm onSubmit={onSubmit} />);
        fireEvent.click(screen.getByText("Search"));
        expect(onSubmit).toHaveBeenCalled();
    });
})