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
            //Give responsobility to drag element
            $attrs.$set('draggable', true);
            //Find background color of draget element
            let background_color = colorConverter.findBackgroundColor($element);
            //On 'dragstart' event set data to transfere object 
            $element.on('dragstart', event => {
                event.dataTransfer.setData("text/plain", background_color.join(','));
            });
            //When drag element is droped make element locked
            $rootScope.$on('drag-itme-droped', (event, data) => {
                if(background_color.join(',') === data) {
                    $attrs.$set('draggable', false);
                    angular.element($element).addClass('drag-locked');
                } 
            });
            //Reset event from main controller, to reset locked elements
            $rootScope.$on('drag-n-drop-itmes-reset', (event, data) => {
                $attrs.$set('draggable', true);
                angular.element($element).removeClass('drag-locked');
            });
        
        }
    }
}