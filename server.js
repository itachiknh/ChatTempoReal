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
		if(data.nome == '' || data.nome.length <= 0 || data.nome == null || data.msg == '' || data.msg.length <= 0 || data.msg == null){
			socket.emit('error', 'Preencha o nome')
		} else{
			console.log(`${data.nome} ${data.msg}`)
			socket.broadcast.emit('receberMensagem', data) //Pra outras pessoas
			socket.emit('receberMensagem', data) //Eu
		}
	})
})

server.listen(porta)