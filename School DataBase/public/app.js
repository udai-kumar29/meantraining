var app = angular.module('myapp', ["ui.router","ngMaterial"]);
app.config(function($stateProvider) {
    $stateProvider
       	 .state('studentinfo', {
            url: '/studentinfo',
            templateUrl: 'studentinfo.html',
            controller: 'studentinfoController',
            
        })
         .state('studentReg', {
            url: '/studentReg',
            templateUrl: 'studentReg.html',
           controller: 'studentRegController',
            params: { studentId: null }

        })
        .state('show', {
            url: '/show',
            templateUrl: 'show.html',
           controller: 'showController',
            params: { studentId: null }

        })

});
app.config(function ($mdInkRippleProvider) {
    $mdInkRippleProvider.disableInkRipple();
  });
app.config(['$qProvider', function ($qProvider) {
   $qProvider.errorOnUnhandledRejections(false);
}]);

        app.controller('main', function($scope, $state) {
    $scope.goStudent = function() {
        $state.go('studentinfo');
    }
   
})

