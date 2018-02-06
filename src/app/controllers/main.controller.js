angular
    .module('app')
    .controller('mainController', mainController);

    mainController.$inject = ['$scope'];

function mainController($scope) {
    var ctrl = this;
   
    ctrl.grid = [1,2,3,4,5,6,7,8,9,10];

}