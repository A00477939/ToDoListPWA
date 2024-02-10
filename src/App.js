import React, { useState, useEffect } from 'react';
import { addListToDB, getAllListFromDB, removeTask, updateStatusInDB, updatepriorityInDB } from "./db";

export default function App() {
  const [newItem, setNewItem] = useState("Drink more Water");
  const [tolist, setTolist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Fetching Data
  useEffect(() => {
    async function fetchData() {
      try {
        const existingList = await getAllListFromDB();
        setTolist(existingList);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch list:", error);
      }
    }

    fetchData();
  }, []);

  async function submitRequest(e) {
    e.preventDefault(); // Prevent page to refresh
    const rand = Math.floor(Math.random() * 100);

    // Add new list item to the database
    await addListToDB(rand, newItem, false, "Low");

    setTolist((currentToList) => [...currentToList, {
      id: rand,
      title: newItem,
      status: false,
      priority: "Low",
    }]);
    setNewItem("");
  }


  async function deleteItem(id) {
    // Remove task from the database
    await removeTask(id);

    // Update UI by removing the task 
    setTolist((currentToList) => currentToList.filter((item) => item.id !== id));
  }

  async function handleCheckboxChange(id,status) {
    await updateStatusInDB(id,status);

    setTolist((currentToList) => currentToList.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    ));
  }


  async function handlePriorityChange(id, priority) {

    await updatepriorityInDB(id,priority);

    setTolist((currentToList) => currentToList.map((item) =>
      item.id === id ? { ...item, priority: priority } : item
    ));
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
        <button type="submit" className="btn">Add</button>
      </form>

      <div className="listContainer">
        <ul className="list">
          {isLoading ? (
            <li>Loading...</li>
          ) : (
            tolist.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => handleCheckboxChange(todo.id,todo.status)}
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
            ))
          )}
        </ul>
      </div>
    </>
  );
}

