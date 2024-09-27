import { useContext, } from "react";
import "./TaskItems.css";
import SingleTask from "../SingleTask/SingleTask";
import { AppContext } from "../context/AppContext";

const TaskItems = () => {
  const context = useContext(AppContext);
  if(!context) {
    return <p>no items</p>
  }
  const {taskItems} = context;
  return (
    <div className="taskItems">
      <h2>My Tasks</h2>
      <ul className="taskContainer">
        {taskItems && taskItems.length ? (
          taskItems.map((task) => (
            <SingleTask key={task.id} task={task} />
          ))
        ) : (
          <p className="empty-list">Task list empty 🥲</p>
        )}
      </ul>
    </div>
  );
};

export default TaskItems;
