angular
    .module('app')
    .controller('mainController', mainController);

    mainController.$inject = ['$scope', 'jsonReader'];

function mainController($scope, jsonReader) {
    var ctrl = this;
   
    ctrl.grid = [1,2,3,4,5,6,7,8,9,10];

    $scope.store = {};

    $scope.load_file = null;

    ctrl.dropCallback = (color, x, y) => {
        let data_object = {
            x: x,
            y: y,
            color: color.join(',')
        };
        $scope.store[x + ':' + y] = data_object;
        $scope.$apply();
    };
   
    ctrl.reset = () => {
        let reset = confirm('Reset Drag and Drop items?');
        if(reset) {
            $scope.$emit('drag-n-drop-itmes-reset');
            $scope.store = {};
        }
    };

    ctrl.save = () => {
        if(Object.keys($scope.store).length == 0) {
            alert('Nothing to save.');
            return;
        } 
        let data = JSON.stringify($scope.store);
      
        jsonReader.saveJson(data);
    };

    ctrl.load = ($file) => {
        jsonReader.getJson($file).then(
            data => {
                console.log(data);
                $scope.store = JSON.parse(data);
                setTheGrid($scope.store);
            },
            error => console.warn(error)
        );
    };


    function setTheGrid(data) {
        $scope.$emit('set-drop-items', data);
    };



}