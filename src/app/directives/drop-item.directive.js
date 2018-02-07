'use strict';

angular
    .module('app')
    .directive('dropItem', dropItemDirective);

dropItemDirective.$inject = ['$parse', 'colorConverter'];

function dropItemDirective($parse, colorConverter) {
    return {
        restrict: 'A',
        scope: {
            dropCallback: '&dropItem'
        },
        link: ($scope, $element, $attrs) => {

            $element.on('dragenter', evet => {
                angular.element(event.target).addClass('drop-active');
            });
            $element.on('dragleave', evet => {
                angular.element(event.target).removeClass('drop-active');
            });
            $element.on('dragover', evet => {
                event.preventDefault();
                event.stopPropagation();
            });
            $element.on('drop', evet => {
                let own_color = colorConverter.findBackgroundColor($element);
                let drop_color = event.dataTransfer.getData('text');
                
                let new_color = colorConverter.rgb(drop_color, own_color);
            
                $element.css('background-color', colorConverter.returnRgb(new_color));
                $scope.dropCallback({data: new_color});
            });
        }
    }
}