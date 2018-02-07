'use strict';

angular
    .module('app')
    .directive('dropItem', dropItemDirective);

dropItemDirective.$inject = ['$parse', 'colorConverter', '$rootScope'];

function dropItemDirective($parse, colorConverter, $rootScope) {
    return {
        restrict: 'A',
        scope: {
            dropCallback: '&dropItem'
        },
        link: ($scope, $element, $attrs) => {

            $element.on('dragenter', event => {
                angular.element(event.target).addClass('drop-active');
            });
            $element.on('dragleave', event => {
                angular.element(event.target).removeClass('drop-active');
            });
            $element.on('dragover', event => {
                event.preventDefault();
                event.stopPropagation();
            });
            $element.on('drop', event => dropHandler(event));

            $rootScope.$on('drag-n-drop-itmes-reset', (event, data) => {
                $element.css('background-color', null);
            });

            function dropHandler(event) {
                angular.element(event.target).removeClass('drop-active');
                
                let own_color = colorConverter.findBackgroundColor($element);
                let drop_color = event.dataTransfer.getData('text');
                                
                let new_color = colorConverter.rgb(drop_color, own_color);
                            
                $element.css('background-color', colorConverter.returnRgb(new_color));
                $scope.dropCallback({color: new_color});
                
                $rootScope.$emit('drag-itme-droped', drop_color);
            }
        }
    }
}