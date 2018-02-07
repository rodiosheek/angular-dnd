angular
    .module('app')
    .controller('mainController', mainController);

    mainController.$inject = ['$scope'];

function mainController($scope) {
    var ctrl = this;
   
    ctrl.grid = [1,2,3,4,5,6,7,8,9,10];

    $scope.store = {};

    ctrl.dropCallback = (color, x, y) => {
        let data_object = {
            x: x,
            y: y,
            color: color
        };
        $scope.store[x + ':' + y] = data_object;
        $scope.$apply();
        console.log($scope.store);
    };
   
    ctrl.reset = () => {
        let reset = confirm('Reset Drag and Drop items?');
        if(reset) {
            $scope.$emit('drag-n-drop-itmes-reset');
            let store = [];
        }
    };

    ctrl.save = () => {};

    ctrl.load = () => {};

}