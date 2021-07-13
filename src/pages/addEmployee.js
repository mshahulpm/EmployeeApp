import React, {  useState } from 'react'
import {AddApi} from '../constants/constants'
import axios from 'axios'

function AddEmployee() {

    //userdata
    const [userData,setData] = useState({
    name:'',
    city:'',
    email:'',
    company:''
})
const [loading,setLoading] = useState(false)
// company and city list loading 
const [list,setList] = useState({
    city:[],
    company:[]
})

// loading nessosory datas
 async function loadData() {
    try {
      let cityData = await axios.get(
        "https://60ed67fba78dc700178adeb9.mockapi.io/floges/city"
      );
      cityData = cityData.data.map((dt) => dt.city_name);

      let companyData = await axios.get(
        " https://60ed67fba78dc700178adeb9.mockapi.io/floges/company"
      );
      companyData = companyData.data.map((dt) => dt.company);
      setList({ city: cityData, company: companyData });
    } catch (error) {
      console.log(error);
      alert("error occured when loading data");
    }
  }
  useEffect(() => {
    loadData();
  }, []);
 

const handleChange = e=>{
    const {name,value} = e.target 
    setData({...userData,[name]:value})
}

const addEmployee = ()=>{

    if(loading) return false
    const res = checkData(userData)
     if(res)return alert(res+' must be longer than 5 characters')
     setLoading(true)
     axios.post(AddApi,userData)
     .then(resp=>{
     setData({         name:'',         city:'',         email:'',         company:''
     })
     setLoading(false)
     alert('user added')
     }).catch(err=>{
         console.log(err);
         alert('some errors at server')
     })
     }

const checkData = (data)=>{
for(const key in data){
    console.log(key);
    if(data[key].length<3)return key

}
return false
}



    return (
        <div className='add-employee'>
            <h2>Add New Employee</h2>
          <input onChange={handleChange} placeholder='Name' name='name' type='text' value={userData.name} />
          <input list='city-name' onChange={handleChange} placeholder='City' name='city' type='text' value={userData.city} />
          <datalist id='city-name'>
             {list.city.map((ct,i)=>(
                 <option key={i}>{ct}</option>
             ))}
          </datalist>
          <input onChange={handleChange} placeholder='Email' name='email' type='email' value={userData.email} />
          <input list='company-name' onChange={handleChange} placeholder='Company' name='company' type='text' value={userData.company} />
          <datalist id='company-name'>
            {list.company.map((cp,i)=>(
                <option key={i}>{cp}</option>
            ))}
          </datalist>
          <button onClick={addEmployee}>{loading?'loading...':'Submit'}</button>
        </div>
    )
}

export default AddEmployee
