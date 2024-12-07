import { userData } from "../constant/constant";
import { permissionByRole } from "../constant/constant";
import { permission } from "../constant/constant";

export const fetchAllData = () => {
const validUser = userData.filter((e)=>{
if(e.is_active === 1){
    return e ;
}
})
return validUser;
};

export const rolenameById= (role_id) =>{
    let i =0;
   let res={};
 permission.filter((e)=>{
    
if(e.permis_id == role_id[i]){
    res[e.access_name] = true ;
}
else{
    res[e.access_name] = false;
}
i++;

})
return res;
}

export const deleteUser = (id) =>{

const index = userData.findIndex((e)=>e.id === id)


if(index != -1){
userData[index].is_active = 0;
return true;
}
else{
    false;
}

}

export const updateUserData = (data,id)=>{


if(data.name && data.email && data.status && data.role){
    const index = userData.findIndex((e)=>e.id === id);
    userData[index].name=data.name;
    userData[index].email=data.email;
    userData[index].status=data.status;
 const validRole = permissionByRole.find((e)=>e.role_name === data.role.toLowerCase() )  
 if(validRole){
    userData[index].role_name = data.role.toLowerCase();
    userData[index].role_id = validRole.role_id;
 }
 else{
    return "notValidRole"
 }
    

return true;

}
else{
    return false;
}


}


export const userValidate = (userName,password) =>{

const validUser= userData.find((e)=>e.email === userName && e.password === password)

if(validUser) return validUser;
else return false;

}


export const findAccessId = (role_id) =>{

let access=0; 
permissionByRole.find((e)=>{
    if(e.role_id === role_id){
access = e.access_id

    }
})


if(access){
    return access;
}
}

export const addRole = (role_name,access) =>{
const prevLength = permissionByRole.length
const newRole ={
    "role_id":permissionByRole.length,
    "role_name":role_name,
    "access_id":access
}

permissionByRole.push(newRole);

if(permissionByRole.length > prevLength){
    return true;
} 
else{
    return false;
}





}
