import { FaPen, FaTrash } from 'react-icons/fa';

function ToDoList() {
  return (
    <>
      <section className='center'>
        <form className="flex">
          <div className='input-container flex gap-10'>
            <input className="user-input" type="text" placeholder="My new Task"/>
            <input className="add-button" type="button" value="Add"/>
          </div>
        </form>
      </section>
      <section className="task-grid-container gap-15">
        <div className='task-container flex'>
          <p className='task'>Go shopping</p>
          <div className="task-controls flex justify-between">
            <span>May 7, 09:01 a.m</span>
            <div className="edit-delete flex gap-15">
              <FaPen className='edit-icon'/>
              <FaTrash className='delete-icon'/>
            </div>
          </div>   
        </div>

        
        <div className='task-container flex'>
          <p className='task'>Go shopping</p>
          <div className="task-controls flex justify-between">
            <span>May 7, 09:01 a.m</span>
            <div className="edit-delete flex gap-15">
              <FaPen className='edit-icon'/>
              <FaTrash className='delete-icon'/>
            </div>
          </div>   
        </div>
        <div className='task-container flex'>
          <p className='task'>Go shopping</p>
          <div className="task-controls flex justify-between">
            <span>May 7, 09:01 a.m</span>
            <div className="edit-delete flex gap-15">
              <FaPen className='edit-icon'/>
              <FaTrash className='delete-icon'/>
            </div>
          </div>   
        </div>



      </section>
      
    </>
      
    
  )
}

export default ToDoList;