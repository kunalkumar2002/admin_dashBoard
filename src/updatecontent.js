import "./update.css";
import { useState } from "react";

const Updatecontent = ({ data, onUpdate }) => {
  const [fill, setfill] = useState({
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
  });

  const handleSave = () => {
    // Call the onUpdate function and pass the updated data
    onUpdate(fill);
  };

  return (
    <div className="content">
      <div className="update-form">
        <label>Name</label>
        <input
          type="text"
          value={fill.name}
          onChange={(e) =>
            setfill((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <label>Email</label>
        <input
          type="email"
          value={fill.email}
          onChange={(e) =>
            setfill((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <label>Role</label>
        <input
          type="text"
          value={fill.role}
          onChange={(e) =>
            setfill((prev) => ({ ...prev, role: e.target.value }))
          }
        />
        <button className="inner-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Updatecontent;
