import { useState } from "react";

export function CreateToDo(){

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

    return (  <form onSubmit={submitRequest} className="newForm">
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
    )
}