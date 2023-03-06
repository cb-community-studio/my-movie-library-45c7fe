import React from "react";
import { render, screen } from "@testing-library/react";

import RentPage from "../RentPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders rent page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RentPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("rent-datatable")).toBeInTheDocument();
    expect(screen.getByRole("rent-add-button")).toBeInTheDocument();
});
