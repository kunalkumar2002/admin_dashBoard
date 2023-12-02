import "./App.css";
import Content from "./content";
import Pagination from "./pagination";
import Updatecontent from "./updatecontent";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [content, setContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nowat, setNowAt] = useState("dashbord");
  const [update, setUpdate] = useState("");

  const itemsPerPage = 10;

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setContent(response.data);
    } catch (error) {
      console.log("getting error in fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    const newData = content.filter((item) => id !== item.id);
    setContent(newData);
  };
  const handleUpdate = (item) => {
    //console.log(item);
    setUpdate(item);
    setNowAt("update");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleChange = (updatedItem) => {
    console.log(updatedItem);
    // Find the index of the item in the content array
    const index = content.findIndex((item) => item.id === updatedItem.id);

    if (index !== -1) {
      // Create a new array with the updated item
      const updatedContent = [...content];
      updatedContent[index] = updatedItem;

      // Update the state with the new array
      setContent(updatedContent);

      // Set nowat back to "dashboard"
      setNowAt("dashbord");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = content.slice(startIndex, endIndex);

  return (
    <div className="App">
      {nowat === "update" && (
        <div>
          <button onClick={() => setNowAt("dashbord")}>Dashboard</button>
          <Updatecontent data={update} onUpdate={handleChange} />
        </div>
      )}
      {nowat === "dashbord" && (
        <>
          <Content
            data={displayedData}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
          <Pagination
            totalItems={content.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default App;
