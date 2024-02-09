import Dexie from 'dexie';

// Initialize Dexie database instance
const db = new Dexie("listDatabase");

// Define the schema for the database
db.version(1).stores({
  list: "id, title, status, priority", 
});


function addListToDB(id, title, status, priority) {
    db.list
      .put({id,title,status,priority})
      .then(() => true)
      .catch((err) => {
        alert("Ouch... " + err);
      });
  }

  function getAllListFromDB() {
    if (db && db.list) {
      // check if db and the students table are created
      return db.list.toArray().then((data) => {
        return data;
      });
    } else {
      return undefined;
    }
  }


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
  

export { addListToDB };
export { getAllListFromDB };
export { removeTask };


