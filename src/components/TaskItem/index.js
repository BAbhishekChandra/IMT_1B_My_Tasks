import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {task, tag} = taskDetails

  return (
    <li className="task-item-container">
      <p className="task-name">{task}</p>
      <p className="tag-name">{tag}</p>
    </li>
  )
}

export default TaskItem
