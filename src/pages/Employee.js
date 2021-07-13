import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {GetEmployees} from '../constants/constants'

function Employee() {

    const [employeeList,setList] = useState([    ])
    const [data,setData] = useState({
        page:1,
        loading:false
    })

    useEffect(()=>{
      axios.get(GetEmployees+`page=${data.page}&limit=10`).then(res=>{
        setList(res.data)
      }).catch(e=>alert('cannot load employee list server error'))
    },[])
    
    // load more user data
  const loadMore = ()=>{
  if(data.loading) return false
      setData({...data,loading:true})
    axios.get(GetEmployees+`page=${data.page+1}&limit=10`).then(res=>{
        setList([...employeeList,...res.data])
        setData({page:data.page+1,loading:false})        
      }).catch(e=>alert('cannot load employee list server error'))  }
   
      return (
        <>
            <h2 className='center'>All Employees</h2>
        <div className='employeelist'>
            {employeeList.map((lst,i)=>(
                <Card 
                key={i}
                name={lst.name}
                city={lst.city}
                email={lst.email}
                company={lst.company}
                />
            ))}
        </div>
        <button onClick={loadMore} className='load-more'>{data.loading?'loading...':'Load more'}</button>
        </>
    )
}


// card component 
const Card = ({name,city,company,email})=>{
    return (
        <div className='card'>
           <h2>{name}</h2>
           <p>{city}</p>
           <p>{email}</p>
           <p>{company}</p>
        </div>
    )
}

export default Employee
