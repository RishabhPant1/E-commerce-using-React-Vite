import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
    if(username && password){
      localStorage.setItem('token', 'myFakeToken');
      window.location.href = '/home'; 
    } 
    else{
      alert('Enter valid credentials');
    }
  };
  return(
    <div className = "login-form">
      <input
        type = "text"
        placeholder = "Username"
        value = {username}
        onChange = {(e) => setUsername(e.target.value)}
      />
      <input
        type = "password"
        placeholder = "Password"
        value = {password}
        onChange = {(e) => setPassword(e.target.value)}
      />
      <button onClick = {handleLogin}>Login</button>
    </div>
  );
}
export default Login;