import { useCallback, useState, forwardRef } from "react";
import "./style.css";

function LoginForm() {
  return (
    <div className={`login-container1`}>
      <div className={`login-form`}>
        <div className={`username-container`}>
          <p className={`login-heading`}>Username</p>
        </div>
        <div className={`login-input`} />
      </div>
      <div className={`login-container3`}>
        <div className={`password-container`}>
          <p className={`login-heading`}>Password</p>
        </div>
        <div className={`login-input`} />
      </div>
    </div>
  );
}

export default LoginForm;
