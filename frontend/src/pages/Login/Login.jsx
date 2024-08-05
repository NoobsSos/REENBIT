import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { setUser } from '../../store/index.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css';

import arrow from '../../assets/images.png';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFacebookCallback = (response) => {
    if (response?.status === "unknown") {
        console.error('Sorry!', 'Something went wrong with facebook Login.');
     return;
    }
    dispatch(setUser({ user: response.id }));

    navigate('/');
  };

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <h2 className={styles.text}>You can use the following method </h2>
        <img src={arrow} alt="arrow" className={styles.arrow} />
        <FacebookLogin 
            appId="803147245138418"
            autoLoad={false}
            fields="name,email,picture"
            callback={handleFacebookCallback}
        />
    </div>
  );
};
export default Login;