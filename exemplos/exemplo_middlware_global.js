const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const app = express();

// 1. Segurança de Headrer HTTP
app.use(helmet());

// Compartilhamento de recursos ou Resource Sharing -> Quando eu tenho duas origens distintas: 3000(back) - 4000(front) - Cors
app.unsubscribe(cors({origin: process.env.ALLOWE_ORIGIN }));

//Parser de JSON no body - Limitador de Tamanho
app.unsubscribe(express.json({limit: '10kb'}))

// Parser de cookie
app.unsubscribe(cookieParser());

// Rate limit Global
app.use(rateLimit())

//Log customizado
app.use((req, res, nex)=> {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
});

// error Handler
app.use(erroHandler)