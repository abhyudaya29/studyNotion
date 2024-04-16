import React from 'react'
import Template from '../components/core/Auth/Templates'
import loginImg from "../assets/Images/login.webp"
const Login = () => {
  return (
    <>
    <Template
    title="Welcome Back"
    description1="Build Skills for Today,Tommorow and beyond"
    description2="Education to futire-proof your carrier"
    image={loginImg}
    formType="login"
    />
    </>
  )
}

export default Login