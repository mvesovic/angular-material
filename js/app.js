var app = angular.module('myApp', ['ngMaterial', 'ngMessages'])
.config(($mdDateLocaleProvider) => {
    $mdDateLocaleProvider.formatDate = (date) => {
       return moment(date).format('DD-MM-YYYY');
    };
});