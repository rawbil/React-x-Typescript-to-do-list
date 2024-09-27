import { useContext, } from "react";
import "./AddTask.css";
import { AppContext } from "../context/AppContext";

const AddTask = () => {
  const context = useContext(AppContext);
  //if context is undefined
  if (!context) {
    return <p>Context not found</p>;
  }
  const { setNewTask,newTask, handleAddSubmit } = context;

  return (
    <form className="add-task" onSubmit={handleAddSubmit}>
      <input
        type="text"
        name="add"
        id="add"
        placeholder="Add New Task"
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask}
      />
      <button type="submit">+</button>
    </form>
  );
};

export default AddTask; 
