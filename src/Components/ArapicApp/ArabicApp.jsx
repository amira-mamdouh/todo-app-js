import { useRef, useState, useEffect } from "react";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ArabicApp() {
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const inputText = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    const text = inputText.current.value;
    if (text.trim()) {
      const newTask = { completed: false, text };
      setTodos([...todos, newTask]);
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
    setTodos(newTask);
  };

  const handleDeleteTodo = (index) => {
    const newTask = todos.filter((_, i) => i !== index);
    setTodos(newTask);
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const handleSaveEdit = () => {
    const newTask = [...todos];
    newTask[editIndex].text = editText;
    setTodos(newTask);
    setEditIndex(null);
    setEditText("");
  };

  return (
    <>
      <div className="text-end py-3">
        <Link to="/english">
          <button className="btn btn-outline-dark me-3">English</button>
        </Link>
      </div>
      <div className="container-fluid px-md-5 arabic">
        <div className="text-center">
          <h1 className="py-5">قائمة المهام</h1>
        </div>
        <div className="input">
          <input
            ref={inputText}
            type="text"
            placeholder="أضف المهمة هنا..."
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddTodo} className="btn btn-outline-dark">
            أضف
          </button>
        </div>
        <div className="todo-list py-5">
          <ul>
            {todos.map((item, index) => (
              <li key={index} className="px-2">
                <div className="row align-items-center">
                  <div className="col-9">
                    <div className="d-flex align-items-center">
                      <input
                        id={`todo-${index}`}
                        className="addinput"
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
                  </div>
                  <div className="col-3">
                    <div className="icons">
                      {editIndex === index ? (
                        <button
                          onClick={handleSaveEdit}
                          className="btn btn-outline-success"
                        >
                          حفظ
                        </button>
                      ) : (
                        <FaRegEdit
                          size={20}
                          className="edit text-success"
                          onClick={() => handleEditTodo(index)}
                        />
                      )}

                      <FaTrashAlt
                        size={20}
                        className="trash text-danger"
                        onClick={() => handleDeleteTodo(index)}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
