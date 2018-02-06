'use strict';

angular
    .module('app')
    .directive('dropItem', dropItemDirective);

dropItemDirective.$inject = ['$timeout'];

function dropItemDirective($timeout) {
    return {
        restrict: 'A',
        scope: {},
        link: ($scope, $element, $attrs) => {
            
            let style = window.getComputedStyle($element[0]).backgroundColor;
            let color = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(style);
            // let background = [].concat(color[2], color[3], color[4]);
            // console.log(background);
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
                 
                console.log('drop', event.dataTransfer.getData('text'));
                let background = event.dataTransfer.getData('text');
                console.log(background);
                $element.css('background-color', 'rgb(' + background + ')');

            });
        }
    }
}