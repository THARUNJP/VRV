import "./Css/login.css"
import { useNavigate } from "react-router";
import { useRef } from "react";
import { userValidate } from "../service/service";


function Login(){
  const navigate = useNavigate()
  const userRef = useRef();
  const passRef = useRef();


  function handleSubmit(){
    const username = userRef.current.value;
    const password = passRef.current.value;
    if(username && password){
const isValid = userValidate(username,password);
if(isValid){
  
  const role_id=isValid.role_id;
  
  alert("login successfull");
  
  navigate('/userData',{state:{role_id}})
}
else{
  alert("username or password is wrong")
}

    }
    else{
      alert("enter Both fields")
    }
   


    

  }


    return (

      <div className="login-container">
      <div className="login-box">
        <div className="heading">
          <h3><b>Login</b></h3>
        </div>
        
          <div className="input-group">
            <label htmlFor="username" className="input-label">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              className="input-field"
             ref={userRef}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="input-field"
              ref={passRef}
            />
          </div>
          <button type="submit" className="login-btn" onClick={handleSubmit}>Login</button>
       
        <div className="extra-actions">
         
        </div>
      </div>
    </div>

          )
    

}

export default Login;