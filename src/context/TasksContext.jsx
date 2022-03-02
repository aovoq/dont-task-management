import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'
import {
   addDoc,
   deleteDoc,
   collection,
   doc,
   onSnapshot,
   serverTimestamp,
   updateDoc,
   deleteField,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export const TasksContext = createContext()

export const useTasksContext = () => useContext(TasksContext)

export const TasksProvider = ({ children }) => {
   const { user } = useAuthContext()
   const [tasks, setTasks] = useState([])
   const [loading, setLoading] = useState(true)
   const col = collection(db, `users/${user.uid}/tasks`)

   useEffect(() => {
      if (!user) {
         setTasks([])
         return
      }

      const col = collection(db, `users/${user.uid}/tasks`)
      const unsubscribe = onSnapshot(col, {
         next: (sn) => {
            setTasks(sn.docs.map((docSn) => ({ ...docSn.data(), docId: docSn.id })))
         },
      })
      return unsubscribe
   }, [user])

   const addTask = (taskName) => {
      addDoc(col, {
         uid: user.uid,
         taskName: taskName,
         isComplete: false,
         createdAt: serverTimestamp(),
         updateAt: serverTimestamp(),
      })
         .then((task) => console.log(task))
         .catch((error) => console.log(error))
   }

   const updateTask = async (docId, taskName, isComplete) => {
      const updateData = {
         ...tasks.find((t) => t.docId === docId),
         taskName,
         isComplete,
         updateAt: serverTimestamp(),
      }
      if (isComplete) {
         updateData.completedAt = serverTimestamp()
      } else {
         updateData.completedAt = deleteField()
      }
      const ref = doc(db, `users/${user.uid}/tasks`, docId)
      await updateDoc(ref, updateData).catch((error) => console.log(error))
   }

   const deleteTask = (docId) => {
      const ref = doc(db, `users/${user.uid}/tasks`, docId)
      deleteDoc(ref)
      console.log('deleted')
   }

   return (
      <TasksContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
         {children}
      </TasksContext.Provider>
   )
}
