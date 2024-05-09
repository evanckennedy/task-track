import { FaPen, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useState, useEffect } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask !== '') {
      setTasks(t => [newTask, ...t]);
      setNewTask('');
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);;
    }
  }

  useEffect(() => {
    if (tasks.length > 0) {
      tasks.length === 1 ? 
        document.title = `Task Track (${tasks.length} Task)` :
        document.title = `Task Track (${tasks.length} Tasks)`;
    } else {
      document.title = `Task Track`;
    }
  }, [tasks]);

  return (
    <>
      <section className='center'>
        <form className="flex">
          <div className='input-container flex gap-10'>
            <input 
              className="user-input" 
              type="text" 
              placeholder="My new task"
              value={newTask}
              onChange={handleInputChange}
            />
            <input 
              className="add-button" 
              type="button" 
              value="Add"
              onClick={addTask}
            />
          </div>
        </form>
      </section>
      <section className="task-grid-container gap-15">
        {tasks.map((task, index) => 
          <div key={index} className='task-container flex'>
            <p className='task'>{task}</p>
            <div className="task-controls flex justify-between">
              <div className='up-down flex gap-5'>
                <FaArrowDown className='down-icon' onClick={() => moveTaskDown(index)}/>
                <FaArrowUp className='up-icon' onClick={() => moveTaskUp(index)}/>
              </div>
              <div className="edit-delete flex gap-10">
                <FaPen className='edit-icon' />
                <FaTrash className='delete-icon' onClick={() => deleteTask(index)}/>
              </div>
            </div>   
          </div>
        )}
      </section>
    </>
  )
}

export default ToDoList;