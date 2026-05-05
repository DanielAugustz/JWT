//Formato Basico

const meuMiddleware = (req, res, next) =>{
    console.log(`[${new Date().toISOStrisg()}]${req.method} ${req.path}`)
    next();
}

//middleware de erro

const erroMiddleware = (err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).json({message: "Erro interno"});
}