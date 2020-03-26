var socket = io('https://leptospirose.herokuapp.com/')

function enviarMensagem(){
	$("form button").click(function(){
		var mensagem = $("#mensagem").val()
		var nome = $("#nome").val()
		const object = {
		"msg": mensagem,
		"nome": nome
		}
		socket.emit('enviarMensagem', object)
		$("#mensagem").val("")
		rolarBaixo()
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
	rolarBaixo()
}

socket.on('receberMensagem', function(data){
	receberMensagem(data)

})

function rolarBaixo(){
	setTimeout(function(){ 
		$('#app').animate({
	    		scrollTop: $('#app')[0].scrollHeight}, "slow");
	}, 300);
}

function error(data){
	$(".erros").html("");
	$(".erros").html(`<div class="erro">
			${data}
		</div>`)
}