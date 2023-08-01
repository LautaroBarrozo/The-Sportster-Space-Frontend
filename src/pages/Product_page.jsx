import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ErrorContext } from './context/ContextError'
import { Error_message } from './components/Error_message'
import { verifyToken, getCommentRequest, addCommentRequest } from "../api/auth"
import {addCartProduct, checkExistingProduct} from "../api/cart"

// navbar

const Navbar_header = styled.header`
  background-color: #191B1F;
  height: 5rem;
`

const Navbar_nav = styled.nav`
  height: 5rem;
  width: 10rem;
`

const Navbar_i = styled.i`
  cursor: pointer;
  font-size: 2rem;
  margin: 1rem;
  color: #fafafa;
`

// product

const Product_section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`

// comments

const Comments_section = styled.section`
  height: 10rem;
  background-color: #191B1F;
`

const Comments_title = styled.div`
  margin-left: 2rem;
  height: 5rem;
  width: 15rem;
`

const Comments_title_h2 = styled.h2`
  color: #fafafa;
`

const Product_commets_form = styled.form`
  height: 5rem;
  width: 90%;
  display: flex;
`

const Comment_input_container = styled.div`
  width: 30rem;
  display: flex;

  @media (min-width: 565px) and (max-width: 1024px){
    width: 20rem;
  }

  @media (min-width: 486px) and (max-width: 565px){
    width: 16rem;
  }

  @media (min-width: 320px) and (max-width: 486px){
    width: 12rem;
  }
`

const Comment_input = styled.input`
  width: 25rem;
  height: 3rem;
  border-radius: 0.5rem;
  margin-left: 2rem;
  padding-left: 1rem;

  @media (min-width: 565px) and (max-width: 1024px){
    width: 17rem;
  }

  @media (min-width: 486px) and (max-width: 565px){
    width: 13rem;
  }

  @media (min-width: 320px) and (max-width: 486px){
    width: 9rem;
    height: 2rem;
  }
`

const Comments_button = styled.button`
  height: 3rem;
  width: 10rem;
  margin-left: 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: rgb(245,130,31);
  background: linear-gradient(90deg, rgba(245,130,31,1) 0%, rgba(205,71,18,1) 100%);
  color: #fafafa;
  font-family: 'New Rocker', cursive;
  border: none;
  cursor: pointer;

  :hover{
    transition: 0.2s;
    transform: scale(1.09);
  }

  @media (min-width: 320px) and (max-width: 486px){
    height: 2rem;
    width: 5rem;
    margin-left: 1rem;
    font-size: 0.9rem;
  }
`

const Comments_container = styled.div`

`

const Main_container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5rem;

  @media (min-width: 565px) and (max-width: 1024px){
    gap: 1rem;
  }

  @media (min-width: 486px) and (max-width: 565px){
    gap: 1rem;
  }

  @media (min-width: 320px) and (max-width: 486px){
    gap: 1rem;
  }
`

const Product_img_container = styled.div`
  height: 33.5rem;
  width: 33.5rem;
  background-color: #fafafa;
  border-radius: 2rem;
  margin-top: 0.5rem;

  @media (min-width: 486px) and (max-width: 565px){
    height: 25.5rem;
    width: 25.5rem;
  }

  @media (min-width: 320px) and (max-width: 486px){
    height: 18.5rem;
    width: 18.5rem;
  }
`

const Product_img = styled.img`
  height: 33.5rem;
  width: 33.5rem;
  border-radius: 2rem;

  @media (min-width: 486px) and (max-width: 565px){
    height: 25.5rem;
    width: 25.5rem;
  }

  @media (min-width: 320px) and (max-width: 486px){
    height: 18.5rem;
    width: 18.5rem;
  }
`

const Product_info_container = styled.div`
  flex-direction: column;
  width: 37rem;

  @media (min-width: 565px) and (max-width: 1024px){
    width: 30rem;
  }

  @media (min-width: 486px) and (max-width: 565px){
    width: 25rem;
  }

  @media (min-width: 320px) and (max-width: 486px){
    width: 18rem;
  }
`

const Product_info = styled.div`
  height: 15rem;
  width: 36rem;
  background-color: #191B1F;
  border-radius: 1rem;
  margin: 3rem 10rem 3rem 0;

  @media (min-width: 565px) and (max-width: 1024px){
    width: 30rem;
    background: #191B1F;
    border-radius: 1rem;
  }

  @media (min-width: 486px) and (max-width: 565px){
    width: 25rem;
    background: #191B1F;
    border-radius: 1rem;
  }

  @media (min-width: 320px) and (max-width: 486px){
    width: 18rem;
    background: #191B1F;
    border-radius: 1rem;
  }
`

const Product_title = styled.div`
  width: 100%;
  height: 6rem;
`

const Product_title_h2 = styled.h2`
  color: #fafafa;
`

const Product_price = styled.div`
  width: 100%;
  height: 2rem;
`

const Product_price_h2 = styled.h2`
  font-size: 2rem;
  color: #fafafa;
`

const Product_buy_info = styled.div`
  height: 3rem;
  margin-top: 1rem;
  gap: 2rem;
`

const Product_buy_info_p = styled.p`
  color: #F5821F;
`

const Product_buy_info_i = styled.i`
  color: #F5821F;
`

const Button_container = styled.div`
  height: 2rem;
`

const Add_cart_button = styled.button`
  height: 2rem;
  width: 10rem;
  border-radius: 0.5rem;
  background: rgb(245,130,31);
  background: linear-gradient(90deg, rgba(245,130,31,1) 0%, rgba(205,71,18,1) 100%);
  color: #fafafa;
  cursor: pointer;
  border: none;
  font-size: 0.9rem;
  font-family: 'New Rocker', cursive;

  :hover{
    transition: 0.2s;
    transform: scale(1.09);
  }
`

const Product_description = styled.div`
  height: 15rem;
  width: 36rem;
  background-color: #191B1F;
  border-radius: 1rem;
  margin: 3rem 10rem 3rem 0;

  @media (min-width: 565px) and (max-width: 1024px){
    width: 30rem;
    background: #191B1F;
    border-radius: 1rem;
  }

  @media (min-width: 486px) and (max-width: 565px){
    width: 25rem;
    background: #191B1F;
    border-radius: 1rem;
  }

  @media (min-width: 320px) and (max-width: 486px){
    width: 18rem;
    background: #191B1F;
    border-radius: 1rem;
  }
`

const Description_info = styled.div`
  flex-direction: column;
  gap: 1rem;
`

const Description_info_h3 = styled.h3`
  color: #F5821F;
`

// coments

const Comment_container = styled.div`
  height: 10rem;
  margin-top: 5rem;
  display: flex;
`

const Comment_user_icon = styled.div`
  height: 7rem;
  width: 7rem;
  background-color: #191B1F;
  border-radius: 100%;
  margin-left: 1rem;

  @media (min-width: 565px) and (max-width: 1024px){
    height: 6rem;
    width: 7rem;
  }

  @media (min-width: 486px) and (max-width: 565px){
    height: 6rem;
    width: 8rem;
  }

  @media (min-width: 320px) and (max-width: 486px){
    height: 6rem;
    width: 8rem;
  }
`

const Comment_user_icon_i = styled.i`
  color: #fafafa;
  font-size: 3rem;
`

const Comment_user_name = styled.div`
  height: 2rem;
  margin-top: 0.5rem;
  margin-left: 1rem;
`

const Comment_user_name_h3 = styled.h3`
  color: #F5821F;
`

const Comment_content = styled.div`
  height: 3rem;
  display: flex;
  margin-left: 1rem;
  padding: 0 0.5rem 0 0;

  @media (min-width: 565px) and (max-width: 1024px){
    height: 5rem;
  }

  @media (min-width: 486px) and (max-width: 565px){
    height: 5rem;
  }

  @media (min-width: 320px) and (max-width: 486px){
    height: 5rem;
  }
`

const Comment_content_p = styled.p`
  color: #fafafa;
  font-size: 1.2rem;
`

export const Product_page = () => {

  let activeProduct = JSON.parse(localStorage.getItem('ActiveProduct')) || []

  let activeUser = JSON.parse(localStorage.getItem('activeUser')) || 0

  let activeToken = JSON.parse(localStorage.getItem('activeToken')) || 0

  let comments = JSON.parse(localStorage.getItem('comments')) || []

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const saveCartLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const saveCommentLocalStorage = () => {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  const saveData = (comment, product) => {
    comments = [
        ...comments,
        {
            id: comments.length + 1,
            productId: product.id,
            name: comment.userName,
            comment: comment.comment
        }
    ]
  }

  const saveDataNodb = (userName ,comment, product) => {
    comments = [
        ...comments,
        {
            id: comments.length + 1,
            productId: product.id,
            name: userName,
            comment: comment
        }
    ]
  }

  const saveCartData = (product, user) => {
    cart = [
        ...cart,
        {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            userId: user.id
        }
    ]
  }

  const backToHome = () => {
    localStorage.removeItem("comments")
    localStorage.removeItem("ActiveProduct")
    window.location.href = "/"
  }

  const renderSelectedProduct = (product) =>{
    const { id, name, price, origin, color, material, image, description, category, popular } = product;

    const selectedProduct = <Main_container>
                              <Product_img_container>
                                <Product_img src= {image} alt=""></Product_img>
                              </Product_img_container>

                              <Product_info_container>

                                <Product_info>

                                    <Product_title className="center-flex">
                                        <Product_title_h2>{name}</Product_title_h2>
                                    </Product_title>

                                    <Product_price className="center-flex">
                                        <Product_price_h2>${price}</Product_price_h2>
                                    </Product_price>

                                    <Product_buy_info className="center-flex">
                                        <Product_buy_info_p><Product_buy_info_i className="fa-solid fa-truck"></Product_buy_info_i> Envio gratis</Product_buy_info_p>
                                        <Product_buy_info_p><Product_buy_info_i className="fa-solid fa-arrows-rotate"></Product_buy_info_i> Devolucion gratis</Product_buy_info_p>
                                    </Product_buy_info>

                                    <Button_container className="center-flex">
                                        <Add_cart_button id="add-cart-button" onClick={addProductToCart}>Añadir al carrito</Add_cart_button>
                                    </Button_container>
                                </Product_info>

                                <Product_description>
                                    <Product_title className="center-flex">
                                        <Product_title_h2>Información del producto</Product_title_h2>
                                    </Product_title>

                                    <Description_info className="center-flex">
                                        <Description_info_h3>origen: {origin}</Description_info_h3>
                                        <Description_info_h3>color: {color}</Description_info_h3>
                                        <Description_info_h3>material: {material}</Description_info_h3>
                                    </Description_info>

                                </Product_description>
                              </Product_info_container>
                            </Main_container>

    return selectedProduct                           
  }


  const renderComments = () => {

    let productComments = []

    comments.map((comment) => {
        if (comment.productId == activeProduct.id) {
            productComments.push(comment)
        }
    })

    return productComments.map((commentInfo) => {

      const { id, productId, name, comment } = commentInfo

      const commentRender = <Comment_container className="dividerComments">
                              <Comment_user_icon className="center-flex">
                                  <Comment_user_icon_i className="fa-solid fa-user" id="user-icon"></Comment_user_icon_i>
                              </Comment_user_icon>


                              <div className="column_product">
                                  <Comment_user_name>
                                      <Comment_user_name_h3>{name}</Comment_user_name_h3>
                                  </Comment_user_name>

                                  <Comment_content>
                                      <Comment_content_p>{comment}</Comment_content_p>
                                  </Comment_content>
                              </div>

                            </Comment_container>

      return commentRender                      

    })
  }

  const checkLoginToken = async () => {
    const token = activeToken.token
    const value = {token}
    const res = await verifyToken(value)

    if (!res.data) {
        localStorage.removeItem('activeUser')
        return true
    }

    return false
  }

  const checkProducts = async (values) => {
    const res = await checkExistingProduct(values)

    return res.data
  }

  const addProduct = async (values) => {
    const res = await addCartProduct(values)

    return res.data
  }

  const addProductToCart = async () =>{
    const productId = activeProduct.id
    let userId


    if (activeUser) {
      userId = activeUser[0].id
    }

    const image = activeProduct.image
    const name = activeProduct.name
    const price = activeProduct.price

    const checkValues = {userId ,productId}
    const addValues = {image, name, price, productId, userId}
    // let existProduct = true

    if(await checkLoginToken()){
      alert("Para agregar un producto se debe iniciar sesión")
      return
    }

    // cart.map((product) => {
    //   if (product.id == activeProduct.id && product.userId == activeUser.id) {
    //     existProduct = false
    //   }
    // })

    const checkProductResponse = await checkProducts(checkValues)

    if (!checkProductResponse) {
      try {
        addProduct(addValues)
      } catch (error) {
        console.log(error);
      }

      alert("el producto ha sido agregado al carrito")
      saveCartData(activeProduct, activeUser[0])
      saveCartLocalStorage()

    } else if (checkProductResponse) {
      alert("ESTE PRODUCTO YA SE ENCUENTRA EN EL CARRITO")
    }
  }

  const {Error, CommentValidation} = useContext(ErrorContext)

  const [comment, setComment] = useState("")

  const form_input_info = async (e) =>{
    e.preventDefault()

    const form = e.target

    if (await checkLoginToken()){

      window.alert("debes iniciar sesion para dejar un comentario")

    } else if (CommentValidation(comment, form)) {
      const userName = activeUser[0].name
      const productId = activeProduct.id
      const values = {comment, userName, productId}
      try {
        await addCommentRequest(values)
      } catch (error) {
        console.log(error);
      }

      saveDataNodb(userName ,comment, activeProduct)
      saveCommentLocalStorage()
      form.reset()
      window.location.href = "/Product_page"
    }

  }

  const getAllcomments = async () => {
    const productId = activeProduct.id
    const values = {productId}
    const res = await getCommentRequest(values)

    if (res.data.length == 0) {
      return
    }

    const dbComments = res.data

    const alreadyComments = comments.length


    if (alreadyComments == 0) {
      dbComments.map((comment)=>{
        saveData(comment, activeProduct)
        saveCommentLocalStorage()
      })
    }

    window.location.href = "/Product_page"
    
  }

  const reloadToRender = () => {
    const alreadyComments = comments.length

    if (alreadyComments == 0) {
      getAllcomments()
    }
  }


  useEffect(()=>{
    if (comments) {
      reloadToRender()
    }
    
  }, [Error])
  return (
    <>
      <Navbar_header>
          <Navbar_nav className="center-flex">
              <Navbar_i className="fa-solid fa-arrow-left" id="back-arrow" onClick={backToHome}></Navbar_i>
          </Navbar_nav>        
      </Navbar_header>

      <Product_section id="ProductSectionContaioner">


        {renderSelectedProduct(activeProduct)}


      </Product_section>

      <Comments_section>
        <Comments_title className="center-flex">
            <Comments_title_h2>Preguntale al vendedor</Comments_title_h2>
        </Comments_title>

        <Product_commets_form id="product-comments-form" onSubmit={form_input_info}>

            <Comment_input_container className="column_product">
                <Comment_input type="text" placeholder="Escribe tu pregunta" id="comment-input" onChange={(e) => setComment(e.target.value)}></Comment_input>
                {Error && <Error_message value={comment}></Error_message>}
            </Comment_input_container>

            <Comments_button type="submit">Preguntar</Comments_button>
        </Product_commets_form>


        <Comments_container id="comments-container">
             
        {renderComments()}

        </Comments_container>
      </Comments_section>
    </>
  )
}


export default Product_page