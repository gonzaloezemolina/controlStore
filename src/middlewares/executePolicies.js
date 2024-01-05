const executePolicies = (policies) => {
    return(req,res,next) => {
        console.log("Executing policies");
        console.log(req.user);
        if(policies[0]==="PUBLIC") return next();
        if(policies[0]==="NO_AUTH"&&!req.user) return next();
        if(policies[0]==="NO_AUTH"&&!req.user) return res.sendUnauthorized("Tu usuario ya se encuentra logueado")
        if(policies[0]==="AUTH"&&req.user) return next();
        if(policies[0]==="AUTH"&&!req.user) return res.sendUnauthorized("Tu usuario no esta logueado");
        
        if(!policies.includes(req.user.role.toUpperCase())){
            res.sendForbidden("Cant access")
        }
        next();
    }
}
export default executePolicies