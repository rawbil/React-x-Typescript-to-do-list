import { useContext, useState } from "react";
import "./SingleTask.css";
import { FaTrashAlt, FaPen, FaFile } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

interface Task {
  id: number;
  text: string;
  checked: boolean;
}

interface TaskItemsProps {
  task: Task;
}

const SingleTask = ({ task,  }: TaskItemsProps) => {

  const [editOn, setEditOn] = useState<boolean>(false);
  const [taskLabel, setTaskLabel] = useState(task.text);

  const context = useContext(AppContext);
  if(!context) {
    return;
  }
  const {taskItems, setTaskItems, handleDelete, handleCheck} = context;

//come back and handle this to store and fetch from localStorage
  function handleSave(id: number) {
    const updatedTask = taskItems.map(item => (
      item.id === id ? {...item, text: taskLabel} : item
    ))
    setTaskItems(updatedTask)
    setEditOn(false);
    localStorage.setItem('taskList', JSON.stringify(updatedTask));
  }
  
  return (
    <div className="single-task">
      <input
        type="checkbox"
        name="check"
        id={`check-${task.id}`}
        className="check"
        checked={task.checked}
        onChange={() => handleCheck(task.id)}
        onClick={() => setEditOn(false)}
      />
      {editOn && task.checked ? (
        <input
          type="text"
          className="task-label"
          onChange={(e) => setTaskLabel(e.target.value)}
          value={taskLabel}
        />
      ) : (
        <label htmlFor={`check-${task.id}`}>{task.text}</label>
      )}

      <div className="icons">
        {task.checked && (
          <>
            <FaTrashAlt
              onClick={() => handleDelete(task.id)}
              className="delete" title="delete"
            />
            <hr />
            {editOn ? (
              <FaFile title="save" onClick={() => handleSave(task.id)}/>
            ) : (
              <FaPen title="edit" className="edit" onClick={() => setEditOn(!editOn)} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SingleTask;
