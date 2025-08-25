import { useContext } from "react";
import Select from "react-select";
import { ThemeContext } from "../../context/ThemeContext";
import { getReactSelectStyles } from "../../utils/getReactSelectStyles";
// import { getReactSelectStyles } from "../../utils/reactSelectStyles";

function SearchDropDown({ projects, onSelect }) {
  const { theme } = useContext(ThemeContext);

  const options = projects.map((project) => ({
    value: project.id,
    label: project.name,
  }));

  return (
    <div className="flex-1 max-w-md">
      <Select
        options={options}
        onChange={(selected) => onSelect(selected.value)}
        placeholder="Search projects..."
        isClearable
        isSearchable
        noOptionsMessage={() => "No projects found"}
        styles={getReactSelectStyles(theme)} // <- pass theme here
      />
    </div>
  );
}

export default SearchDropDown;
