angular
    .module('app')
    .controller('mainController', mainController);

    mainController.$inject = ['$scope', 'jsonReader'];

function mainController($scope, jsonReader) {
    var ctrl = this;
   
    ctrl.grid = [0,1,2,3,4,5,6,7,8,9];

    $scope.store = {};

    $scope.json_view = [];

    $scope.load_file = null;

    ctrl.dropCallback = (color, x, y) => {

        $scope.store[x + ':' + y] = color.join(',');

        $scope.$apply();
    };
   
    ctrl.reset = () => {
        let reset = confirm('Reset Drag and Drop items?');
        if(reset) {
            $scope.$emit('drag-n-drop-itmes-reset');
            $scope.store = {};

            $scope.json_view = [];
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

    $scope.$watch('store', store => convertToJsonView(store), true);

    function setTheGrid(data) {
        $scope.$emit('set-drop-items', data);
    };

    function convertToJsonView(store) {
        if(Object.keys($scope.store).length == 0) return;
        for(let key in store) {
            $scope.json_view.push({
                cell: key,
                color: store[key]
            });
        }
        console.log($scope.json_view);
    }

}