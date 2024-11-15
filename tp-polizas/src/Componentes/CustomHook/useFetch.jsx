import { useEffect, useState } from "react";


export default function useFetch(url){
    const[data,setData]=useState();
    const[loading,setLoading]=useState(true);
    

    useEffect(()=>{
        const token = localStorage.getItem("token");

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            } })
        .then((response)=>response.json())
        .then((respuesta)=>setData(respuesta))
        .catch((e)=>console.log(e))
        .finally(()=>setLoading(false));
    },[url]);

    return {data,loading};
}
