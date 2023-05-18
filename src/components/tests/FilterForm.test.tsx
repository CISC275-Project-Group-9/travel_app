/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, ReactNode } from "react";
import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import userEvent from "@testing-library/user-event";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FilterForm } from "../FilterForm";
import { priceFilter } from "../../interfaces/filterSort";

describe("FilterForm Component tests", () => {
    test("There is a Filter by Price label", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <FilterForm onSubmit={function (newPrices: priceFilter): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByText(/Filter by Price/i)).toBeInTheDocument();
    });
    test("There is a Min label", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <FilterForm onSubmit={function (newPrices: priceFilter): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByText(/Min/i)).toBeInTheDocument();
    });
    test("There is a Max label", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <FilterForm onSubmit={function (newPrices: priceFilter): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        expect(screen.getByText(/Max/i)).toBeInTheDocument();
    });
    test("sample min and max range", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <FilterForm onSubmit={function (setPrices: priceFilter): void {
                    throw new Error("Function not implemented.");
                } } />
            </DndProvider>
        );
        const minBox = screen.getByTestId("formMin");
        const maxBox = screen.getByTestId("formMax");
        userEvent.type(minBox, "4")
        userEvent.type(maxBox, "10")
        expect(screen.getByRole("button", {name: "Filter"})).toBeInTheDocument();
    });
    test("There is a Filter button that submits", () => {
        const onSubmit = jest.fn();
        const { getByTestId } = render(<FilterForm onSubmit={onSubmit} />);
        fireEvent.click(screen.getByText("Filter"));
        expect(onSubmit).toHaveBeenCalled();
    });
})