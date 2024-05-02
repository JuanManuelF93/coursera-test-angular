(function () {
    'use-strict';
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var tobuyctrl = this;
        tobuyctrl.tobuylistRef = ShoppingListCheckOffService.tobuylist;

        tobuyctrl.removeItemBuy = function name(itemIndex) {
            ShoppingListCheckOffService.removeItem(itemIndex);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var readyboughtctrl = this;
        readyboughtctrl.readyboughtlistRef = ShoppingListCheckOffService.readyboughtlist;
    }

    function ShoppingListCheckOffService() {
        var service = this;

        service.tobuylist = [{
            name: "Milk",
            quantity: 2
        },
        {
            name: "Donuts",
            quantity: 200
        },
        {
            name: "Eggs",
            quantity: 25
        },
        {
            name: "Cookies",
            quantity: 300
        },
        {
            name: "Chocolate",
            quantity: 5
        }]

        service.readyboughtlist = [];

        service.addItem = function (itemIndex) {
            service.readyboughtlist.push(service.tobuylist[itemIndex]);
        }

        service.removeItem = function (itemIndex) {
            service.addItem(itemIndex);
            service.tobuylist.splice(itemIndex, 1);
        }
    }
})();