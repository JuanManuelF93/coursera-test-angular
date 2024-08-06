(function () {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$q', '$http'];
    function MenuDataService($q, $http) {
        var service = this;

        service.getAllCategories = function () {
            return $http.get('https://coursera-jhu-default-rtdb.firebaseio.com/categories.json')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log('Error retrieving categories:', error);
                    return $q.reject(error);
                });
        };

        service.getItemsForCategory = function (categoryShortName) {
            return $http.get('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/' + categoryShortName + '.json')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log('Error retrieving menu items:', error);
                    return $q.reject(error);
                });
        };

    }
})();
