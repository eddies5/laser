var connected = false;
var socket;
var keyHandler = function (eventObject) {
	switch(eventObject.which){
		case 38: socket.emit('up'); break;
		case 40: socket.emit('down'); break;
		case 39: socket.emit('right'); break;
		case 37: socket.emit('left'); break;
	}
};

$(document).ready(function () {
	$('#donate_btn').click(function () {
		console.log('donate_btn clicked');
		console.log($('#donate_amnt').val());
		makeSocketConnection($('#donate_amnt').val());
	});

});

<<<<<<< HEAD
var makeSocketConnection = function () {
	if (!connected){
		console.log("MAKING NEW CONNECTION IN CONTROL");
		socket = io.connect('http://localhost');
		console.log('made socket connection');
		connected = true;

	}

	socket.emit('requestControl');

	$(document).on("keydown", keyHandler);
=======
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
>>>>>>> 3242c34bb0be32424aea21ad67d30030838b6a86

	socket.on('timeUp', function () {
		console.log('time up');
		$(document).off("keydown", keyHandler);
	});
};