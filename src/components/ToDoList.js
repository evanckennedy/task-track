import { FaPen, FaTrash, FaArrowUp, FaArrowDown, FaCheck } from 'react-icons/fa';
import { useReducer, useEffect, useRef } from "react";

// Retrieve tasks from local storage or initialize to an empty array
const tasksFromStorage = localStorage.getItem('tasks');
const initialState = {
  tasks: tasksFromStorage ? (JSON.parse(tasksFromStorage) || []) : [],
  editingTask: null,
  editingText: '',
};

// Reducer function to handle state changes
function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, tasks: [{text: action.text, date: action.date }, ...state.tasks]};
    case 'edit':
      return { ...state, tasks: state.tasks.map((task, i) => i === action.index ? { text: action.text, date: action.date } : task)};
    case 'complete':
      return { ...state, tasks: state.tasks.map((task, i) => i === action.index ? { ...task, isCompleted: true } : task)};
    case 'delete':
      return { ...state, tasks: state.tasks.filter((_, i) => i !== action.index)};
    case 'moveUp':
      if (action.index > 0) {
        const newState = [...state.tasks];
        [newState[action.index], newState[action.index - 1]] = [newState[action.index - 1], newState[action.index]];
        return { ...state, tasks: newState };
      }
      return state;
    case 'moveDown':
      if (action.index < state.tasks.length - 1) {
        const newState = [...state.tasks];
        [newState[action.index], newState[action.index + 1]] = [newState[action.index + 1], newState[action.index]];
        return { ...state, tasks: newState };
      }
      return state;
    case 'setEditingTask':
      return { ...state, editingTask: action.index };
    case 'setEditingText':
      return { ...state, editingText: action.text };
    default:
      return { ...state, tasks: [] };
  }
}

function ToDoList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);

  // Effect to store tasks in local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  useEffect(() => {
    if (state.tasks.length > 0) {
      state.tasks.length === 1 ? 
        document.title = `Task Track (${state.tasks.length} Task)` :
        document.title = `Task Track (${state.tasks.length} Tasks)`;
    } else {
      document.title = `Task Track`;
    }
  }, [state.tasks]);

  // Effect to focus the input field when a task is being edited
  useEffect(() => {
    if (state.editingTask !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.editingTask]);

  function handleInputChange(event) {
    dispatch({ type: 'setEditingText', text: event.target.value })
  }

  function addOrSaveTask(event) {
  event.preventDefault();
  const date = new Date();
  const formattedDate = date.toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true });
  const inputValue = inputRef.current.value.trim(); // Remove leading and trailing white spaces
  if (inputValue === '') {
    // Input is empty, don't add or edit task
    return;
  }
  if (state.editingTask !== null) {
    dispatch({ type: 'edit', text: inputValue, date: formattedDate, index: state.editingTask });
    dispatch({ type: 'setEditingTask', index: null }); // Reset editingTask to null
  } else {
    dispatch({ type: 'add', text: inputValue, date: formattedDate });
  }
  dispatch({ type: 'setEditingText', text: '' }); // Reset editingText to an empty string
}

  function completeTask(index) {
    dispatch({ type: 'complete', index });
  }

  function deleteTask(index) {
    dispatch({ type: 'delete', index })
  }

  function moveTaskUp(index) {
    dispatch({ type: 'moveUp', index });
  }

  function moveTaskDown(index) {
    dispatch({ type: 'moveDown', index })
  }

  function setEditingTask(index) {
    dispatch({ type: 'setEditingTask', index });
  }

  function setEditingText(text) {
    dispatch({ type: 'setEditingText', text });
  }

  return (
    <>
       <section className='center'>
        <form className="flex" onSubmit={addOrSaveTask}>
          <div className='input-container flex gap-10'>
            <input 
              className="user-input" 
              type="text" 
              placeholder={state.editingTask !== null ? "Update task" : "My new task"}
              onChange={handleInputChange}
              ref={inputRef}
              value={state.editingText} // Set the value to the text of the task being edited
            />
            <input 
              className="add-button" 
              type="button" 
              value={state.editingTask !== null ? "Save" : "Add"}
              onClick={addOrSaveTask}
            />
          </div>
        </form>
      </section>
      <section className="task-grid-container gap-15">
        {state.tasks.map((task, index) => 
          <div key={index} className={`task-container flex ${task.isCompleted ? 'completed' : ''}`}>
            <p className={`task ${task.isCompleted ? 'line-through' : ''}`}>{task.text}</p>
            <div className="task-controls flex justify-between">
              <div className='up-down flex gap-5'>
                <FaArrowDown className='down-icon' onClick={() => moveTaskDown(index)}/>
                <FaArrowUp className='up-icon' onClick={() => moveTaskUp(index)}/>
              </div>
              <div>
                <span className='date'>{task.date}</span>
              </div>
              <div className="edit-delete flex gap-5">
                <FaCheck className='complete-icon' onClick={() => {completeTask(index)}}/>
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