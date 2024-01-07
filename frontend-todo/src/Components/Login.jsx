import { useState } from "react"
import { Typography, TextField, Button, Card } from "@mui/material/";



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');


  const handleLogin = async () => {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location = "/todos";
      } else {
        alert("Invalid credentials");
      }
    } else {
      // Handle unauthorized or other error status
      console.error(response.status, response.statusText);
      alert("Unauthorized or other error occurred");
    }
  };


  return <div>
    <div style={{ paddingTop: 150, display: "flex", justifyContent: "center", marginBottom: 10 }}>
      <Typography variant={"h5"} color={"white"}>
        WELCOME TO TODO APP. LOGIN FOR BELOW..
      </Typography>
    </div>

    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card variant={"outlined"} style={{ padding: 20, width: 400, color: "#E0F4FF" }}>
        <TextField
          fullWidth={true}
          label="Email"
          variant="outlined"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br /><br />
        <TextField
          fullWidth={true}
          label="Password"
          variant="outlined"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <br /><br />
        <Button
          size={"large"}
          variant="contained"
          onClick={handleLogin}
        >Login </Button>

      </Card>

    </div>

  </div>
}


export default Login;