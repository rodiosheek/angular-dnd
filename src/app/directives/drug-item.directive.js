'use strict';

angular
    .module('app')
    .directive('drugItem', drugItemDirective);

drugItemDirective.$inject = ['$timeout'];

function drugItemDirective($timeout) {
    return {
        restrict: 'A',
        scope: {},
        link: ($scope, $element, $attrs) => {
            $attrs.$set('draggable', true);
            
            let style = window.getComputedStyle($element[0]).backgroundColor;
            let color = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(style);
            let background = [].concat(color[2], color[3], color[4]);
            console.log(background);
        }
    }
}