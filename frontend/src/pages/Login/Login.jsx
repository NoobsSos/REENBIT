import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { setUser } from '../../store/index.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

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
    <div>
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