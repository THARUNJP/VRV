import { useEffect } from "react";
import { fetchAllData } from "../service/service";
import { useState } from "react";
import "./Css/read.css";
import { rolenameById } from "../service/service";
import { deleteUser } from "../service/service";
import { updateUserData } from "../service/service";
import { useLocation } from "react-router";
import { findAccessId } from "../service/service";
import { useNavigate } from "react-router";



function Read(){
  const navigate = useNavigate()
  const {state}= useLocation()
const [statData,setStat]=useState([])
  const [input,setInput]= useState("")
 const role_id= findAccessId(state.role_id) ;
const [role,setRole]= useState({
  read:null,
  edit:null,
  delete:null

})
const [updated,setUpdated] = useState({
  name:"",
  email:"",
  status:"",
  role:"",
})
    const [data,setData]= useState([])

    const[id,setId]= useState(null)

    useEffect(()=>{
   
      
      
setData(fetchAllData);
setStat(fetchAllData)

accessByRoleId();
    },[])



useEffect(()=>{

if(input !=""){ 
  
  const search= statData?.filter((e)=>e.name.toLowerCase().includes(input.toLocaleLowerCase()));

setData(search)
}
else{
  setData(fetchAllData)
}

},[input])








function accessByRoleId(){
  if(role_id){

    const roleNmae =rolenameById(role_id);

setRole(roleNmae)

  }

}

function deleteUserById(name,id) {
  const isConfirmed = window.confirm(`Are you sure you want to delete ${name}'s account?`);
  if (isConfirmed) {
const is_deleted = deleteUser(id);
  is_deleted ?? alert(`${name}'s account has not deleted.`)   
setData(fetchAllData)
  } 
}

function saveUpdatedData(e){  
setUpdated((prev)=>({
...prev,[e.target.name]:e.target.value
}))
}

function editPopulate(process,e){
if(process === "Edit"){
  setId(e.id)
  const populateData= {
    name:e.name,
    email:e.email,
    status:e.status,
    role:e.role_name
  }
setUpdated(populateData);
}
else{
  setId(null);
}



}

function updateUser(data,id){

const is_updated = updateUserData(data,id);

if(is_updated === true){
setId(null);
alert("the user has been updated")
} 
if(is_updated === false){
  alert("the user has not been updated")
}
if(is_updated === "notValidRole"){
  alert("enter valid role name");
}

}


    return(
      <div className="whole">
      <div className="headerContainer">
      { role.read && role.edit && role.delete ? <button className="backButton" onClick={()=>navigate('/addRole')}>Add Role</button>:null}
        <h1 style={{ textAlign: "center" }}>Search User</h1>
      </div>
      
      <div className="parentContainer">
        {/* Search Bar */}
        <div className="searchBar">
          <p className="glass">&#128269;</p>
          <input type="text" className="in" placeholder="Type here..."  onChange={(e)=>setInput(e.target.value)}/>
        </div>
      </div>
    
     
      <div className="tableContainer">
        <table className="taskTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>email</th>
              <th>status</th>
            {role.read && role.edit && role.delete ? <th>Role</th> : null }
              {role.edit || role.delete ?  <th>Actions</th>:null }
            </tr>
          </thead>
          <tbody>
              { data && data.length > 0 ? ( data.map((e, index) => (
              <tr key={index}>
              <td>{ id == e.id ? <input className="inEdit" defaultValue={e.name} onChange={(e) => saveUpdatedData(e)} name="name"></input> : <>{e.name}</>}</td>
              <td>{ id == e.id ? <input className="inEdit" defaultValue={e.email} onChange={(e) => saveUpdatedData(e)} name="email"></input> : <>{e.email}</>}</td>
              <td>{ id == e.id ? <input className="inEdit" defaultValue={e.status} onChange={(e) => saveUpdatedData(e)} name="status"></input> : <>{e.status}</>}</td>
            { role.read && role.edit && role.delete ? <td>{id === e.id ? <input className="inEdit" defaultValue={e.role_name} onChange={(e) => saveUpdatedData(e)} name="role" /> : <>{e.role_name}</>}</td>: null}

              {role.edit || role.delete ? (
              <td>
              {role.edit ? (<button className="editBtn" onClick={() => editPopulate(id != e.id ? "Edit":"Cancel",e)}>{id != e.id ? "Edit":"Cancel"}</button> ): null}
              {id == e.id ? <button className="editBtn" onClick={() => updateUser(updated, e.id)}>Save</button> : null}
              {role.delete ? <button className="deleteBtn" onClick={() => deleteUserById(e.name, e.id)}>Delete</button> : null}
              </td>
              ) : null}
              </tr>
              ))
              ) : (
              <tr><td style={{ textAlign: "center" }}>No match Found</td></tr>
              )}
          </tbody>
          
        </table>
      </div>
    </div>
    
    )




}


export default Read;