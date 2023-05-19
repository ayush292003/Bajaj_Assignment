import React, { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.employees);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (!filter) {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter((employee) => {
        const name = employee.name ? employee.name.toLowerCase() : "";
        const designation = employee.designation
          ? employee.designation.toLowerCase()
          : "";
        const skills = employee.skills
          ? employee.skills.map((skill) => skill.toLowerCase())
          : [];

        return (
          name.includes(filter.toLowerCase()) ||
          designation.includes(filter.toLowerCase()) ||
          skills.some((skill) => skill.includes(filter.toLowerCase()))
        );
      });
      setFilteredEmployees(filtered);
    }
  }, [employees, filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div style={{
        backgroundImage: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        textAlign: "center",
        border: "5px dotted black",
        width: "100%"
      }}>
      <h1>Employee Filter</h1>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter by name/designation/skills"
      />
      <ul>
        {filteredEmployees.map((employee) => (
          <li key={employee.id}>
            <h2>{employee.name}</h2>
            <p>Designation: {employee.designation}</p>
            <p>Skills: {employee.skills.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
