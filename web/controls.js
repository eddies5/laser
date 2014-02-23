var connected = false;
var socket;
var keyHandler = function (eventObject) {
	eventObject.preventDefault();
	switch(eventObject.which){
		case 38: socket.emit('up'); break;
		case 40: socket.emit('down'); break;
		case 39: socket.emit('right'); break;
		case 37: socket.emit('left'); break;
	}
};

$(document).ready(function () {
	$('#donate_form').submit(function(e) {
		e.preventDefault();
		var don_amnt = $("input[type='radio']:checked", '#donate_form').val();
		console.log('donation of ' + don_amnt + ' submitted.');
		makeSocketConnection(don_amnt);

	});
});

var makeSocketConnection = function (don_amnt) {
	if (!connected){
		socket = io.connect('http://54.213.241.18');
		console.log('made socket connection');
		connected = true;
	}

	socket.emit('requestControl', {donationAmount : don_amnt});

	$(document).on("keydown", keyHandler);

	socket.on('timeUp', function () {
		console.log('time up');
		$(document).off("keydown", keyHandler);
	});
};