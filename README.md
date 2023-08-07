# voucher-system
A system that will generate voucher for user.

Config preparation:
```javascript
go to 'src'
change file '.envsampe' to '.env'
```

Database preparation:
```javascript

go to 'src/migarations' folder
open 'preparation.sql' file
copy 
paste to your DBMS
run it
```

How to install and run system:
```javascript
cd src
npm install
npm run serve
```

Data preparation:
```javascript
run 'npm test'
```

How to run the API Doc:
```javascript
go to 'http://127.0.0.1:3030/docs'
```

List of Depedencies:
```javascript
    "@fastify/autoload",
    "@fastify/formbody",
    "@fastify/multipart",
    "@fastify/static",
    "@fastify/swagger",
    "@fastify/swagger-ui",
    "@fastify/cors",
    "@fastify/view",
    "fastify-plugin",
    "dotenv",
    "ejs",
    "fastify",
    "fastify-cli",
    "fastify-swagger",
    "jest",
    "mysql-promise",
    "promise-mysql",
    "mysql2"
```