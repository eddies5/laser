$(document).ready(function () {
	$('#donate_btn').click(function () {
		console.log('donate_btn clicked');
		console.log($('#donate_amnt').val());
		makeSocketConnection($('#donate_amnt').val());
	});

});

var makeSocketConnection = function (amnt) {
	var socket = io.connect('http://localhost');
	console.log('made socket connection');

	if (amnt == '') {
		amnt = 0;
	}

	socket.emit('amnt', {'amnt': amnt});

	$(document).keydown(function (eventObject) {
		switch(eventObject.which){
			case 38: socket.emit('up'); break;
			case 40: socket.emit('down'); break;
			case 39: socket.emit('right'); break;
			case 37: socket.emit('left'); break;
		}
	});

	socket.on('timeUp', function () {
		console.log('time up');
		socket.disconnect();
	});
};
