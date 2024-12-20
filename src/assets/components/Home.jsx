  import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Home = () => {

    const [data, setData] = useState('')
    const [newTask, setNewTask] = useState([])
    const [edit, setedit] = useState(null);

    useEffect(() => {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setNewTask(JSON.parse(storedTasks));
      }
    }, []);

    const handleChange = (e)=>{
      setData(e.target.value)
    }
    const handleSubmit = ()=>{
      if (edit !== null) {
        const updatedTasks = newTask.map((task, index) => {
          if (index === edit) {
            return { ...task, data };
          }
          return task;
        });
        setNewTask(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setData("");
        setedit(null);
      } else {
        const updatedTasks = [...newTask, {id: uuidv4(), data, isComplited: false}];
        setNewTask(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setData("")
      }
    }

    const handleDelete = (index)=>{
      const updatedTasks = newTask.filter((task, i) => i !== index);
      setNewTask(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    
    const handleEdit = (index) => {
      setedit(index);
      setData(newTask[index].data);
    }
    
  return (  
    <>
      <div className="container w-full bg-slate-300 h-screen">
        <div className="container lg:w-[50%] sm:w-[90%] bg-[#D4EBF8] p-10 flex-col mx-auto items-center justify-center">
             <h1 className='text-center text-4xl'>CRUD APP</h1>
             <div className="container mx-2 flex-col">
                       <h2 className='my-10 text-2xl'>Add task</h2>
                <div className="w-full flex justify-between">
                        <input onChange={handleChange} value={data} className='w-full' type="text" placeholder='Enter task' />
                        <button onClick={handleSubmit} className='bg-[#0A5EB0] hover:bg-[#1b5089] px-4 py-2 rounded-md  mx-2'>{edit !== null ? 'Save' : 'Add'}</button>
                </div>
                <div className="w-full">
                <h2 className='my-10 text-2xl'>Your Task</h2>
                  <div className="tasks w-full flex-col justify-between">
                    {newTask.map((task, index) => (
                      <div key={task.id} className="task flex my-5 justify-between">
                        <span>{task.data}</span>
                        <div className="buttons">
                          <button onClick={() => handleEdit(index)} className='bg-[#0A5EB0] hover:bg-[#1b5089] px-4 py-2 rounded-md  mx-2'>Edit</button>
                          <button onClick={() => handleDelete(index)} className='bg-[#0A5EB0] hover:bg-[#1b5089] px-4 py-2 rounded-md  mx-2'>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
        </div>
      </div>
    </>
  )
}

export default Home
