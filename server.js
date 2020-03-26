const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
const porta = process.env.PORT || 8080

app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)

app.use('/', (req, res) => {
	res.render('index.html')
})

io.on('connection', socket => {
	socket.on('enviarMensagem', data =>{
		socket.broadcast.emit('receberMensagem', data) //Pra outras pessoas
		socket.emit('receberMensagem', data) //Eu
	})
})

server.listen(porta)