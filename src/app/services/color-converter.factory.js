'use strict';

'use strict';

angular
    .module('app')
    .factory('colorConverter', colorConverter);

colorConverter.$inject = ['$window'];

function colorConverter($window) {

    const MAX_COLOR_SIZE = 255;

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

    function rgb(new_color, old_color = null) {
        if(typeof new_color == 'string') {
            new_color = new_color.split(',').map(color => parseInt(color, 10));
        }
        if(!old_color) {
            return new_color;
        }
        let res = old_color.map((color, index) => __colculateColor(color, new_color[index]));
        return res;
    };  

    function returnRgb(color) {
        if(typeof color == 'string') {
            return 'rgb(' + color + ')';
        } 
        return 'rgb(' + color.join(',') + ')';
    };

    function __colculateColor(color, new_color) {
        let tmp = Math.floor((color + new_color) / 2);
        return tmp > MAX_COLOR_SIZE ? MAX_COLOR_SIZE : tmp;
    };

    return {
        findBackgroundColor: findBackgroundColor,
        rgb: rgb,
        returnRgb: returnRgb
    };
}