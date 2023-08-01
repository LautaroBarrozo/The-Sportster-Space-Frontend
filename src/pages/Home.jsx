import React, {useEffect, useState } from 'react'
import styled from 'styled-components'
import logo_img from './imgs/logo/logo.png'
import moto_hero from './imgs/sponsors/moto-hero.jpg'
import motorbike from './imgs/categories/motorbike.png'
import leatherJacket from './imgs/categories/leather-jacket.png'
import jeans from './imgs/categories/jeans.png'
import boots from './imgs/categories/boots.png'
import helmet from './imgs/categories/helmet.png'
import pads from './imgs/categories/pads.png'
import gloves from './imgs/categories/gloves.png'
import { products } from './js/products'
import { verifyToken, logOutRequest } from "../api/auth"
import { getCartProducts, plusQuantity, minusQuantity, deleteUserCart} from "../api/cart"

// navbar

const Navbar_header = styled.header`
    position: fixed;
    width: 100%;
    height: 5rem;
    z-index: 1;
    background-color: #191B1F;

`

const Navbar_menu = styled.nav`
    justify-content: space-between;
    height: 5rem;
`

const Logo = styled.div`
    height: 4rem;
    width: 5rem;
`

const Logo_img = styled.img`
    margin-left: 1rem;
    height: 4rem;
    width: 5rem;
`

const Option_container = styled.div`
`

const Menu_navbar_icon = styled.div`
    display: none;

    @media (max-width: 768px){
        display: flex;
    }
`

const Menu_navbar_icon_i = styled.i`
    @media (max-width: 768px){
        font-size: 1.5rem;
    }
`

const Navbar_options = styled.ul`
    width: 17rem;
    gap: 1rem;

    @media (max-width: 768px){
        height: 15rem;
        width: 100%;
        flex-direction: column;
        background: rgb(0,0,0);
        background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(43,46,51,1) 100%, rgba(25,27,31,1) 100%);
        position: absolute;
        right: 0;
        top: 5rem;
        z-index: 3;
        /* transform: translateY(-200%); */
        transition: all 0.5s cubic-bezier(0.92, 0.01, 0.35, 0.99);


        transform: ${({showNavmenu}) => showNavmenu ? 'translateY(0%)' : 'translateY(-200%)'};
    }
`
const Navbar_options_a = styled.a`
   color: #fafafa;
`
const Icons_options_navabar = styled.div`
    width: 5rem;
`

const Icons_options = styled.ul`
    gap: 1rem;
`

const User_menu = styled.div`
    position: absolute;
    top: 5rem;
    right: 0;
    padding: 50px 30px;
    display: flex;
    flex-direction: column;
    height: 26rem;
    z-index: 2;
    min-width: 25rem;
    /* transform: translate(200%); */
    transition: all 0.5s cubic-bezier(0.92, 0.01, 0.35, 0.99);
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(43,46,51,1) 100%, rgba(25,27,31,1) 100%);

    &::-webkit-scrollbar {
    display: none;
    }

    transform: ${({showusermenu}) => showusermenu ? 'translate(0%)' : 'translate(200%)'};

    @media (min-width: 320px) and (max-width: 400px){
        min-width: 20rem;
    }

`

const Cart_menu = styled.div`
    position: absolute;
    top: 5rem;
    right: 0;
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: calc(100vh - 4rem);
    overflow-y: scroll;
    z-index: 2;
    min-width: 25rem;
    /* transform: translate(200%); */
    transition: all 0.5s cubic-bezier(0.92, 0.01, 0.35, 0.99);
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(43,46,51,1) 100%, rgba(25,27,31,1) 100%);

    &::-webkit-scrollbar {
    display: none;
    }

    transform: ${({showcartmenu}) => showcartmenu ? 'translate(0%)' : 'translate(200%)'};

    @media (min-width: 320px) and (max-width: 400px){
        min-width: 20rem;
    }
`

const Cart_menu_h2 = styled.h2`
    color: #fafafa;
    font-family: 'New Rocker', cursive;
`
const Products_container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const Divider = styled.span`
    margin-top: 1.3rem;
    border: 0.5px solid #F5821F;
    width: 100%;
`

const Cart_total = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
`

const Cart_total_p = styled.p`
    color: #fafafa;
    font-weight: 700;
`

const Cart_total_span = styled.span`
    color: #fafafa;
    font-weight: 400;
    font-size: 1rem;
`

const Overlay = styled.div`
    position: absolute;
    top: 5rem;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 1;
  
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    
    display: ${({showmenu}) => showmenu ? 'block' : 'none'};
`

// hero

const Hero_container = styled.div`
    height: 44rem;
    width: 100%;
    overflow: hidden;
    background: url(${moto_hero}) no-repeat center;
`

const Hero = styled.div`
    width: 100%;
    height: 100%;
`

const Hero_title = styled.h1`
    font-family: 'New Rocker', cursive;
    font-size: 5rem;
    background: rgb(245,130,31);
    background: linear-gradient(90deg, rgba(245,130,31,1) 0%, rgba(205,71,18,1) 100%);
    
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;

    @media (min-width: 320px) and (max-width: 500px){
        font-size: 2.2rem;
    }

    @media (min-width: 500px) and (max-width: 700px){
        font-size: 3.5rem;
    }
`

// sponsor

const Sponsors_container = styled.section`
    min-height: 20rem;
`

const Sponsor_title_container = styled.div`
    padding-top: 2rem;
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: center;
`

const Sponsor_title = styled.h2`
    font-size: 3rem;
    color: #fafafa;
    font-family: 'New Rocker', cursive;

    @media (min-width: 320px) and (max-width: 450px){
        font-size: 2rem;
    }
`

const Sponsor_icon_container = styled.div`
    padding-top: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10rem;
    flex-wrap: wrap;
`

const Sponsor = styled.div`
    height: 10rem;
    width: 10rem;
    cursor: pointer;

    :hover{
        transition: 0.5s;
        transform: scale(1.2);
    }
`

// filtros

const Categories_container = styled.section`
    min-height: 20rem;
    flex-wrap: wrap;
    background-color: #191B1F;

    @media (min-width: 600px) and (max-width: 1050px){
        min-height: 30rem;
    }

    @media (min-width: 450px) and (max-width: 600px){
        min-height: 43rem;
    }

    @media (min-width: 320px) and (max-width: 450px){
        min-height: 55rem;
    }
`

const Categories_container_h5 = styled.h5`
    font-size: 1.5rem;
    padding: 2rem 0 0 2rem;
    color: #fafafa;
    font-family: 'New Rocker', cursive;
`

const Categories = styled.div`
    justify-content: space-around;
	margin: auto;
    flex-wrap: wrap;
`

const Category = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 150px;
	height: 170px;
	border-radius: 15px;
	background-color: #2B2E33;
	border: none;
	transition: 0.05s all ease-out;
    margin-top: 2rem;
    cursor: pointer;

    :hover{
        transform: scale(1.02);
    }
`

const Category_h4 = styled.h4`
	font-size: 1rem;
    color: #fafafa;
    margin: 1rem;
`

const Divider_categories = styled.span`
	width: 24px;
	height: 4px;
	background: #F5821F;
	border-radius: 15px;
`

// user menu

const User_menu_icon = styled.div`
    height: 10rem;
    width: 10rem;
    background: rgb(43,46,51);
    background: linear-gradient(90deg, rgba(43,46,51,1) 0%, rgba(0,0,0,1) 100%, rgba(25,27,31,1) 100%);
    border-radius: 100%;
    cursor: pointer;
`

const User_menu_icon_i = styled.i`
    color: #fafafa;
    font-size: 5rem;
`

const User_name = styled.h2`
    color: #fafafa;
    margin: 1rem;
`

const User_email = styled.h4`
    color: #fafafa;
    margin: 1rem;
`

const Logout_button = styled.button`
    height: 2rem;
    width: 10rem;
    border-radius: 0.7rem;
    cursor: pointer;
    font-family: 'New Rocker', cursive;
    margin: 1rem;
    border: none;
    color: #fafafa;
    background: rgb(245,130,31);
    background: linear-gradient(90deg, rgba(245,130,31,1) 0%, rgba(205,71,18,1) 100%);

    :hover{
        transition: 0.5s;
        transform: scale(1.2);
    }
`

// products cards

const Products_container_cards = styled.section`

`

const Product_title_container = styled.div`
    height: 5rem;
    display: flex;
    align-items: center;
`

const Product_title_container_h5 = styled.h5`
    font-size: 1.5rem;
    padding: 2rem 0 0 2rem;
    color: #fafafa;
    font-family: 'New Rocker', cursive;
`

const Products = styled.div`
    display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 1rem;
`

const Product_card = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	background-color: #191B1F;
    gap: 1rem;
    cursor: pointer;
	border-radius: 15px;
	padding: 20px 8px;
	width: 20rem;
	height: 25rem;

    :hover{
        transition: 0.5s;
        transform: scale(1.03);
    }
`

const Product_image_container = styled.div`
    height: 15rem;
    width: 17rem;
`

const Product_image = styled.img`
    height: 15rem;
    width: 17rem;
    border-radius: 0.5rem;
`

const Product_name_container = styled.div`
    width: 100%;
    text-align: center;
`

const Product_name_container_h3 = styled.h3`
    color: #fafafa;
    font-size: 1.5rem;
`

const Product_price_container = styled.div`

`

const Product_price_container_h3 = styled.h3`
    color: #F5821F;
`

const Product_description_container = styled.div`
    height: 4rem;
    width: 100%;
    text-align: center;
`

const Product_description_container_p = styled.p`
    color: #fafafa;
`

// footer

const Footer_section = styled.section`
    margin-top: 2rem;
    height: 10rem;
    background-color: #191B1F;
`

const Contact_title_container = styled.div`
    height: 3rem;
`

const Contact_title_container_h2 = styled.h2`
    color: #F5821F;
    font-family: 'New Rocker', cursive;
`

const Social_icons_container = styled.div`
    height: 5rem;
    gap: 2rem;
`

const Social_icons_container_li = styled.li`
    font-size: 1.5rem;
`

const Social_icons = styled.i`
    :hover{
        color: #F5821F;
    }
`

// cart

const Cart_item = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.3rem;
    background-color: #2323234e;
    padding: 1.3rem;
    border: 1px solid #F5821F;
    border-radius: 10px;

    @media (min-width: 320px) and (max-width: 400px){
        flex-direction: column;
        text-align: center;
        height: 15rem;
        width: 15rem;
    }
`

const Cart_item_img = styled.img`
    height: 4rem;
    width: 4rem;
`

const Item_info = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 7rem;
`

const Item_title = styled.h3`
    color: #fafafa;
    font-weight: 600;
    font-size: 14px;
`

const Item_price = styled.span`
    color: #F5821F;
    font-size: 16px;
    font-weight: 800;
`

const Item_handler = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.3rem;
`

const Quantity_handler = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 8px;
    border-radius: 5px;
    height: 2rem;
    color: #fafafa;
    font-weight: 400;
    border: 1px solid #F5821F;

    :hover{
        cursor: pointer;
        background-color: #F5821F;
        transition: all 0.2s ease-in;
    }
`

const Item_quantity = styled.span`
    color: #fafafa;
`




export const Home = () => {

    let activeUser = JSON.parse(localStorage.getItem('activeUser')) || 0

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let activeToken = JSON.parse(localStorage.getItem('activeToken')) || 0

    let theCartIsEmpty = true

    const saveCartLocalStorage = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
    };
  
    const [showusermenu, userMenuClick] = useState(false)
    const [showcartmenu, cartMenuClick] = useState(false)
    const [showNavmenu, NavMenuClick] = useState(false)

    const [cartProducts, setCart] = useState(cart);

    const [activePopular, popularFilter] = useState(true)
    const [activeCamperas, camperasFilter] = useState(false)
    const [activePantalones, pantalonesFilter] = useState(false)
    const [activeCalzado, calzadoFilter] = useState(false)
    const [activeCascos, cascosFilter] = useState(false)
    const [activeProtecciones, proteccionesFilter] = useState(false)
    const [activeGuantes, guantesFilter] = useState(false)

    const [filtredProducts, setProducts] = useState([])

    



    const changePopularClick = () => {
        if(activePopular){
            return
        }else if(activeCamperas){
            camperasFilter(!activeCamperas)
        }else if(activePantalones){
            pantalonesFilter(!activePantalones)
        }else if(activeCalzado){
            calzadoFilter(!activeCalzado)
        }else if(activeCascos){
            cascosFilter(!activeCascos)
        }else if(activeProtecciones){
            proteccionesFilter(!activeProtecciones)
        }else if(activeGuantes){
            guantesFilter(!activeGuantes)
        }

        popularFilter(!activePopular)
    }

    const changeCamperasClick = () => {
        if(activePopular){
            popularFilter(!activePopular)
        }else if(activeCamperas){
            return
        }else if(activePantalones){
            pantalonesFilter(!activePantalones)
        }else if(activeCalzado){
            calzadoFilter(!activeCalzado)
        }else if(activeCascos){
            cascosFilter(!activeCascos)
        }else if(activeProtecciones){
            proteccionesFilter(!activeProtecciones)
        }else if(activeGuantes){
            guantesFilter(!activeGuantes)
        }

        const filtredCategory = products.filter((producto) => producto.category == 'camperas');
        setProducts(filtredCategory)

        camperasFilter(!activeCamperas)
    }

    const changePantalonesClick = () => {
        if(activePopular){
            popularFilter(!activePopular)
        }else if(activeCamperas){
            camperasFilter(!activeCamperas)
        }else if(activePantalones){
            return
        }else if(activeCalzado){
            calzadoFilter(!activeCalzado)
        }else if(activeCascos){
            cascosFilter(!activeCascos)
        }else if(activeProtecciones){
            proteccionesFilter(!activeProtecciones)
        }else if(activeGuantes){
            guantesFilter(!activeGuantes)
        }

        const filtredCategory = products.filter((producto) => producto.category == 'pantalones');
        setProducts(filtredCategory)

        pantalonesFilter(!activePantalones)
    }

    const changeCalzadoClick = () => {
        if(activePopular){
            popularFilter(!activePopular)
        }else if(activeCamperas){
            camperasFilter(!activeCamperas)
        }else if(activePantalones){
            pantalonesFilter(!activePantalones)
        }else if(activeCalzado){
            return
        }else if(activeCascos){
            cascosFilter(!activeCascos)
        }else if(activeProtecciones){
            proteccionesFilter(!activeProtecciones)
        }else if(activeGuantes){
            guantesFilter(!activeGuantes)
        }

        const filtredCategory = products.filter((producto) => producto.category == 'calzado');
        setProducts(filtredCategory)

        calzadoFilter(!activeCalzado)
    }
    
    const changeCascosClick = () => {
        if(activePopular){
            popularFilter(!activePopular)
        }else if(activeCamperas){
            camperasFilter(!activeCamperas)
        }else if(activePantalones){
            pantalonesFilter(!activePantalones)
        }else if(activeCalzado){
            calzadoFilter(!activeCalzado)
        }else if(activeCascos){
            return
        }else if(activeProtecciones){
            proteccionesFilter(!activeProtecciones)
        }else if(activeGuantes){
            guantesFilter(!activeGuantes)
        }

        const filtredCategory = products.filter((producto) => producto.category == 'cascos');
        setProducts(filtredCategory)

        cascosFilter(!activeCascos)
    }

    const changeProteccionesClick = () => {
        if(activePopular){
            popularFilter(!activePopular)
        }else if(activeCamperas){
            camperasFilter(!activeCamperas)
        }else if(activePantalones){
            pantalonesFilter(!activePantalones)
        }else if(activeCalzado){
            calzadoFilter(!activeCalzado)
        }else if(activeCascos){
            cascosFilter(!activeCascos)
        }else if(activeProtecciones){
            return
        }else if(activeGuantes){
            guantesFilter(!activeGuantes)
        }

        const filtredCategory = products.filter((producto) => producto.category == 'protecciones');
        setProducts(filtredCategory)

        proteccionesFilter(!activeProtecciones)
    }

    const changeGuantesClick = () => {
        if(activePopular){
            popularFilter(!activePopular)
        }else if(activeCamperas){
            camperasFilter(!activeCamperas)
        }else if(activePantalones){
            pantalonesFilter(!activePantalones)
        }else if(activeCalzado){
            calzadoFilter(!activeCalzado)
        }else if(activeCascos){
            cascosFilter(!activeCascos)
        }else if(activeProtecciones){
            proteccionesFilter(!activeProtecciones)
        }else if(activeGuantes){
            return
        }

        const filtredCategory = products.filter((producto) => producto.category == 'guantes');
        setProducts(filtredCategory)

        guantesFilter(!activeGuantes)
    }

    const getProductcard = (e) =>{
        const product = getProduct(e.target.getAttribute('data-id'))
        localStorage.setItem("ActiveProduct", JSON.stringify(product))
        window.location.href = "/Product_page"
    }

    const getProduct = (id) => {
        const productFind = products.find((producto) => producto.id === Number(id))
        return productFind
    }

    const renderPopularProducts = () =>{
        let popularProducts = products.filter((producto) => producto.popular == true);
        return popularProducts.map((product) => {

            const { id, name, price, origin, color, material, image, description, category, popular } = product;

            const productCard = <Product_card data-id = {id} id="product-card" onClick={(e) => getProductcard(e)}>
                                    <Product_image_container>
                                        <Product_image src={image} alt="imagen del producto"></Product_image>
                                    </Product_image_container>

                                    <Product_name_container>
                                        <Product_name_container_h3>{name}</Product_name_container_h3>
                                    </Product_name_container>

                                    <Product_price_container>
                                        <Product_price_container_h3>${price}</Product_price_container_h3>
                                    </Product_price_container>

                                    <Product_description_container>
                                        <Product_description_container_p>{description}</Product_description_container_p>
                                    </Product_description_container>
                                </Product_card>

            
            return productCard

        })
    }

    const renderProducts = (filtredProducts) => {
        return filtredProducts.map((product) => {

            const { id, name, price, origin, color, material, image, description, category, popular } = product;

            const productCard = <Product_card data-id = {id} id="product-card" onClick={(e) => getProductcard(e)}>
                                    <Product_image_container>
                                        <Product_image src={image} alt="imagen del producto"></Product_image>
                                    </Product_image_container>

                                    <Product_name_container>
                                        <Product_name_container_h3>{name}</Product_name_container_h3>
                                    </Product_name_container>

                                    <Product_price_container>
                                        <Product_price_container_h3>${price}</Product_price_container_h3>
                                    </Product_price_container>

                                    <Product_description_container>
                                        <Product_description_container_p>{description}</Product_description_container_p>
                                    </Product_description_container>
                                </Product_card>

            return productCard

        })
    }

    const renderProductsCards = (category) => {
        if(activePopular){
            return renderPopularProducts()
        }else{
            return renderProducts(filtredProducts)
        }
    }

    const changeUserMenuClick = () => {
        if(showcartmenu){
            changeCartMenuClick()
        }else if(showNavmenu){
            changeNavMenuClick()
        }

        userMenuClick(!showusermenu)
    }

    const changeCartMenuClick = () => {
        if(showusermenu){
            changeUserMenuClick()
        }else if(showNavmenu){
            changeNavMenuClick()
        }

        cartMenuClick(!showcartmenu)
    }

    const changeNavMenuClick = () =>{
        if(showusermenu){
            changeUserMenuClick()
        } else if(showcartmenu){
            changeCartMenuClick()
        }

        NavMenuClick(!showNavmenu)
    }

    const changeOverlayClick = () =>{
        if(showcartmenu){
            changeCartMenuClick()
        }else if(showusermenu){
            changeUserMenuClick()
        }else if(showNavmenu){
            changeNavMenuClick() 
        }
    }

    const logOut = async () => {
        const res = await logOutRequest()
    }


    const closeSession = () =>{
        localStorage.removeItem('activeUser')
        localStorage.removeItem('activeToken')
        localStorage.removeItem('cart')
        logOut()
        window.location.href = "/"
    }

    const openSession = () =>{
        window.location.href = "/Login"
    }

    const renderUserInfo = (user) => {

        const { id, name, email } = user;

        const userInfo = <div className="center-flex column">
                            <User_menu_icon className="center-flex">
                                <User_menu_icon_i className="fa-solid fa-user"></User_menu_icon_i>
                            </User_menu_icon>

                            <User_name>{name}</User_name>
                            <User_email>{email}</User_email>

                            <Logout_button id="logout-button" onClick={() => closeSession()}>cerrar sesion</Logout_button>
                        </div>

        return userInfo

    }

    const renderLoginButton = () => {

        const loginInfo = <div className="center-flex column">
                            <User_menu_icon className="center-flex">
                                <User_menu_icon_i className="fa-solid fa-user"></User_menu_icon_i>
                            </User_menu_icon>

                            <User_name>No se ha iniciado sesion</User_name>
                            <User_email>inicie sesion para continuar</User_email>

                            <Logout_button id="logout-button" onClick={() => openSession()}>iniciar sesion</Logout_button>
                        </div>

        return loginInfo                
    }

    const checkCartState = () => {
        saveCartLocalStorage();
    };

    const getCartTotal = () => {
        let total = 0
    
        cart.map((product) => {

            if (product.userId == activeUser[0].id) {
                total += product.price * product.quantity
            }      

        })
    
        return total
    
    };

    const showTotal = () => {
        return getCartTotal().toFixed(2);
    };

    const deleteUserProducts = async (values) =>{
        const res = await deleteUserCart(values)
    }

    const resetCartItems = () => {
        const userId = activeUser[0].id
        const value = {userId}


        deleteUserProducts(value)
        theCartIsEmpty = false

        cart = cart.filter((product) => product.userId != activeUser[0].id)
        checkCartState();
        let cartUpdate = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(cartUpdate)
    };

    const completeCartAction = (confirmMsg, successMsg) => {
        const userId = activeUser[0].id
        const value = {userId}

        if (cart.length == 0) return;
        if (window.confirm(confirmMsg)) {
            resetCartItems()
            alert(successMsg);
        }
    };

    const completeBuy = () => {
        completeCartAction(
            "¿Desea completar su compra?",
            "La compra se ha realizado correctamente"
        );

    };
    
    const deleteCart = () => {
        completeCartAction(
            "¿Está seguro de que desea vaciar el carrito?",
            "No hay productos en el carrito"
        );

    };

    const removeProductFromCart = (product) => {
        cart.map((cartProduct) => {
            if (cartProduct.id === product.id && (product.userId && cartProduct.userId) === activeUser[0].id) {
                const index = cart.indexOf(cartProduct)
                cart.splice(index, 1)
                return
            }
    
        })
        checkCartState();
        let cartUpdate = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(cartUpdate)
    };

    const substractProductUnit = (product) => {
        cart = cart.map((cartProduct) => {
            return cartProduct.id == product.id && cartProduct.userId == activeUser[0].id
                ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
                : cartProduct;
        });

        checkCartState()
        let cartUpdate = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(cartUpdate)
    };



    const addUnitToProduct = (product) => {
        cart = cart.map((cartProduct) => {
            return cartProduct.id == product.id && cartProduct.userId == activeUser[0].id
                ? { ...cartProduct, quantity: cartProduct.quantity + 1,}
                : cartProduct;
        });
        
        checkCartState()
        let cartUpdate = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(cartUpdate)
        
    };

    
    const addUnitInDB = async (values) => {
        const res = await plusQuantity(values)
    }

    const handlePlusBtnEvent = (e) => {
        const userId = activeUser[0].id
        const productId = e.target.getAttribute('data-id')
        const values = {userId, productId}

        addUnitInDB(values)

        const product = getProduct(e.target.getAttribute('data-id'))
        const existingCartProduct = cart.find((item) => item.id == product.id);
        addUnitToProduct(existingCartProduct);
    };

    const extractUnitInDB = async (values) =>{
        const res = await minusQuantity(values)
    }

    const handleMinusBtnEvent = (e) => {
        const userId = activeUser[0].id
        const productId = e.target.getAttribute('data-id')
        const values = {userId, productId}  

        const product = getProduct(e.target.getAttribute('data-id'))
        const existingCartProduct = cart.find((item) => item.id == product.id && item.userId == activeUser[0].id);
    
        if (existingCartProduct.quantity == 1) {
            if (window.confirm("¿Desea Eliminar el producto del carrito?")) {
                extractUnitInDB(values)
                removeProductFromCart(existingCartProduct);
            }
            return;
        }

        extractUnitInDB(values)
        substractProductUnit(existingCartProduct);
    };




    const renderCartProducts = () =>{
        return renderCart()
    }

    const renderCart = () =>{
        return cartProducts.map((product) => {
            const { id, name, price, image, quantity, userId } = product

            const productCartCard = <Cart_item>
                                        <Cart_item_img src={image} alt="producto del carrito"></Cart_item_img>
                                        <Item_info>
                                            <Item_title>{name}</Item_title>
                                            <Item_price>$ {price}</Item_price>
                                        </Item_info>
                                        <Item_handler>
                                            <Quantity_handler data-id={id} onClick={(e) => handleMinusBtnEvent(e)}>-</Quantity_handler>
                                            <Item_quantity>{quantity}</Item_quantity>
                                            <Quantity_handler data-id={id} onClick={(e) => handlePlusBtnEvent(e)}>+</Quantity_handler>
                                        </Item_handler>
                                    </Cart_item>

            if (userId == activeUser[0].id){
                return productCartCard 
            } 
                      
        });
    }

    const checkLoginToken = async () => {
        const token = activeToken.token
        const value = {token}
        const res = await verifyToken(value)

        if (!res.data) {
            localStorage.removeItem('activeUser')
        }
    }

    const saveCartData = (data) => {
        cart = [
            ...cart,
            {
                id: cart.length + 1,
                name: data.name,
                price: data.price,
                image: data.image,
                quantity: data.quantity,
                userId: data.userId
            }
        ]
    }

    const getUserProducts = async (value) => {
        const res = await getCartProducts(value)

        const products = res.data

        if (products.length == 0) {
            theCartIsEmpty = false
            return
        }


        products.map((product) => {
            saveCartData(product)
            saveCartLocalStorage()
        })
        
        window.location.href = "/"

    }

    useEffect(()=>{
        let userId
        let value

        if (activeUser) {
            userId = activeUser[0].id
            value = {userId}
        }


        if (cart.length === 0 && activeUser.length > 0 && theCartIsEmpty) {
            getUserProducts(value)
        }
        

        checkLoginToken()

        let previousScrollPosition = 0;
        let currentScrollPosition = 0;

        window.addEventListener('scroll', function (e) {
            currentScrollPosition = window.pageYOffset;

            if(previousScrollPosition - currentScrollPosition < 0){
                userMenuClick(showusermenu)
                cartMenuClick(showcartmenu)
                NavMenuClick(showNavmenu)
            }
            previousScrollPosition = currentScrollPosition
        })  

    }, [filtredProducts])

  return (
    <>
        <Navbar_header>
            <Navbar_menu className="center-flex">
                <Logo className="center-flex">
                        <Logo_img src={logo_img} alt="logo"></Logo_img>
                </Logo>


                <Option_container className="center-flex">

                    <Menu_navbar_icon id="navbar-bars" onClick={() => changeNavMenuClick()}>
                        <Menu_navbar_icon_i className="fa-solid fa-bars"></Menu_navbar_icon_i>
                    </Menu_navbar_icon>

                    <Navbar_options className="center-flex" id="navbar-bars-menu" showNavmenu={showNavmenu}>
                        <li><Navbar_options_a href="#hero">Inicio</Navbar_options_a></li>
                        <li><Navbar_options_a href="#products">Productos</Navbar_options_a></li>
                        <li><Navbar_options_a href="#sponsors">Sponsors</Navbar_options_a></li>
                        <li><Navbar_options_a href="#contacto">Contacto</Navbar_options_a></li>
                    </Navbar_options>

                    <Icons_options_navabar>
                        <Icons_options className="center-flex">
                            <li><i className="fa-sharp fa-solid fa-cart-shopping" id="cart-icon" onClick={() => changeCartMenuClick()}></i></li>
                            <li><i className="fa-solid fa-user" id="user-icon" onClick={() => changeUserMenuClick()}></i></li>
                        </Icons_options>
                    </Icons_options_navabar>
                </Option_container>

                <User_menu id="user-info-menu" showusermenu={showusermenu}>
                    
                    {activeUser != 0 ? renderUserInfo(activeUser[0]) : renderLoginButton()  }
                    
                </User_menu>

                <Cart_menu id="cart-menu" showcartmenu={showcartmenu}>
                    <Cart_menu_h2>Tus productos</Cart_menu_h2>
                    <Products_container id="cart-container">

                        {renderCartProducts()}


                    </Products_container>
                    <Divider></Divider>

                    <Cart_total>
                        <Cart_total_p>Total:</Cart_total_p>
                        <Cart_total_span id="total">$ {showTotal()}</Cart_total_span>
                    </Cart_total>

                    <button className="btn-buy" id="buy-btn" onClick={completeBuy}>Comprar</button>
                    <button className="btn-delete" id="delete-btn" onClick={deleteCart}>Vaciar carrito</button>
                </Cart_menu>

                <Overlay id="overlay" showmenu={showusermenu || showcartmenu || showNavmenu} onClick={() => changeOverlayClick()}></Overlay>
            </Navbar_menu>

        </Navbar_header>

        <Hero_container id="hero">
            <Hero className="center-flex">
                <Hero_title>The Sportster Space</Hero_title>
            </Hero>        
        </Hero_container>

        <Sponsors_container id="sponsors">

            <Sponsor_title_container>
                <Sponsor_title>Nuestros sponsors</Sponsor_title>
            </Sponsor_title_container>

            <Sponsor_icon_container>
                <Sponsor className="sponsor_img1"></Sponsor>
                <Sponsor className="sponsor_img2"></Sponsor>
                <Sponsor className="sponsor_img3"></Sponsor>
                <Sponsor className="sponsor_img4"></Sponsor>
                <Sponsor className="sponsor_img5"></Sponsor>
            </Sponsor_icon_container>

        </Sponsors_container>

        <Categories_container id="products">

            <Categories_container_h5>Categorias de productos</Categories_container_h5>

            <Categories className="center-flex">
                <Category className={activePopular ? "active" : ""} onClick={() => changePopularClick()}>
                    <img src={motorbike} alt="populares" />
                    <Category_h4>Populares</Category_h4>
                    <Divider_categories></Divider_categories>
                </Category>
                <Category data-category="camperas" className={activeCamperas ? "active" : ""} onClick={() => changeCamperasClick()}>
                    <img src={leatherJacket} alt="Camperas" />
                    <Category_h4>Camperas</Category_h4>
                    <Divider_categories></Divider_categories>
                </Category>
                <Category data-category="pantalones" className={activePantalones ? "active" : ""} onClick={() => changePantalonesClick()}>
                    <img src={jeans} alt="pantalones" />
                    <Category_h4>Pantalones</Category_h4>
                    <Divider_categories></Divider_categories>
                </Category>
                <Category data-category="calzado" className={activeCalzado ? "active" : ""} onClick={() => changeCalzadoClick()}>
                    <img src={boots} alt="calzado" />
                    <Category_h4>Calzado</Category_h4>
                    <Divider_categories></Divider_categories>
                </Category>
                <Category data-category="cascos" className={activeCascos ? "active" : ""} onClick={() => changeCascosClick()}>
                    <img src={helmet} alt="cascos" />
                    <Category_h4>Cascos</Category_h4>
                    <Divider_categories></Divider_categories>
                </Category>
                <Category data-category="protecciones" className={activeProtecciones ? "active" : ""} onClick={() => changeProteccionesClick()}>
                    <img src={pads} alt="protecciones" />
                    <Category_h4>Protecciones</Category_h4>
                    <Divider_categories></Divider_categories>
                </Category>
                <Category data-category="guantes" className={activeGuantes ? "active" : ""} onClick={() => changeGuantesClick()}>
                    <img src={gloves} alt="guantes" />
                    <Category_h4>Guantes</Category_h4>
                    <Divider_categories></Divider_categories>
                </Category>
            </Categories>
        </Categories_container>

        <Products_container_cards>
        
            <Product_title_container>
                <Product_title_container_h5>Nuestros Productos</Product_title_container_h5>
            </Product_title_container>

            <Products className='products' id="productsHomeContainer">

                {renderProductsCards()}

            </Products>
            

        </Products_container_cards>

        <Footer_section id="contacto">
            <footer>
                <Contact_title_container className="center-flex">
                    <Contact_title_container_h2>Contactenos</Contact_title_container_h2>
                </Contact_title_container>
                <Social_icons_container className="center-flex">
                    <Social_icons_container_li><a href=""><Social_icons className="fa-brands fa-instagram"></Social_icons></a></Social_icons_container_li>
                    <Social_icons_container_li><a href=""><Social_icons className="fa-brands fa-twitter"></Social_icons></a></Social_icons_container_li>
                    <Social_icons_container_li><a href=""><Social_icons className="fa-brands fa-youtube"></Social_icons></a></Social_icons_container_li>
                </Social_icons_container>
            </footer>
        </Footer_section>
    </>
  )
}

export default Home
