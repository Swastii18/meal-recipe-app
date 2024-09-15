import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const PrivateRoutes=({children})=>{
    const user=useSelector(state=>state.user.value)
    
    const navigate=useNavigate()

    useEffect(()=>{
        if(Object.keys(user).length == 0){
            console.log(user);
            navigate('/login')
        }
    },[])
    return children
}