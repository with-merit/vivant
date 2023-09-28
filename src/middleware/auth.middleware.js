const jwt = require("jsonwebtoken");

const isAdminAuthorized = (req,res, next)=>{
    const token = req.headers.authorization.split("").splice(7).join("");
    console.log(token);

        jwt.verify(token, "catherine", (err, decoded)=>{
            if(err){
                return res.send("user is not authorized")
            }
    
            console.log(decoded)
            
            if(decoded.role == "admin"){
                next()
            }
            if(decoded.role !== "admin"){
                return res.send("you are not authorized to perform this action")
            }
        })
    

}

module.exports = isAdminAuthorized;