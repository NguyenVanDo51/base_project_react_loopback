import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import DataManager from '../../../contants/DataManager';
import { callApi } from '../../../contants/network';
import { Change_User } from '../../../redux/dispatchAction';
import './login.scss';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const onFailure = (res) => {
    console.log('fail', res);
  }

  const onSuccess = async (res) => {
    const { accessToken, profileObj } = res;
    const resp = await callApi('/users/login/google', "POST", {
      accessToken,
      email: profileObj.email,
      firstName: profileObj.familyName,
      lastName: profileObj.givenName,
      avatar: profileObj.imageUrl,
    });
    if (resp.status === 200) {
      console.log(resp);
      dispatch({ type: Change_User, payload: resp.data });
      localStorage.setItem('todoAppCccessToken', resp.data.accessToken);
      history.push('/');
    }
  }

  return (
    <>
      <div className="container login_container">
        <Link to="/">
          Todo-App
        </Link>
        <p className="text-center mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam molestiae cupiditate eligendi quae.</p>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
          buttonText="Log in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          render={(renderProps) => {
            return <button className="bg-transparent" onClick={renderProps.onClick}><img src="/icon/login_with_google.png" alt="login_with_google" /></button>
          }}
          isSignedIn={true}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </>
  );
};

export default Login;
