var app = angular.module('lmsApp');
app.factory('user', function($http) {
    return {
        get: function() {
            return $http.get('/server/user');
        },
        login: function(option) {
            return $http.post('/server/user/login', option);
        },
        logout: function() {
            return $http.get('/server/user/logout')
        }
    };
});
