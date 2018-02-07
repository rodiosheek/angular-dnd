'use strict';

angular
    .module('app')
    .factory('jsonReader', jsonReaderFactory);

    jsonReaderFactory.$inject = ['$q', 'FileSaver', 'Blob'];

function jsonReaderFactory($q, FileSaver, Blob) {

    function get(load_file) {
        //Use angular $q, becouse read file is asynchronously 
        let defer = $q.defer();

        if(!load_file) defer.reject();

        //Basic protection from not json files
        let name = load_file.name.split('.');
        let extention = name[name.length - 1];
        
        if(extention !== 'json') {
            alert('Sorry, you load not .json file.');
            defer.reject();
        }
        //Use FileReader object form Web Api
        let reader = new FileReader();

        reader.readAsText(load_file, "UTF-8");

        reader.onload = function(evt) {
            defer.resolve(reader.result);
        }
        return defer.promise;
    }

    function save(data) {
        //Use angular-file-saver https://github.com/alferov/angular-file-saver
        var save_data = new Blob([data], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(save_data, 'drag-n-drop-itmes.json');
    }

    return {
        getJson: get,
        saveJson: save
    }
 }

