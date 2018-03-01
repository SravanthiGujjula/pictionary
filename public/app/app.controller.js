console.log('hi');
angular.module('app',[])
.component('applet',{
    templateUrl: './app/app.html',
    controller: appController
})
// .controller('name',function($scope){

// })

function appController($scope){
    $scope.message = 'Hey';
}