import { useCallback, useState, forwardRef } from "react";
import ContainerWithImage from "../ContainerWithImage";
import LoginForm from "../LoginForm";
import Container from "../Container";
import "./style.css";

function AuthPage() {
  return (
    <div className={`login-container2`}>
      <ContainerWithImage />
      <div className={`login-container`}>
        <LoginForm />
        <div className={`sign-in-button`}>
          <Container />
          <p className={`sign-in-title`}>Sign in</p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
