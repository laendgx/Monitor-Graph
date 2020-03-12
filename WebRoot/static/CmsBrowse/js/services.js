(function(angular) {

	var services = angular.module('app.services', ['ngWebSocket']);

	services.factory('socket', [ '$rootScope', '$websocket', function($rootScope, $websocket) {
		var socketPath = "/Monitor-CollSvr";
		var WebSocketAddr = 'ws://127.0.0.1:8080'+ socketPath + "/webSocketServer.from";

		var ws = $websocket(WebSocketAddr);
		var ws = $websocket('ws://echo.websocket.org/');
		var collection = [];

		ws.onMessage(function(event) {
			console.log('message: ', event);
			var res;
			try {
				res = JSON.parse(event.data);
			} catch(e) {
				res = {'username': 'anonymous', 'message': event.data};
			}

			collection.push({
				username: res.username,
				content: res.message,
				timeStamp: event.timeStamp
			});
		});

		ws.onError(function(event) {
			console.log('connection Error', event);
		});

		ws.onClose(function(event) {
			console.log('connection closed', event);
		});

		ws.onOpen(function() {
			console.log('connection open');
			ws.send('Hello World');
			ws.send('again');
			ws.send('and again');
		});
		// setTimeout(function() {
		//   ws.close();
		// }, 500)

		return {
			collection: collection,
			status: function() {
				return ws.readyState;
			},
			send: function(message) {
				if (angular.isString(message)) {
					ws.send(message);
				} else if (angular.isObject(message)) {
					ws.send(JSON.stringify(message));
				}
			}
		}

	} ])
})(angular);