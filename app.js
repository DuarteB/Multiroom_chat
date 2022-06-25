const app = require('./config/server');
const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port} \n http://localhost:${port}`);
})

const io =  require('socket.io').listen(server);

app.set('io', io);

io.on('connection', (socket) => {
    console.log('Usuário conectou');

    socket.on('disconnect', (socket) => {
        console.log('Usuário desconectou');
    })

    socket.on('msgParaServidor', (data) => {

        // dialogo
        socket.emit('msgParaCliente', {
            apelido: data.apelido,
            mensagem: data.mensagem
        })
        socket.broadcast.emit('msgParaCliente', {
            apelido: data.apelido,
            mensagem: data.mensagem
        })

        // participantes
        if(parseInt(data.apelido_status) == 0) {
            socket.emit('participantesParaCliente', {
                apelido: data.apelido
            })
            socket.broadcast.emit('participantesParaCliente', {
                apelido: data.apelido
            })
        }
    })
})