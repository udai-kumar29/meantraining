app.controller('studentinfoController', function ($scope, $state, $http, $stateParams, $mdDialog) {
    var studentId = $stateParams.studentId;

    $scope.standards = ("1 2 3").split(' ').map(function (standard) {
        return { abbrev: standard };
    });
    $scope.sections = ("a b c").split(' ').map(function (section) {
        return { abbrev: section };
    });

    $scope.addNew = function () {
        $state.go('studentReg');
    }

    $scope.search = function () {
        console.log('search');
        $http.post('/search', $scope.studetails).
            then(function successCallback(response) {
                var data = response.data;
                $scope.StudentData = data.student;
                console.log(data);
                console.log($scope.StudentData);
            }, function errorCallback(error) {
                var data = error.data;
                console.log('Error' + data);

            });
    }
    $scope.search();
    $scope.clear = clear;

    function clear() {
        console.log(clear);
        $scope.studetails = {
            searchDetails: ''
        }
        $scope.StudentData = [];
    }


    $scope.deleteStudent = function (StuId) {
        console.log('remove controller');
        console.log(StuId);

        if (confirm("Delete Student Detail") == true) {
            $http.get('removeStudent/' + StuId).
                then(function successCallback(response) {
                    $scope.search();
                }, function errorCallback(errresponse) {
                    var data = errresponse.data;
                    console.log('Error' + data);

                });
        }
    }

    $scope.modify = function (stuid) {
        console.log("modify");
        console.log(studentId);
        $state.go('studentReg', { studentId: stuid });
        console.log("stuid", stuid);
        console.log("studentId", studentId);

    }

    $scope.show = function (stuid) {
        console.log("show");
        console.log(studentId);
        $state.go('show', { studentId: stuid });
        console.log("stuid", stuid);
        console.log("studentId", studentId);

    }

});