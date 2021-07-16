import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import DataManager from '../../../contants/DataManager';
import { callApi } from '../../../contants/network';
import { Change_User } from '../../../redux/dispatchAction';

const Login = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('email1@gmail.com');
  const [password, setPassword] = useState('Do@12345');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const body = {
      email,
      password,
    };
    const res = await callApi('/user/login', 'POST', body);
    if (res.status === 200) {
      DataManager.shared.token = res.data.token;
      dispatch({type: Change_User, payload: res.data});
      history.push('/');
    } else {
      setErrorMsg(res?.response?.data?.error?.message);
    }
  }

  return (
    <>
      <h2>Sign in</h2>
      <form onSubmit={onSubmit}>
        {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            placeholder="Email address"
            onChange={handleChangeEmail}
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChangePassword}
          />
        </label>
        <button type="submit">Sign in</button>
        <Link to="/forget-password">
          Forget password
        </Link>
      </form>
    </>
  );
};

export default Login;
