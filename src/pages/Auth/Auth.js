import React, { useState } from 'react';
import AuthOptions from '../../components/Auth/AuthOptions/index'
import RegisterForm from '../../components/Auth/RegisterForm/index'
import LoginForm from '../../components/Auth/Login/index'
import BackgrondApp from '../../assets/jpg/background-auth.jpg'
import LogoNameWhite from '../../assets/png/logo-name-white.png'
import './Auth.scss'

function Auth() {

  const [selectedForm, setSelectedForm] = useState(null)

  const handlerForm = () => {
    switch (selectedForm) {
      case 'login':
        return <LoginForm setSelectedForm={setSelectedForm} />;
      case 'register':
        return <RegisterForm setSelectedForm={setSelectedForm} />;

      default:
        return < AuthOptions setSelectedForm={setSelectedForm} />;
    }
  }

  return (
    <div className='auth' style={{ backgroundImage: `url(${BackgrondApp})` }}>
      <div className="auth__dark" />
      <div className="auth__box">
        <div className="auth__box-logo">
          <img src={LogoNameWhite} alt="Musicfy" />
        </div>
        {handlerForm()}
      </div>
    </div>
  );
}

export default Auth;
