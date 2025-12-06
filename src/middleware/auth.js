 const adminAuth=(req,res,next)=>{
    const token="kksa";
    const isAdminAuthorized=token=="abc";
    if(!isAdminAuthorized){
        res.status(401).send("unauthorized access");
    }
    next();
}

module.exports = { adminAuth };