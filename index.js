const http = require('http');

const app = http.createServer((request,response)=>{
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end('servidor node iniciado')
})

const PORT = 3000
app.listen(PORT)
console.log('Servidor levantado en el puerto 3000')

