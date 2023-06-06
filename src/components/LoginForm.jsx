import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function onSubmit(values, setLoggedIn) {
  const data = {
    username: values.username,
    password: values.password,
  };

  try {
    const response = await axios.post(
      'https://mizuwatch.com/apis/user_login',
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      const { access_token, first_name } = response.data;
      localStorage.setItem(
        "MCData",
        JSON.stringify({
          token: access_token,
          first_name: first_name,
        })
      );
      localStorage.setItem("loggedIn", true);
      toast.success(`Welcome back, ${first_name}!`, {
        autoClose: 1000,
        onClose: () => setLoggedIn(true),
      });
    } else {
      toast.error('Invalid username or password', {
        autoClose: 1000,
      });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    toast.error('An error occurred while logging in. Please try again.', {
      autoClose: 3000,
    });
  }
}

function LoginForm() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  let template = {
    title: "LOGIN",
    fields: [
      {
        title: "Username",
        type: "text",
        name: "username",
        validationProps: {
          required: "Username is mandatory",
        },
      },
      {
        title: "Password",
        type: "password",
        name: "password",
      },
    ],
  };

  useEffect(() => {
    if (loggedIn) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [loggedIn, navigate]);

  return (
    <div className="login-box">
      <Form template={template} onSubmit={(values) => onSubmit(values, setLoggedIn)} />
      <ToastContainer />
    </div>
  );
}

export default LoginForm;