const jwt = requiere("jsonwebtoken");

//Middleware de autenticação
const authenticate = (req, res, next) =>{
    const authHeader = req.headers['authorization']
    if(!authHeader || authHeader.startsWith("Bearer")) {
        return res.status(401).json({message: "Token não encontrado"})
    }
    const token = authHeader.split(" ")[1];

    try{
        //verificar e decodificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Disponivel no controller
        next();
    } catch (error){
        if (error.name === "TokenExpiredError"){
            return res.status(401).json({message: "Token expirado"});
    }
    res.status(403).json({message: "Token invalido"});
    }
};

// Middleware de autorização por role
const authorize = (...role) => (req, res, next) => {
    if (!role.includes(req.user.role)){
        return res.status(403).json({
            message:"Acesso negado: Permissão insifuciente"
        })
    }
    next();
}

module.exports = {authenticate, authorize}
