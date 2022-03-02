import { useTasksContext } from '../context/TasksContext'

const Task = (props) => {
   const { deleteTask, updateTask } = useTasksContext()

   const handleChange = () => {
      updateTask(props.data.docId, props.data.taskName, !props.data.isComplete)
   }

   return (
      <div>
         <li>
            <input
               type='checkbox'
               checked={props.data.isComplete}
               onChange={() => {
                  handleChange()
               }}
            />
            <span> {props.data.taskName}</span>
            <button onClick={() => deleteTask(props.data.docId)}>remove</button>
         </li>
      </div>
   )
}

export default Task
