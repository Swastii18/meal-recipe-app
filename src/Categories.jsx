import { useState } from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import axios from 'axios'
import {Link} from "react-router-dom"

export const Categories = () => {
    const params = useParams()
let [list,setList] = useState([])
console.log(params)

    useEffect(()=>{axios.get(`http://www.themealdb.com/api/json/v1/1/categories.php`).then((resp)=>{console.log(resp.data.categories); setList(resp.data.categories)}).catch(err=>{"aayena bro"})},[])

    return<>
    <div>
    {list.map((item)=>{
        return<>
        <div className="box">
        <Link to={'/search/name/'+item.strCategory}><div className="name"> Category: {item.strCategory}  </div></Link><br />
            
            <div className="row"> 
            <div className="col-7">
            <div className="img"><img src={item.strCategoryThumb} alt="invalid pic" /></div>
            </div>
            <div className="col-5">
                <h3 className="ingredients_heading"> Description </h3>
            <div className="ingred"> {item.strCategoryDescription}  </div>
              </div>
              </div>
              
       
        </div>
        </>
    })}
    </div>
    </>
    
}
