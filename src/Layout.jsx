import "./style.css"
import * as bootstrap from 'bootstrap'
import { useEffect } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../services/firebase"
import { remove } from "../store/userSlice"
import { auth } from "../services/firebase"
import { set } from "../store/userSlice"
import { SearchForm } from "./SearchForm"



export const Layout = () =>
{
    let user = useSelector(state => state.user.value)

    const navigate = useNavigate()

const dispatch  = useDispatch()

    const logout = () => {
        logoutUser()
        .then(()=> {
            dispatch(remove())
            navigate('/login')
        })
        .catch(error => {})
    }

useEffect(() => {
    auth.onAuthStateChanged((user) =>{
        if(user) {
            dispatch(set(user.reloadUserInfo))
            console.log(user);
        }
    })
},[])

return <div className="container">
<header className="row">
<div className="row">

    <div className="row title">
        <h1><i className="fa-solid fa-bowl-rice">Wow Meal Recipe</i></h1>
        </div>
        <div className="col-auto my-3 ">
        <Link to="/" className="link">
            <h3> Home</h3>
        </Link>
        </div>

        <div className="col-auto my-3 ">
        <Link className="cate" to='categories'><h3> Categories</h3> </Link>

    </div>

    <div className="col">
        <ul class="nav justify-content-end">
            {
                Object.keys(user).length ? <>   

                 <li className="nav-item hover-item">
                 <span className=" text_ hover-item nav-link" >{user.email}</span>
                  </li>
                 <li className="nav-item hover-item">
                 <button className="text_ hover-item btn btn-link nav-link " onClick={logout} >Logout</button>
                  </li>
                </> : 
                <> 
                <li className="nav-item hover-item">
                <Link className="text_  text-decoration-none mx-3 py-2" to='login'> Login </Link>
                  </li>
                <li className="nav-item hover-item">
                <Link className="text_  text-decoration-none  mx-3 py-2" to='register'> Register </Link>
                  </li>
                  </>
            }
            <li className="nav-item">
                         <SearchForm/>    

                  </li>
            </ul>
          
        </div>
       
 </div> 
 
 </header>
    <Outlet/>
    
   
   

    <footer className="row text_ bg-footer py-3" >
            <div className="col-4">
                <div className="row">
                    <div className="col-12">
                        <h2>
                        <i className="fa-solid fa-pot-food"></i>Wow Meal
                        </h2>
                    </div>
                    <div className="col-12">
                        <strong>Email: </strong>
                        <a href="mailto:info@mealRecipeinfo.com" className="link-light text-decoration-none">info@wowMeal.com</a>
                    </div>
                </div>
            </div>
        
            <div className="col-4">
                <div className="row">
                    <div className="col-12">
                        <h3>Find us Here</h3>
                    </div>
                    <div className="col-12">
                        <a href="https://facebook.com/wowmeal" target="_blank" className="link-light">
                            <i className="fa-brands fa-facebook fa-2x"></i>
                        </a>
                        <a href="https://twitter.com/wowmeal" target="_blank" className="link-light ms-2">
                            <i className="fa-brands fa-twitter fa-2x"></i>
                        </a>
                        <a href="https://instagram.com/wowmeal" target="_blank" className="link-light ms-2">
                            <i className="fa-brands fa-instagram fa-2x"></i>
                        </a>
                        <a href="https://youtube.com/wowmeal" target="_blank" className="link-light ms-2">
                            <i className="fa-brands fa-youtube fa-2x"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="col-4">
                <div className="row">
                    <div className="co-12">
                        <h3>Subscribe to our Channel</h3>
                    </div>
                    <div className="col-12">
                        <div className="input-group">
                            <input type="email" className="form-control" placeholder="Enter email here"/>
                            <button className="btn btn-outline-light">
                                <i className="fa-solid fa-send"></i>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 my-3 text-center">
                &copy;Wow Meal,2023.All rights reserved.
            </div>
        </footer>
    </div>
}