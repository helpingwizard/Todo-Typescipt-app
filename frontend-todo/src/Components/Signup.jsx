//const { useState } = require("react")
import { useState } from "react";
import { Typography, Card, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { authState } from "../store/authState";
import { useSetRecoilState } from "recoil";



const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');


  const handleSignup = async () => {
    const response = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })

    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location = "/todos"

    } else {
      alert("Error while signing up");
    }


  }


  return <div>
    <div style={{ paddingTop: 150, display: "flex", justifyContent: "center", marginBottom: 10 }}>
      <Typography variant={"h5"} color={"white"}>
        WELCOME TO TODO APP. SIGN UP FOR BELOW..
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
          onClick={handleSignup}
        >Sign up</Button>

        <Link to="/login">Already an user? </Link>

      </Card>

    </div>

  </div>





};





export default Signup;