const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middlewares/auth_middleware")

// Rota publica = qualquer um pode acessar
router.get("/public", (req, res) => {
    res.json({message: "conteudo publico"});
});

//Rota protegida - precisa estar logado
router.get("/profile", authenticate, (req, res) =>  {
    res.json({user: req.user}); //req.user vem do middleware
});

//Rota admin - apenas role "admin"
router.delete("/users/:id", authenticate, authorize('admin'), (req, res) => {
    res.json({message: "usuário deletado"})
});