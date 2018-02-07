angular
    .module('app')
    .controller('mainController', mainController);

    mainController.$inject = ['$scope'];

function mainController($scope) {
    var ctrl = this;
   
    ctrl.grid = [1,2,3,4,5,6,7,8,9,10];

    let store = [];

    let data_object = {
        x: 0,
        y: 0,
        color: ''
    };

    ctrl.dropCallback = (color, x, y) => {
        console.log(color, x, y);
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