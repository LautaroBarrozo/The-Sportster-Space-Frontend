import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import logo_img from './imgs/logo/logo.png'
import { Error_message } from './components/Error_message'
import { ErrorContext } from './context/ContextError'
import { loginUserRequest } from "../api/auth"

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
  height: 25rem;
  border-radius: 1rem 0 0 1rem;

  @media (min-width: 420px) and (max-width: 950px){
    display: none;
  }

  @media (min-width: 300px) and (max-width: 420px){
    display: none;
  }
`

const Login_form = styled.form`
  background-color: #191B1F;
  width: 25rem;
  height: 25rem;
  border-radius: 0 1rem 1rem 0;

  @media (min-width: 420px) and (max-width: 950px){
    border-radius: 1rem;
  }

  @media (min-width: 300px) and (max-width: 420px){
    width: 17rem;
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
  
  :hover{
    transition: 0.5s;
    transform: scale(1.2);
  }
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

const Form_a = styled.a`
  color: #F5821F;

  :hover{
    text-decoration: underline;
  }
`


export const Login = () => {
  const {Error, loginValidation} = useContext(ErrorContext)

  const [userEmail, setEmail] = useState("")
  const [userPassword, setPasword] = useState("")

  let activeUser = JSON.parse(localStorage.getItem('activeUser')) || []

  let activeToken = JSON.parse(localStorage.getItem('activeToken')) || []

  const saveData = (data) => {
    activeUser = [
            {
              id: data.id,
              name: data.userName,
              email: data.userEmail,
            }
    ]
  }

  const saveToken = (token) => {
    activeToken = {
                    token: token,
                  }

  }

  const saveLogedUser = () => {
    localStorage.setItem('activeUser', JSON.stringify(activeUser))
  }

  const saveNewToken = () => {
    localStorage.setItem('activeToken', JSON.stringify(activeToken))
  }

  const submitLogin = async (values) => {
    const res = await loginUserRequest(values)
    saveToken(res.data.token)
    saveNewToken()
    saveData(res.data)
    saveLogedUser()

  }

  const login_input_info = async (e) =>{
    e.preventDefault()
    const form = e.target
  
    if (loginValidation(userEmail, userPassword, form)) {
      const values = {userEmail, userPassword}
      try {
        await submitLogin(values)
      } catch (error) {
        window.alert("los datos no corresponden con ningun usuario")
        return
      }
      form.reset()
      window.location.href = "/"
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

        <Image_container className="login-img">

        </Image_container>

        <Login_form name='login_form' className="column_form" id="loginForm" onSubmit={login_input_info} novalidate>

            <Form_title>Login</Form_title>

            <Input_container>
              <Form_p>Ingrese su e-mail</Form_p>
              <Form_input name='login_email' type="text" placeholder="E-mail" id="loginEmail" onChange={(e) => setEmail(e.target.value)}></Form_input>
              {Error && <Error_message value={userEmail}></Error_message>}
            </Input_container>

            <Input_container>
              <Form_p>ingrese su contraseña</Form_p>
              <Form_input name='login_password' type="password" placeholder="Contraseña" id="loginPassword" onChange={(e) => setPasword(e.target.value)}></Form_input>
              {Error && <Error_message value={userPassword}></Error_message>}
            </Input_container>

            <Button_container>
              <Submit_button type="submit">Enviar</Submit_button>
            </Button_container>

            <Form_p>¿no tienes una cuenta? <Form_a href="/Register">Registrate</Form_a></Form_p>
        </Login_form>

      </Center>

    </>
  )
}

export default Login
