import  { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Login from './Components/Login.tsx';
import Signup from './Components/Signup.tsx';
import TodoList from './Components/todos.tsx';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from './store/authState.tsx';

function App() {
  return (
    <div style={{ backgroundColor: '#363062', width: "100vw", height: "100vh" }}>

      <RecoilRoot>
        <Router>
          <InitState />
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/todos' element={<TodoList />} />

          </Routes>
        </Router>
      </RecoilRoot>

    </div>



  )
}

function InitState() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const init = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch('http://localhost:3000/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.username) {
        setAuth({ token: data.token, username: data.username });
        navigate("/todos");
      } else {
        navigate("/signup");
      }
    } catch (e) {
      navigate("/signup");
    }
  }
  useEffect(() => {
    init();
  }, [])
  return <></>
}


export default App;