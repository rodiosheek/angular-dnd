'use strict';

'use strict';

angular
    .module('app')
    .factory('colorConverter', colorConverter);

colorConverter.$inject = ['$window'];

function colorConverter($window) {
    function findBackgroundColor(element) {
        let color_array = null;

        let style = $window.getComputedStyle(element[0]).backgroundColor;
        let color = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(style);
        
        if(color) {
            color_array = [].concat(color[2], color[3], color[4]);
            color_array.map(parseFloat);
        }
        return color_array;
    }

    return {
        findBackgroundColor: findBackgroundColor
    }
}