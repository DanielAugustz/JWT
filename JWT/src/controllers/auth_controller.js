const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Simular um banco de dados
const users = [
    {
        id: "user_1",
        email: "daniel@gmail.com",
        //hash de: senha123
        password: "$2a$10$xvqtBdw...",
        role: "admin"
    }
]

const login = async(req, res) =>{
    try{
        const {email, password} = req.body;

        //1 encontrar usuario
        const user = users.find((u)=> u.email === email);
        if (!user){
            return res.status(401).json({message: "Credencias Invalidas"})
        }
        //2 Verificar senha com dcrypt
        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid){
            return res.status(401).json({message: "Credencias Invalidas"})
        }
        //3 Gerar o JWT
        const payload = {
            sub:user.id,
            email: user.email,
            role: user.role,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        //4 reotnar o token jwt
        res.status(200).json({
            message: "Login realizado com sucesso",
            token,
            user: {id: user.id, email: user.email, role: user.role},
        })
    } catch(error){
        res.status(500).json({message: "Erro Interno"});
    }
};