var user = 
			{
			"lobbyId":1,
			"member":
					{
						"userId":4,					
						"username":"XBC",
						"account":2000
					}
		};
	var socket = io();
	function initialize(){
		socket.emit('initialData',user);
	}

	function placeBet(betVal){
        socket.emit('placeBet',betVal);
    };