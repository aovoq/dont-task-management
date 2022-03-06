import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'
import { db } from '../lib/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useTasksContext } from '../context/TasksContext'
import Task from '../components/Task'
import Header from '../components/Header'

const Home = () => {
   const { user } = useAuthContext()
   const { tasks, addTask } = useTasksContext()
   const navigate = useNavigate()
   const [task, setTask] = useState('')

   const handleLogout = () => {
      signOut(auth)
         .then(() => navigate('/signin'))
         .catch((error) => console.error(error))
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      addTask(task)
   }

   return (
      <>
         <Header />
         <main>
            <h1>Home</h1>
            <button onClick={handleLogout}>logout</button>
            <form onSubmit={handleSubmit}>
               <input type='text' value={task} onChange={(e) => setTask(e.target.value)} />
               <button>Add</button>
            </form>
            {tasks.map((data) => {
               return <Task key={data.docId} data={data} />
            })}
         </main>
      </>
   )
}

export default Home
