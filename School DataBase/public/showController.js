app.controller('showController', function ($scope, $state, $http, $stateParams) {
    console.log("showController");
    var studentId = $stateParams.studentId;
    console.log("studentId", studentId);
    $scope.standards = ("1 2 3").split(' ').map(function (standard) {
        return { abbrev: standard };
    });
    $scope.sections = ("a b c").split(' ').map(function (section) {
        return { abbrev: section };
    });
    $scope.exams = ["mid-term-1", "quaterly", "mid-term-2", "halfyearly", "mid-term-3", "annual"];

    if (studentId) {
        $http.get('/show/' + studentId).
            then(function successCallback(response) {
                var data = response.data;
                $scope.StudentData = data.student;
            }, function errorCallback(error) {
                var data = error.data;
                console.log('Error' + data);

            });
    }

    $scope.cancel = function () {
        $state.go('studentinfo');
    }
})