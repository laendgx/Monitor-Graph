(function(angular) {

	var services = angular.module('app.comservices', []);

	services
	.factory('https', ['$http', function($http){
        return {
            request: function(url, type, urlData, data, successFn, successData, errorFn, errorData){
                $http({
                    method: type,
                    url: basepath + url + '?ran=' + Math.random() + urlData,
                    data: data,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                })
                .then(function(resp){
                    if(successFn && successFn != null){
                        resp.successData = successData;
                        successFn(resp);
                    }
                }, function(resp){
                    if(errorFn && errorFn != null){
                        resp.errorData = errorData;
                        errorFn(resp);
                    }
                });
            },
            oldrepuest: function(url, data, successFn, successData, errorFn, errorData){
                $http({
                    method: 'POST',
                    url: basepath + url + '?ran=' + Math.random(),
                    data: data,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }  
                })
                .then(function(resp){
                    if(successFn && successFn != null){
                        resp.successData = successData;
                        successFn(resp);
                    }
                }, function(resp){
                    if(errorFn && errorFn != null){
                        resp.errorData = errorData;
                        errorFn(resp);
                    }
                });
            }
        }
    }])
})(angular);