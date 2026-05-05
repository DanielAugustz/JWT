### JSON WEB TOKES - JWT

O QUE É O JWT?

É UM PADRÃO ABERTO DEFINIDO PELA RFC 7519 QUE PERMITE TRANSMITIR INFORMAÇÕES ENTRE DUAS PARTES DE FORMA SEGURA, COMPACTA E VERIFICÁVEL. É AMPLAMENTE UTILIZADO EM AUTENTICAÇÃO E TROCA DE INFORMAÇÕES POR API'S REST.

A IDEIA CENTRAL DELE: EM VEZ DE GUARDAR O ESTADO DA SESSÃO NO SERVIDPOR, O PRÓPRIO CLIENTE CARREGA UM TOKEN ASSINADO QUE PROVA A SUA IDENTIDADE(REQUISIÇÃO).

## PRA QUE USAR O JWT?

- LOGIN DE USUARIOS
- AUTORIZAÇÃO DE API
- MICROSERVIÇOS
- VERIFICAÇÃO DE EMAIL
- SSO / OUTH 2.0
- Reset de senha


JWT não é uma solução para tudo.
para sessões longas e complexas com a necessidade de invalidação imediade( bancos, sistemas críticos),  sessions com REDIS é mais adequado. jwt -> em API'S e microsserviços.

### Estrutura do JWT

- 1 -  Header
    Definir o tipo de token e o algoritmo de assinatura
- 2 - Payload
    Contém as informações do usuário e os seus metadados
- 3 - Signature
    Garante que o token não foi alterado durante a sessão

### Fluxo de autenticação com JWT

O ciclo completo de login ao acesso de recursos protegidos.

-Usuário faz o login.
    -> Envio de credenciais(email + senha) via POST para uma rota /auth/login.

- Servidor validar as credenciais passadas
    -> Buscar o usuário no banco de dados( relacional ou não), compara o hash de senha do bcrypt.

- Servidor gerar e retornar o token
    -> Localstorage gerar e retornar o token
    -> Assina o token como SECRET_KEY e definir a experação dessas secret(24h).

- Cliente armazena o token
    -> Localstorage guardar o nosso token ou HTTPOnly cookie( recomendado)

-Cliente envia o token nas requisições.
    Header:  Authprization: Bearer <token>

- Servidor vai validar o JWT 
    -> Middleware verifica a assinatura, expiracão e extrai as claims

-Acesso concedido ou Negado
    Se valido, retorna o recuso. se Inválido/Expirado, retorna 401/403

### ACESS TOKEN VS REFRESH TOKEN
Em sistemas reais, usamos dois tokens para balancear a seguranca e usabilidade.

### ACESS token
- vida curta: 15 min a 1 hora
- enviado em cada requisição
- se vazar, dano limitado

### Refresh Token
- Vida longa: 7 a 30 dias
- Usado só para renovar o acess.
- Armazenado com mais cuidado

### Rotas Protegidas, Middlewares e Segurança

## 1. Middleware

- O que é um middleware
no Express é qualquer função com assinatura (req, res, next). Ele fica entre a requisição que chega e o controller que responde. A cadeia de moddlewares executa em sequencia - cada um decide se passa para o peóximo chamando next() ou interrompe  a requisição respondendo diretamente.

// Requisição entra -> passa para cada middleware em ordem
Request -> [logger] -> [cors] -> [helmet] -> [rate-limt] -> [authenticate] -> [authorize] -> <controller> -> response

// cada middleware pode:

- 1. executar qualquer código.
- 2. modificar req e res;
- 3. Chamar Next() para continuar
- 4. Encerrar a cadeia respondendo diretamente

### Anatomia de um middleware
código no arquivo: <exemplo_middleware.js>

### tipos de middleware no Express

- 1. Global
Como registrar: <app.use(fn)>
Escopo: Todas as Rotas(<ex_middleware_global.js>)

- 2. Por prefixo.
Como registrar: <app.use('/api', fn)>
Escopo: Rotas que começam com o /api.

- 3. Por rota.
Como registrar: <router.get('/path', fn, controller)>
Escopo: somente nessa rota

- 4. De erro.
Como registrar: <app.use((err, req, res, next)=>{})>
igual ao código do <exemplo_middleware.js>, o segundo middleware


### Arquitetura de Rotas Seguras

Uma Api bem projetada separa claramente  rotas publicas de rotas protegidas, e dentro as protegidas, controla o acesso por prefil(role)

### Estrategia de Proteção em camadas
- 1. Rota publica: Sem autenticação
Exemplo: GET /produtos, POST /auth/login

- 2. Rotas Autenticada: Qualquer usuario logado
Exemplo: GET /perfil, PUT /preferencias.

- 3. Rota por role: Usuario logado + role especifico.
Exemplo: DELETE /usuario/:id apenas para admin.

- 4. Role de dono: Usuarios logado + deve ser dono do recurso.
Exemplo: PUT /posts/:id só quem criou o post pode editar.

### Mddleware de Auth
<exemplo_middleware_Auth.js>