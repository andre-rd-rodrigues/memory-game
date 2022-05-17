// test-utils.jsx
import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import reducer from "store/rootReducer";

let store, initialState;

store = configureStore({ reducer, preloadedState: initialState });

initialState = {
  entities: {
    game: {
      settings: {
        theme: "icons",
        boardSize: 4
      },
      board: {
        reset: false
      },
      status: {
        started: false,
        finished: false
      },
      time: {
        started: 0,
        finished: 0
      },
      players: [
        {
          id: 1,
          moves: 0,
          winner: false
        }
      ]
    }
  }
};

const ConnectedComponent = ({ children }) => {
  return (
    <MemoryRouter>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );
};

function render(ui, { newState, ...renderOptions } = {}) {
  const Wrapper = ({ children }) => {
    if (newState) {
      store = configureStore({ reducer, preloadedState: initialState });
    }
    return (
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render, initialState, ConnectedComponent };
