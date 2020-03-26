var socket = io('http://localhost:8080')

function enviarMensagem(){
	$("form button").click(function(){
		var mensagem = $("#mensagem").val()
		var nome = $("#nome").val()
		const object = {
		"msg": mensagem,
		"nome": nome
		}
		socket.emit('enviarMensagem', object)
		return false
	})
}

enviarMensagem()

function receberMensagem(data){
	const msgHtml = `<div class="message">
			<span>${data.nome} - </span>
			<span>&nbsp;   ${data.msg}</span>
		</div> <br>`
	$(".after").before(msgHtml)
	$("#mensagem").val("")
}

socket.on('receberMensagem', function(data){
	receberMensagem(data)
})