### Json Web Token - JWT
O que é JWT ?

É um padrão aberto defindo pela RFC 7519 que perminite transmitir informação entre duas partes de forma segura, compacta e verificavel .É amplamente ultilizado em autenticação e troca de informações por API's rests 


Ideia cental: em vez de guarda o estado da seção no servidor o propio cliente carrega um token assinado que prova a sua identidade (requisição).

### Pra que usar o JWT? 
- Login de usuario
- Autorização de API
- Microserviços
- Verficação de E-mail
- SSO / Outh2.0
- Reset de senha


JWT não e uma solução pra tudo.
Para sessoes longas e complexas com a necessidade de invalidação imediata(bancos, sistemas criticos), session com REDIS é mais adequado. JWT -> em API's e Microserviços

### Estrutura JWT
- 1 - Header
   DDefinir o tipo de token eo algoritimo de assinatura 
- 2 - Payload
    Contem as infromações do usuario e seus metadados
- 3 - Signature
    Garente que o token não foi alterado durante a sessão

### Fluxo de autenticação com JWT
    O ciclo completo de login ao acesso de recursos protegidos

- Usuario faz login.
    -> Envio de credencias(e-mail + senha) via POST para /auth/login.
- Sevidor vai validar das credencias passadas
    -> Buscar o Usuario no banco de dados(relacional ou não relacional), compara o hash de senha do bcrypt.
- Sevidor gerar e retornar o token
    -> Assinar o token como SECRET_KEY e definir a expiração dessa secret(24h)
- Cliente vai armazenar
    -> Localstorage guardar o nosso token ou HTTPOnly cookie (recomendado).
- Cliente envia o token das requisições
    -> Header:Authorization: Bearer <token>
- Servidor vai validar o JWT
    -> Middleware verifica a assinatura, expiração e extrai as claims.
- Acesso concedido ou negado
    -> Se valido, retorna o recuso. Se invalido/Expirado, retorno ou 401/403

#### Access Token vs Refresh Token
Em sistemas reais usamos dois para balancear a segurança e a usabilidade

### Access token
- Vida curta: 15min a 1 hora
- Enviado a cada requisição
- Se vazar, dano limitado

### Refresh token
- Vida longa: 1 a 30 dias
- Usado para renovar o Access
- Armazenado com mais cuidado

