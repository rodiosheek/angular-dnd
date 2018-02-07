'use strict';

angular
    .module('app')
    .directive('dropItem', dropItemDirective);

dropItemDirective.$inject = ['$parse', 'colorConverter', '$rootScope'];

function dropItemDirective($parse, colorConverter, $rootScope) {
    return {
        restrict: 'A',
        scope: {
            dropCallback: '&dropItem',
            dropItemCoords: '=dropItemCoords'
        },
        link: ($scope, $element, $attrs) => {
           
            //Drop item coordinate x:y
            let item_coords = $scope.dropItemCoords.x + ':' + $scope.dropItemCoords.y;

            //On 'dragenter' event add border to target grid cell
            $element.on('dragenter', event => {
                angular.element(event.target).addClass('drop-active');
            });
            //On 'dragleave' event remove border to target grid cell
            $element.on('dragleave', event => {
                angular.element(event.target).removeClass('drop-active');
            });
            //On 'dragover' event need to 'drop' event works
            $element.on('dragover', event => {
                event.preventDefault();
                event.stopPropagation();
            });
            //On 'drop' run drop event handler
            $element.on('drop', event => dropHandler(event));
            //Reset event from main controller, to reset background color
            $rootScope.$on('drag-n-drop-itmes-reset', (event, data) => {
                $element.css('background-color', null);
            });
            //Set event run when user loaded Json file
            $rootScope.$on('set-drop-items', (event, data) => {
                if(data[item_coords]) {
                    setBackground(data[item_coords]);
                }
            });
            //Drop event handler
            function dropHandler(event) {
                //Remove border from target element 
                angular.element(event.target).removeClass('drop-active');
                //Find onw background color of tagret element
                let own_color = colorConverter.findBackgroundColor($element);
                //Take data from draget element
                let drop_color = event.dataTransfer.getData('text');
                //Calculate new background color                
                let new_color = colorConverter.rgb(drop_color, own_color);
                            
                setBackground(new_color);
                //Run main controller callbakc
                $scope.dropCallback({color: new_color});
                //Emit event to locked drag element
                $rootScope.$emit('drag-itme-droped', drop_color);
            };
            //Set background color
            function setBackground(color) {
                $element.css('background-color', colorConverter.returnRgb(color));
            };
        }
    }
}