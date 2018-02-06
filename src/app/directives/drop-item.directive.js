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

            let background_color = colorConverter.findBackgroundColor($element);
            console.log('dropItemDirective', background_color);

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
                console.log('=-', $scope, $element);
                let background = event.dataTransfer.getData('text');
                console.log(background);
                $element.css('background-color', 'rgb(' + background + ')');
                $scope.dropCallback({data: background});
            });
        }
    }
}