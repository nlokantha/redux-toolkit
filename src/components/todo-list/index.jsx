import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, deleteTodo,updateTodo } from "../../store/slice/todoSlice"

function TodoList() {
  const [currentTodo, setCurrentTodo] = useState("")
  const dispatch = useDispatch()
  const { todoList } = useSelector((state) => state.todo)
  const [currentEditedTodoId, setCurrentEditedTodoId] = useState(null)

  function handleTodo() {
    dispatch(addTodo(currentTodo))
    setCurrentTodo("")
  }
  function handleEditTodo(){
    dispatch(updateTodo({
      currentEditedTodoId,
      currentTodo
    }))
    setCurrentTodo("")
    setCurrentEditedTodoId("")
  }

  function handleDelete(getCurrentTodoId) {
    dispatch(deleteTodo(getCurrentTodoId))
  }

  function handleUpdate(getCurrentTodo) {
    setCurrentEditedTodoId(getCurrentTodo.id)
    setCurrentTodo(getCurrentTodo.title)
  }

  return (
    <div>
      <input
        value={currentTodo}
        onChange={(event) => setCurrentTodo(event.target.value)}
        name="todo"
        placeholder="enter your todo"
        type="text"
      />
      <button disabled={currentTodo === ""} onClick={currentEditedTodoId !== null ? handleEditTodo : handleTodo}>
        {
          currentEditedTodoId !== null ? "Edit Todo" : "Add Todo" 
        }
      </button>

      <h1>To-do List</h1>
      <ul>
        {todoList && todoList.length > 0
          ? todoList.map((item) => (
              <li key={item.id}>
                <p>{item.title}</p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                  <button onClick={() => handleUpdate(item)}>Update</button>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}

export default TodoList
