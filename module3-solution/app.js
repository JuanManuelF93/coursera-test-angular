(function () {
    'use-strict';
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems)
        .constant('url', "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json");

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var list = this;
        list.found = "";
        list.searchTerm = "";
        list.foundList = function () {
            MenuSearchService.getMatchedMenuItems(list.searchTerm).then(function (result) {
                list.found = result;
            });
        };

        list.removeItem = function (parentIndex, itemIndex) {
            console.log("list: ", list.found, "parentIndex: ", parentIndex, "itemIndex: ", itemIndex);
            list.found[parentIndex]['menu_items'].splice(itemIndex, 1);
        };

    }
    MenuSearchService.$inject = ['$http', 'url'];
    function MenuSearchService($http, url) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({ url: url })
                .then(function (result) {
                    var foundItems = result.data;
                    var filteredItems = {};
                    if (searchTerm.trim() !== "") {
                        // Iterar sobre cada clave en foundItems (A, B, C, ...)
                        angular.forEach(foundItems, function (categoryValue, categoryKey) {
                            // Crear una copia de la estructura de la categoría actual
                            var categoryCopy = angular.copy(categoryValue);

                            // Filtrar los menu_items de la categoría actual
                            categoryCopy.menu_items = categoryValue.menu_items.filter(function (item) {
                                // Verificar si el description contiene searchTerm usando includes
                                return item.description.toLowerCase().includes(searchTerm.toLowerCase());
                            });

                            // Agregar la categoría filtrada al objeto de elementos filtrados solo si tiene items después de filtrar
                            if (categoryCopy.menu_items.length > 0) {
                                // Usamos categoryKey como la clave en filteredItems
                                filteredItems[categoryKey] = categoryCopy;
                            }
                        });
                        foundItems = filteredItems;
                        return foundItems;
                    }
                    return foundItems;
                });
        };
    }

    function FoundItems() {
        var ddo = {
            templateUrl: 'foundList.html',
            scope: {
                found: '<',
                onRemove: '&'
            }
        };
        return ddo;
    }

})();