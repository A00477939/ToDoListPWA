import Dexie from 'dexie';

// Initialize Dexie database instance
const db = new Dexie("listDatabase");

// Define the schema for the database
db.version(1).stores({
  list: "id, title, status, priority", 
});


// Add to Database
function addListToDB(id, title, status, priority) {
    db.list
      .put({id,title,status,priority})
      .then(() => true)
      .catch((err) => {
        alert("Ouch... " + err);
      });
  }


// Fetch all data from database
  function getAllListFromDB() {
    if (db && db.list) {
      return db.list.toArray().then((data) => {
        return data;
      });
    } else {
      return undefined;
    }
  }

//Delete the task
  function removeTask(id) {
    return db.list.delete(id)
      .then(() => {

        console.log(`Task with id ${id} was removed`);

        return true;
      })
      .catch((err) => {
        console.error("Failed to remove task: ", err);
        return false;
      });
  }

  //Update the status

  function updateStatusInDB(id, status) {
    return db.list.update(id, { status: !status }).then(function (updated) {
      if (updated)
        console.log("Updated successfully");
      else
        console.log("Failed to update");
    });
  }


  //Update the priority

  function updatepriorityInDB(id, priority) {
    return db.list.update(id, { priority: priority }).then(function (updated) {
      if (updated)
        console.log("Updated successfully");
      else
        console.log("Failed to update");
    });
  }
  
  





export { addListToDB };
export { getAllListFromDB };
export { removeTask };
export { updateStatusInDB };
export { updatepriorityInDB };




