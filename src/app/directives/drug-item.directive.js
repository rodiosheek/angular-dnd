'use strict';

angular
    .module('app')
    .directive('drugItem', drugItemDirective);

drugItemDirective.$inject = ['$timeout', 'colorConverter'];

function drugItemDirective($timeout, colorConverter) {
    return {
        restrict: 'A',
        scope: {},
        link: ($scope, $element, $attrs) => {
            $attrs.$set('draggable', true);
            
            let background_color = colorConverter.findBackgroundColor($element);
    

            $element.on('dragstart', evet => {
                evet.dataTransfer.setData("text/plain", background_color.join(','));
            });
        }
    }
}