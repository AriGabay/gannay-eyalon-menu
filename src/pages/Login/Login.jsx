import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

function Login() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    userName: null,
    password: null,
  });

  const handelChange = ({ target }) => {
    const { value, name } = target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const login = async (e) => {
    e.preventDefault();
    const userLogin = await authService.login(userDetails);
    if (userLogin.token) {
      navigate('/');
    }
  };
  return (
    <div className="login-page">
      <form
        onSubmit={login}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
        }}
      >
        <input
          name="userName"
          onChange={handelChange}
          placeholder="שם משתמש"
          className="login-inputs"
        />
        <input
          name="password"
          placeholder="סיסמה"
          className="login-inputs"
          onChange={handelChange}
        />
        <input
          type="submit"
          value="כניסה"
          className="login-inputs"
          style={{ marginBottom: 0 }}
        />
      </form>
    </div>
  );
}

export default Login;
