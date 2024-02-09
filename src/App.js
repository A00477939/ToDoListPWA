import { useState } from "react";

export default function App() {
  const [newItem, setNewItem] = useState("Drink more Water");
  const [tolist, setTolist] = useState([]);

  //It will add the item into array
  function submitRequest(e) {
    e.preventDefault(); // So page won't refresh

    setTolist((currentToList) => {  
      return [
        ...currentToList,
        {
          id: Math.random().toString(36).substring(2),
          title: newItem,
          status: false,
          priority: "Low", // Default priority
        },
      ];
    });
    // Clear the input field after adding a new item
    setNewItem("");
  }

  //it will delete the list 
  function deleteItem(id) {
    setTolist((currentToList) => {
      return currentToList.filter((item) => item.id !== id); //Will return the item only if the condition is true
    });
  }



  function handleCheckboxChange(id) {
    setTolist((currentToList) => {
      return currentToList.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      );
    });
  }



  function handlePriorityChange(id, priority) {
    setTolist((currentToList) => {
      return currentToList.map((item) =>
        item.id === id ? { ...item, priority: priority } : item
      );
    });
  }


  return (
    <>
      <form onSubmit={submitRequest} className="newForm">
        <div className="formRow">
          <input
            type="text"
            value={newItem}
            id="item"
            onChange={(e) => setNewItem(e.target.value)}
            className="listInput"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <div className="listContainer">
      <ul className="list">
        {tolist.map((todo) => (
          <li key={todo.id}>
       
              <input
                type="checkbox"
                checked={todo.status}
                onChange={() => handleCheckboxChange(todo.id)}
                className="checkStatus"
              />
            
            <select
              className="listPriority"
              value={todo.priority}
              onChange={(e) => handlePriorityChange(todo.id, e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="High">High</option>
            </select>


              <label className="listName">
              {todo.title}
            </label>
      

            <button onClick={() => deleteItem(todo.id)} className="btn-delete">
            <i className="fas fa-trash-alt" style={{ color: "#cc2c0f" }}></i>
            </button>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}
