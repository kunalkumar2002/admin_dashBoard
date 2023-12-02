const Page = (props) => {
  const { item, index, isSelected, onSelect, onDelete,onUpdate } = props;

  return (
    <div>
      <div
        style={{
          marginTop: "10px",
          border: "2px solid black",
          borderRadius: "5px",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(item.id)}
          key={index}
        />

        <span>{item.name}</span>
        <span>{item.email}</span>
        <span>{item.role}</span>
        <div style={{ paddingRight: "10px" }}>
          <span
                      style={{ marginRight: "10px", cursor: "pointer", color: "green" }}
                      onClick={()=>onUpdate(item)}
            key={item.id}
          >
            update
          </span>
          <span
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => onDelete(item.id)}
          >
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
