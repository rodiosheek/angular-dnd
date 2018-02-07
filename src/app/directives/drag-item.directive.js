'use strict';

angular
    .module('app')
    .directive('dragItem', dragItemDirective);

    dragItemDirective.$inject = ['$rootScope', 'colorConverter'];

function dragItemDirective($rootScope, colorConverter) {
    return {
        restrict: 'A',
        scope: {},
        link: ($scope, $element, $attrs) => {
            $attrs.$set('draggable', true);
            
            let background_color = colorConverter.findBackgroundColor($element);
            
            $element.on('dragstart', event => {
                event.dataTransfer.setData("text/plain", background_color.join(','));
            });

            $rootScope.$on('drag-itme-droped', (event, data) => {
                if(background_color.join(',') === data) {
                    $attrs.$set('draggable', false);
                    angular.element($element).addClass('drag-locked');
                } 
            });

            $rootScope.$on('drag-n-drop-itmes-reset', (event, data) => {
                $attrs.$set('draggable', true);
                angular.element($element).removeClass('drag-locked');
            });
        
        }
    }
}