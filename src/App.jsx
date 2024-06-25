import { useRef, useState, useEffect } from "react";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";

export default function App() {
  const [todos, settodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const inputText = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      settodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    const text = inputText.current.value;
    if (text.trim()) {
      const newTask = { completed: false, text };
      settodos([...todos, newTask]);
      inputText.current.value = "";
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleTextDone = (index) => {
    const newTask = [...todos];
    newTask[index].completed = !newTask[index].completed;
    settodos(newTask);
  };

  const handleDeleteTodo = (index) => {
    const newTask = todos.filter((_, i) => i !== index);
    settodos(newTask);
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const handleSaveEdit = () => {
    const newTask = [...todos];
    newTask[editIndex].text = editText;
    settodos(newTask);
    setEditIndex(null);
    setEditText("");
  };

  return (
    <>
      <div className="container px-5">
        <div className="text-center">
          <h1 className="py-5">ToDo App</h1>
        </div>
        <div className="input">
          <input
            ref={inputText}
            type="text"
            placeholder="Add task here..."
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddTodo} className="btn btn-outline-dark">
            Add
          </button>
        </div>
        <div className="todo-list py-5">
          <ul>
            {todos.map((item, index) => (
              <li
                key={index}
                className="px-2 d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center">
                  <input
                    id={`todo-${index}`}
                    className="me-2"
                    type="checkbox"
                    name="todo"
                    checked={item.completed}
                    onChange={() => handleTextDone(index)}
                  />
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    <label
                      htmlFor={`todo-${index}`}
                      className={item.completed ? "done" : ""}
                    >
                      {item.text}
                    </label>
                  )}
                </div>
                <div className="icons">
                  {editIndex === index ? (
                    <button
                      onClick={handleSaveEdit}
                      className="btn btn-outline-success me-2"
                    >
                      Save
                    </button>
                  ) : (
                    <FaRegEdit
                      size={20}
                      className="edit text-success me-2"
                      onClick={() => handleEditTodo(index)}
                    />
                  )}
                  <FaTrashAlt
                    size={20}
                    className="trash text-danger"
                    onClick={() => handleDeleteTodo(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
