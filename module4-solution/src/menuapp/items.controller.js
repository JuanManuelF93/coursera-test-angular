(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['$stateParams', 'items'];
  function ItemsController($stateParams, items) {
    var itemDetail = this;
    itemDetail.menu_items = items.menu_items;
  }
})();