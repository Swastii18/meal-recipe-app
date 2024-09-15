import { Register } from "./Register"
import { Login } from "./Login"
import { useEffect } from "react"
import axios from 'axios'
import { useState } from "react"
import { SearchForm } from "./SearchForm"
export const Home = () => 
{
let [list,setList] = useState([])

    useEffect(()=>{axios.get(`http://www.themealdb.com/api/json/v1/1/random.php`).then((resp)=>{console.log(resp.data.meals); setList(resp.data.meals)}).catch(err=>{"aayena bro"})},[]);
   
    return<>
    <div>
    {list.map((item)=>{ 
        return<>

        <div className="box">
        <div className="name"> Name: {item.strMeal} <br />
        </div>
        <div className="row"> 
        <div className="col-7">
        <div className="img"><img src={item.strMealThumb} alt="invalid pic" /></div>
        </div>
        <div className="col-5">
            <h3 className="ingredients_heading"> Ingredients </h3>
        <div className="ingred"> {item.strInstructions}  </div>
          </div>
          </div>
          
    <div className="vids">
    <iframe width="710" height="415"
     src={item.strYoutube.replace("watch?v=","embed/")}
     title="YouTube video player" frameborder="0" 
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    </div>
        </>})}
    </div>
    
   

</>
    
   
}