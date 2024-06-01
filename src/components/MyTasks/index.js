import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TaskItem from '../TaskItem'
import NoTasks from '../NoTasks'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    taskInput: '',
    tagSelected: 'HEALTH',
    tasksList: [],
    filterTag: '',
    activeTag: '',
  }

  onChangeTaskInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeSelectedTag = event => {
    this.setState({tagSelected: event.target.value})
  }

  addTaskToTaskListFunction = event => {
    event.preventDefault()
    const {taskInput, tagSelected, tasksList} = this.state
    const selectedTag = tagsList.find(tag => tag.optionId === tagSelected)
    const newTask = {
      id: uuidv4(),
      task: taskInput,
      tag: selectedTag.displayText,
    }
    this.setState({
      tasksList: [...tasksList, newTask],
      taskInput: '',
      tagSelected: tagsList[0].optionId,
    })
  }

  onClickTagFilterFunction = tag => {
    this.setState(prevState => ({
      filterTag: prevState.filterTag === tag ? '' : tag,
      activeTag: prevState.activeTag === tag ? '' : tag,
    }))
  }

  render() {
    const {taskInput, tagSelected, tasksList, filterTag, activeTag} = this.state

    const filteredTaskList =
      filterTag !== ''
        ? tasksList.filter(eachTask => eachTask.tag === filterTag)
        : tasksList

    return (
      <div className="my-tasks-container">
        <div className="create-task-container">
          <form
            className="form-container"
            onSubmit={this.addTaskToTaskListFunction}
          >
            <h1 className="create-task-heading">Create a task!</h1>
            <label className="task-label" htmlFor="taskId">
              Task
            </label>
            <input
              className="task-input"
              id="taskId"
              type="text"
              placeholder="Enter the task here"
              value={taskInput}
              onChange={this.onChangeTaskInput}
            />

            <label className="tags-label" htmlFor="selectTag">
              Tags
            </label>
            <select
              className="tags-input"
              id="selectTag"
              value={tagSelected}
              onChange={this.onChangeSelectedTag}
            >
              {tagsList.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>

            <button className="add-task-button" type="submit">
              Add Task
            </button>
          </form>
        </div>

        <ul className="tags-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="buttons-container">
            {tagsList.map(eachTag => (
              <li className="li-item" key={eachTag.optionId}>
                <button
                  type="button"
                  className={`tag-button ${
                    activeTag === eachTag.displayText ? 'active' : ''
                  }`}
                  onClick={() =>
                    this.onClickTagFilterFunction(eachTag.displayText)
                  }
                >
                  {eachTag.displayText}
                </button>
              </li>
            ))}
          </ul>

          <ul className="tasks-container">
            <h1 className="tasks-title">Tasks</h1>
            <ul className="unordered-list-container">
              {filteredTaskList.length !== 0 ? (
                filteredTaskList.map(eachTask => (
                  <TaskItem key={eachTask.id} taskDetails={eachTask} />
                ))
              ) : (
                <NoTasks />
              )}
            </ul>
          </ul>
        </ul>
      </div>
    )
  }
}

export default MyTasks
