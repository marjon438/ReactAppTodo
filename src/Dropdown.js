import { useContext, useState } from "react";
import { AppContext } from "./App";

export function Dropdown() {
  const [openDropdownState, setOpenDropdownState] = useState(false);
  const { filterState, setfilterState } = useContext(AppContext);

  function handleOpen() {
    setOpenDropdownState(!openDropdownState);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function FilterButton({ filterName }) {
    return (
      <button
        onClick={() => {
          setfilterState(filterName);
          handleOpen();
        }}
      >
        {capitalizeFirstLetter(filterName)}
      </button>
    );
  }

  return (
    <div className="dropdown">
      {openDropdownState ? (
        <div>
          <div>
            <FilterButton filterName={"all"} />
          </div>
          <div>
            <FilterButton filterName={"done"} />
          </div>
          <div>
            <FilterButton filterName={"undone"} />
          </div>
        </div>
      ) : (
        <button onClick={handleOpen}>
          Filter ({capitalizeFirstLetter(filterState)})
        </button>
      )}
    </div>
  );
}
