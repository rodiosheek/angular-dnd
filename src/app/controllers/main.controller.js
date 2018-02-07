angular
    .module('app')
    .controller('mainController', mainController);

    mainController.$inject = ['$scope', 'FileSaver', 'Blob'];

function mainController($scope, FileSaver, Blob) {
    var ctrl = this;
   
    ctrl.grid = [1,2,3,4,5,6,7,8,9,10];

    $scope.store = {};

    ctrl.dropCallback = (color, x, y) => {
        let data_object = {
            x: x,
            y: y,
            color: color.join(',')
        };
        $scope.store[x + ':' + y] = data_object;
        $scope.$apply();
        console.log($scope.store);
    };
   
    ctrl.reset = () => {
        let reset = confirm('Reset Drag and Drop items?');
        if(reset) {
            $scope.$emit('drag-n-drop-itmes-reset');
            $scope.store = {};
        }
    };

    ctrl.save = () => {
        let data = JSON.stringify($scope.store);
        console.log(data);
        var save_data = new Blob([data], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(save_data, 'drag-n-drop-itmes.json');
    };

    ctrl.load = () => {};

}