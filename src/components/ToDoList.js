import { FaPen, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useState } from "react";

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
      setTasks(updatedTasks);;
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);;
    }
  }

  return (
    <>
      <section className='center'>
        <form className="flex">
          <div className='input-container flex gap-10'>
            <input 
              className="user-input" 
              type="text" 
              placeholder="My new Task"
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
        
        {/* <div className='task-container flex'>
          <p className='task'>Go shopping</p>
          <div className="task-controls flex justify-between">
            <span>May 7, 09:01 a.m</span>
            <div className="edit-delete flex gap-15">
              <FaPen className='edit-icon'/>
              <FaTrash className='delete-icon'/>
            </div>
          </div>   
        </div> */}

      </section>
    </>
  )
}

export default ToDoList;