(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.lunches = "";
        $scope.messageCountLunch = "";
        $scope.spanInput="An empty item is NOT considered an item for counting. (Example: meat, ,potatoes, ,...)";

        $scope.countLunch = function () {
            const countLunch = $scope.lunches.split(',');
            const nonEmptyLunches = countLunch.filter(lunch => lunch.trim() !== "");
            const numberOfLunches = nonEmptyLunches.length;
            $scope.messageCountLunch =  messageByLength(numberOfLunches);
        }
    }

    function messageByLength(numberOfLunches) {
        switch (numberOfLunches) {
            case 0:
                return "Please enter data first";
            case 1:
            case 2:
            case 3:
                return "Enjoy!";
            default:
                return "Too much!";
        }
    }

})();
