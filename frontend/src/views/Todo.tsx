//Modules
import { useState, useEffect } from "react";

const Todo = () => {
  const [ready, setReady] = useState<boolean>(false);
  const [todos, setTodos] = useState<any[]>([]);

  const [addTodo, setAddTodo] = useState("");

  const [update, setUpdate] = useState<boolean>(false);

  const fetchTodo = async () => {
    fetch("http://localhost:8000/getTodos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.data);
        setReady(true);
      });
  };

  const postTodo = async () => {
    const newTodo = {
      id: todos.length + 1,
      title: addTodo,
      done: false,
    };
    fetch("http://localhost:8000/addTodos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      fetch("http://localhost:8000/getTodos")
        .then((res) => res.json())
        .then((data) => {
          setUpdate(!update);
          console.log(data);
        });
    });
  };

  const updateTodo = async (id: number) => {
    fetch(`http://localhost:8000/updateTodos/${id}`, {
      method: "PUT",
    }).then(() => {
      setUpdate(!update);
    });
  };

  useEffect(() => {
    fetchTodo();
    // eslint-disable-next-line
  }, [ready, update]);

  if (ready) {
    return (
      <>
        {/* Current Todos */}
        <div>
          <h1>Current Todos:</h1>
          {todos.map((todo) => (
            <div key={todo.id * -2}>
              <li key={todo.id}>
                {todo.title} -- status: {todo.done ? "done" : "not done"}
              </li>
              <button
                key={todo.id * -1}
                onClick={() => {
                  updateTodo(todo.id);
                }}
              >
                update status
              </button>
            </div>
          ))}
        </div>

        {/* Add Todo */}
        <div>
          <h1>Add Todo:</h1>
          <input id="todo" type="text" placeholder="todo" onChange={(e) => setAddTodo(e.target.value)} />
          <button
            onClick={async () => {
              if ((document.getElementById("todo") as HTMLInputElement).value !== "") {
                postTodo();
              }
            }}
          >
            Submit
          </button>
        </div>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Todo;
