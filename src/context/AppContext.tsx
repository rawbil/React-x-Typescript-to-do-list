import { createContext, ReactNode, SetStateAction, useState } from "react";
interface SingleTask {
  id: number;
  text: string;
  checked: boolean;
}

interface AppContextProps {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  handleAddSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  taskItems: SingleTask[];
  setTaskItems: React.Dispatch<React.SetStateAction<SingleTask[]>>;
  handleDelete: (id: number) => void;
  handleCheck: (id: number) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface ProviderFunctionProps {
  children: ReactNode;
}

const ProviderFunction = (props: ProviderFunctionProps) => {
/*   const [taskItems, setTaskItems] = useState([
    {
      id: 1,
      text: "Task 1",
      checked: false,
    },
    {
      id: 2,
      text: "Task 2",
      checked: false,
    },
    {
      id: 3,
      text: "Hi, my name is Bildad and I am happy to be here. Are you happy to be here? Like I am happy to be here?",
      checked: false,
    },
  ]); */
  const [taskItems, setTaskItems] = useState(() => {
    const storedItems = localStorage.getItem('taskList');
    return storedItems ? JSON.parse(storedItems) : []
  })
  const [newTask, setNewTask] = useState("");

  function handleStorage(taskList: SetStateAction<{ id: number; text: string; checked: boolean; }[]>) {
    setTaskItems(taskList);
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }

  function handleCheck(id: number) {
    const taskList = taskItems.map((item: { id: number; checked: boolean; }) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    handleStorage(taskList);
  }

  function handleDelete(id: number) {
    const taskList = taskItems.filter((item: { id: number; }) => item.id !== id);
    handleStorage(taskList);
  }

  const handleAddToTasks = (item: string) => {
    const id = taskItems.length ? taskItems[taskItems.length - 1].id + 1 : 1;
    const addedTask = { id, text: item, checked: false };
    const originalTask = [...taskItems, addedTask];
    handleStorage(originalTask);
  };

  //handle add new task
  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    handleAddToTasks(newTask);
    setNewTask("");
  };

  return (
    <AppContext.Provider
      value={{
        newTask,
        setNewTask,
        handleAddSubmit,
        taskItems,
        setTaskItems,
        handleCheck,
        handleDelete,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default ProviderFunction;
