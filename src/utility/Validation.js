const validator=require('validator');

const validateSignUpData=(req)=>{
    const {firstName, lastName, emailId, password}= req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }

    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }

    else if(!validator.isStrongPassword(password)){
        throw  new Error("please enter a strong password ");
    }
    

};

const validateProfileEditData=(req)=>{
    const allowedEditFields= ["firstName", "lastName" ,"age" ,"about", "skills", "photourl"];

    const isAllowed=Object.keys(req.body).every((field)=>{
        return allowedEditFields.includes(field);
    })

    return isAllowed;

}

module.exports={
    validateSignUpData,
    validateProfileEditData,
}