import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import logo_img from './imgs/logo/logo.png'
import { Error_message } from './components/Error_message'
import { ErrorContext } from './context/ContextError'
import {registerUserRequest} from "../api/auth"

// navbar

const Navbar_header = styled.header`
  height: 5rem;
  background-color: #191B1F;
  position: sticky;
  top: 0%;
`

const Navbar_menu = styled.nav`
  justify-content: space-between;
`

const Logo = styled.div`
  height: 5rem;
  width: 5rem;
  color: #fafafa;
`

const Logo_img = styled.img`
  margin-left: 1rem;
  height: 4rem;
  width: 5rem;
`

const Navbar_options = styled.ul`
  width: 10rem;
  gap: 2rem;
  font-size: 1.3rem;
`

const Navbar_options_i = styled.i`
  color: #fafafa;

  :hover{
    color: #F5821F;
  }
`

// form

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
`

const Image_container = styled.div`
  width: 30rem;
  height: 30rem;
  border-radius: 1rem 0 0 1rem;

  @media (min-width: 420px) and (max-width: 950px){
    display: none;
  }

  @media (min-width: 300px) and (max-width: 420px){
    display: none;
  }
`

const Login_form_register = styled.form`
  background-color: #191B1F;
  width: 30rem;
  height: 30rem;
  border-radius: 0 1rem 1rem 0;

  @media (min-width: 420px) and (max-width: 950px){
    width: 25rem;
    border-radius: 1rem;
  }

  @media (min-width: 300px) and (max-width: 420px){
    width: 19rem;
    border-radius: 1rem;
  }
`

const Form_title = styled.h1`
  color: #fafafa;
  font-family: 'New Rocker', cursive;
  font-size: 2rem;
  background: rgb(245,130,31);
  background: linear-gradient(90deg, rgba(245,130,31,1) 0%, rgba(205,71,18,1) 100%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
`

const Input_container = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 25rem;

  @media (min-width: 420px) and (max-width: 950px){
    width: 25rem;
  }

  @media (min-width: 300px) and (max-width: 420px){
    width: 19rem;
  }
`

const Form_p = styled.p`
  color: #fafafa;
  font-size: 1.1rem;
  font-family: 'New Rocker', cursive;
`

const Form_input = styled.input`
  border-radius: 0.3rem;
  background-color: #2B2E33;
  border: none;
  color: #fafafa;
  font-family: 'New Rocker', cursive;
  padding: 0.5rem;
  font-size: 1rem;
  height: 1.3rem;
  width: 10rem;

  :focus{
    outline: none;
    border:1px solid #F5821F;
  }
`

const Button_container = styled.div`
  margin: 1rem;
`

const Submit_button = styled.button`
  width: 6rem;
  height: 1.7rem;
  border-radius: 0.5rem;
  cursor: pointer;

  font-family: 'New Rocker', cursive;
  background: rgb(245,130,31);
  background: linear-gradient(90deg, rgba(245,130,31,1) 0%, rgba(205,71,18,1) 100%);
  border: none;
  color: #fafafa;
`

const Form_a = styled.a`
  color: #F5821F;

  :hover{
    text-decoration: underline;
  }
`



export const Register = () => {
  // let users = JSON.parse(localStorage.getItem('users')) || []
  const {Error, formValidation} = useContext(ErrorContext)

  // const saveLocalStorage = () => {
  //   localStorage.setItem('users', JSON.stringify(users))
  // }

  const [userName, setUserName] = useState("")
  const [userEmail, setEmailRegister] = useState("")
  const [userPassword, setPasswordRegister] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // const saveData = (userName, userEmail, userPassword) => {
  //   users = [
  //       ...users,
  //       {
  //           id: users.length + 1,
  //           name: userName,
  //           email: userEmail,
  //           password: userPassword

  //       }
  //   ]
  // }

  const submitRegister = async (values) => {
    const res = await registerUserRequest(values)
    console.log(res.data);
  }

  const register_input_info = async (e) =>{
    e.preventDefault()
    const form = e.target

    if (formValidation(userName, userEmail, userPassword, confirmPassword, form)) {
      const values = {userName, userEmail, userPassword, confirmPassword}

      try {
        await submitRegister(values)
      } catch (error) {
        window.alert("el email ya se encuantra en uso")
        return
      }
      
      window.location.href = "/Login"
    }
  
  }


  useEffect(()=>{

  }, [Error])
  return (
    <>
      <Navbar_header>
        <Navbar_menu className="center-flex">
            <Logo className="center-flex">
                <Logo_img src={logo_img} alt="logo"></Logo_img>
            </Logo>

            <Navbar_options className="center-flex">
                <li><a href=""><Navbar_options_i className="fa-brands fa-instagram"></Navbar_options_i></a></li>
                <li><a href=""><Navbar_options_i className="fa-brands fa-twitter"></Navbar_options_i></a></li>
                <li><a href=""><Navbar_options_i className="fa-brands fa-youtube"></Navbar_options_i></a></li>
            </Navbar_options>

        </Navbar_menu>
    </Navbar_header>

    <Center>

      <Image_container className="login-img-register">

      </Image_container>

      <Login_form_register className="column_form" id="form" onSubmit={register_input_info} novalidate>

          <Form_title>Register</Form_title>

          <Input_container>
              <Form_p>Ingrese su nombre de usuario</Form_p>
              <Form_input type="text" placeholder="Nombre de usuario" id="userName" onChange={(e) => setUserName(e.target.value)}></Form_input>
              {Error && <Error_message value={userName}></Error_message>}
          </Input_container>


          <Input_container>
              <Form_p>Ingrese su e-mail</Form_p>
              <Form_input type="text" placeholder="E-mail" id="userEmail" onChange={(e) => setEmailRegister(e.target.value)}></Form_input>
              {Error && <Error_message value={userEmail}></Error_message>}
          </Input_container>

          <Input_container>
              <Form_p>ingrese su contraseña</Form_p>
              <Form_input type="password" placeholder="Contraseña" id="userPassword" onChange={(e) => setPasswordRegister(e.target.value)}></Form_input>
              {Error && <Error_message value={userPassword}></Error_message>}
          </Input_container>

          <Input_container>
              <Form_p>Confirme su contraseña</Form_p>
              <Form_input type="password" placeholder="Contraseña" id="userConfirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}></Form_input>
              {Error && <Error_message value={confirmPassword}></Error_message>}
          </Input_container>

          <Button_container>
              <Submit_button type="submit" id="submitRegisterButton">Enviar</Submit_button>
          </Button_container>

          <Input_container>
          <Form_p>Creando una cuenta aceptaras nuestros</Form_p>
          <Form_p><Form_a href="">terminos y condiciones</Form_a></Form_p>
          </Input_container>

          <Form_p>¿Ya tienes una cuenta? <Form_a href="/Login">Inicia sesion</Form_a></Form_p>

      </Login_form_register>

    </Center>





    </>
  )
}

export default Register
