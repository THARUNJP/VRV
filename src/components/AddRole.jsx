import "./Css/addRole.css"
import { useRef } from "react";
import { useNavigate } from "react-router";
import { permission } from "../constant/constant";
import { useState } from "react";
import { addRole } from "../service/service";


function AddRole(){

const navigate = useNavigate()
const [access,setAccess]=useState([])
const roleRef= useRef()
    function handleRoleSubmit(){
const roleName = roleRef.current.value;
        if(roleName && access.length > 0){
         const isAdded =  addRole(roleName,access)

         if(isAdded) {

            alert("role added successful")
            roleRef.current.value = ""
            const check = document.querySelectorAll('.checkBox')
    check.forEach((e)=>{
        e.checked = false
         }
        )
        setAccess([])
         } 
         else{
            alert("role is not added try again later")
         } 

        }
        else{
          alert("You didnt selected any of the role yet.")
        }


    }
    function CancelFunction(){

        const confirm = window.confirm("are you sure you want to cancel this role")


        if(confirm) window.history.back()
          {/* You might wonder why i used  window.history.back() instead useNvaigate beacuse history.back method preserves the 
  useLocation object */}
    
    }

    function idPush(e){
        const value=e.target.value

     if(e.target.checked){
       setAccess((prev)=>[...prev,value])
     } 
     else{
    setAccess((prev)=>prev.filter((e)=> e !== value))
     }
       

    }
   
   
    

    return(
        <>
  <div className="add-role-form">
    <h3>Add Role</h3>
    <div>
      <label htmlFor="roleName">Role Name:</label>
      <input type="text" className="inputRole" id="roleName" ref={roleRef}/>
    </div>

    <div>
      <h4>Permissions:</h4>

      {permission.map((e,index)=>(
   <label key={index}>
<input type="checkbox" className="checkBox" value={e.permis_id} onClick={(e)=>idPush(e)} />
{e.access_name}
</label>
      ))
      }
      
    </div>

    <div className="form-actions">
  <button onClick={() => window.history.back()} className="back-button">Back</button> 
  {/* You might wonder why i used  window.history.back() instead useNvaigate beacuse history.back method preserves the 
  useLocation object */}
  <button onClick={handleRoleSubmit} className="save-button">Save</button>
  <button onClick={CancelFunction} className="cancel-button">Cancel</button>
</div>
  </div>

 </>   
  )


}

export default AddRole;