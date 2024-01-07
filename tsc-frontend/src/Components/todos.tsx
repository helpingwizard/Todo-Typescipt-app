import  { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../store/authState.tsx";
import { Button, TextField, Typography, Card, FormControlLabel, Checkbox } from "@mui/material";


interface Todo {
  _id : string;
  title : string;
  description : string;
  done : boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const authStateValue = useRecoilValue(authState);

  console.log(authStateValue.username);

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch('http://localhost:3000/todo/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data: Todo[] = await response.json();
      setTodos(data);
    };

    getTodos();
  }, [authState.token]);

  const addTodo = async () => {
    const response = await fetch('http://localhost:3000/todo/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify({ title, description })
    });
    const data = await response.json();
    setTodos([...todos, data]);
  };

  const markDone = async (id) => {
    const response = await fetch(`http://localhost:3000/todo/todos/${id}/done`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const updatedTodos = await response.json();

    setTodos(todos.map((todo) => (todo._id === updatedTodos._id ? updatedTodos : todo)));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <Typography variant={"h4"} color={"white"}>
          Welcome {authStateValue.username}
        </Typography>

        <div style={{ marginLeft: "auto", marginRight: "10px" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              window.location = '/login';
              localStorage.removeItem("token");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Card variant="outlined" style={{ width: 400, padding: 20, margin: "auto", textAlign: "center" }}>
          <Typography variant={"h5"}>
            ADD TODO
          </Typography>
          <br />
          <TextField
            fullWidth={true}
            label="Title"
            variant="outlined"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br /><br />
          <TextField
            fullWidth={true}
            label="Description"
            variant="outlined"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <br /><br />

          <Button
            size={"large"}
            variant="contained"
            onClick={addTodo}
          >
            Add
          </Button>
        </Card>
      </div>
      <br />
      <br />
      <br />

      {/* Updated todos rendering section */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {todos.map((todo) => (
          <div key={todo._id} style={{ justifyContent: "center" }}>
            <Card variant="outlined" style={{ backgroundColor: "#D2E9E9", width: 400, padding: 20, justifyContent: "center", marginBottom: 20 }}>
              <Typography variant="h6">
                {todo.title}
              </Typography>
              <br />
              <Typography variant="h7">
                {todo.description}
              </Typography>
              <br /> <br />
              {/* <Button
                variant={"contained"}
                size={"small"}
                onClick={() => { markDone(todo._id) }}
              >Mark as Done</Button> */}
              <FormControlLabel
                onChange={() => {
                  markDone(todo._id);
                }}
                control={<Checkbox />}
                label="Mark as done" />

            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;