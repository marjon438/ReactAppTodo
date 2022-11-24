import React, { useContext, useState } from "react";
import { AppContext } from "./App";

export function Dropdown() {
  const [openDropdownState, setOpenDropdownState] = React.useState(false);
  const { filterState, setfilterState } = useContext(AppContext);

  function handleOpen() {
    setOpenDropdownState(!openDropdownState);
  }

  return (
    <div className="dropdown">
      {openDropdownState ? (
        <div>
          <div>
            <button
              onClick={() => {
                setfilterState("all");
                handleOpen();
              }}
            >
              All
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setfilterState("done");
                handleOpen();
              }}
            >
              Done
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setfilterState("undone");
                handleOpen();
              }}
            >
              Undone
            </button>
          </div>
        </div>
      ) : (
        <button onClick={handleOpen}>Filter ({filterState})</button>
      )}
    </div>
  );
}
