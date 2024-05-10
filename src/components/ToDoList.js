import { FaPen, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useState, useEffect, useRef } from "react";

function ToDoList() {
  const savedTasks = localStorage.getItem('tasks');
  const initialTasks = savedTasks ? JSON.parse(savedTasks) : [];
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (tasks.length > 0) {
      tasks.length === 1 ? 
        document.title = `Task Track (${tasks.length} Task)` :
        document.title = `Task Track (${tasks.length} Tasks)`;
    } else {
      document.title = `Task Track`;
    }
  }, [tasks]);

  useEffect(() => {
    if (editingTask !== null) {
      inputRef.current.focus();
    }
  }, [editingTask]);

  function handleInputChange(event) {
    if (editingTask !== null) {
      setEditingText(event.target.value)
    } else {
      setNewTask(event.target.value);
    }
  }

  function addOrSaveTask(event) {
    event.preventDefault();
    const date = new Date();
    const formattedDate = date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    if (editingTask !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingTask] = { text: editingText, date: formattedDate };
      setTasks(updatedTasks);
      setEditingTask(null);
      setEditingText('');
    } else if (newTask !== '') {
      setTasks(t => [{ text: newTask, date: formattedDate }, ...t]);
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

  return (
    <>
      <section className='center'>
        <form className="flex" onSubmit={addOrSaveTask}>
          <div className='input-container flex gap-10'>
            <input 
              className="user-input" 
              type="text" 
              placeholder={editingTask !== null ? "Update task" : "My new task"}
              value={editingTask !== null ? editingText : newTask}
              onChange={handleInputChange}
              ref={inputRef}
            />
            <input 
              className="add-button" 
              type="button" 
              value={editingTask !== null ? "Save" : "Add"}
              onClick={addOrSaveTask}
            />
          </div>
        </form>
      </section>
      <section className="task-grid-container gap-15">
        {tasks.map((task, index) => 
          <div key={index} className='task-container flex'>
            <p className='task'>{task.text}</p>
            <div className="task-controls flex justify-between">
              <div className='up-down flex gap-5'>
                <FaArrowDown className='down-icon' onClick={() => moveTaskDown(index)}/>
                <FaArrowUp className='up-icon' onClick={() => moveTaskUp(index)}/>
              </div>
              <div>
                <span>{task.date}</span>
              </div>
              <div className="edit-delete flex gap-10">
                <FaPen className='edit-icon' onClick={() => {setEditingTask(index); setEditingText(task.text);}}/>
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