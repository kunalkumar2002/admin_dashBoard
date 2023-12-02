import Page from "./page";
import { useState, useEffect } from "react";
const Content = (props) => {
  const { data: initialData, handleDelete, handleUpdate } = props;

  const [data, setData] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectAll = () => {
    const allRowIds = data.map((item) => item.id);
    setSelectedRows(selectedRows.length === allRowIds.length ? [] : allRowIds);
  };

  const handleSelectRow = (rowId) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(rowId)
        ? prevSelectedRows.filter((id) => id !== rowId)
        : [...prevSelectedRows, rowId]
    );
  };

  const handleSearch = (event) => {
    // Trigger search on ENTER (keyCode 13)
    if (event.key === "Enter") {
      // Filter the data based on the search query
      const newData = initialData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.role.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Update the displayed data using setData
      setData(newData);
    }
  };

  // Update the data when initialData prop changes
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleBulkdelete = () => {
    //console.log("delete");
    if (selectedRows.length > 0) {
      // Filter out selected rows from the data
      const newData = data.filter((item) => !selectedRows.includes(item.id));

      // Update the state with the new data
      setData(newData);

      // Call handleDelete for each selected row
      selectedRows.forEach((id) => {
        console.log(id);
        handleDelete(id);
      });

      // Clear the selected rows after deletion
      setSelectedRows([]);
    }
  };

  //   console.log(selectedRows);
  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          style={{
            width: "300px",
            border: "2px solid gray",
            borderRadius: "5px",
          }}
          placeholder="Enter value..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button
          style={{
            backgroundColor: "green",
            padding: "10px",
            color: "white",
            border: "2px solid black",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleBulkdelete}
        >
          delete
        </button>
      </div>
      <div
        style={{
          marginTop: "20px",
          border: "2px solid black",
          borderRadius: "5px",
          padding: "10px",
          paddingRight: "50px",
          display: "flex",
          justifyContent: "space-between",
          color: "blueviolet",
        }}
      >
        <input
          type="checkbox"
          checked={selectedRows.length === data.length}
          onChange={handleSelectAll}
        />

        <span>Name</span>
        <span>Email</span>
        <span>Role</span>

        <span>Actions</span>
      </div>

      <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
        {data.map((item, index) => (
          <li key={index}>
            <Page
              item={item}
              index={index}
              isSelected={selectedRows.includes(item.id)}
              onSelect={handleSelectRow}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Content;
