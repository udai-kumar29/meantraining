app.controller('studentRegController', function ($scope, $state, $http, $stateParams) {
    console.log("studentRegController");
    var studentId = $stateParams.studentId;
    console.log("studentId", studentId);

    $scope.markDetails = [];

    $scope.standards = ("1 2 3").split(' ').map(function (standard) {
        return { abbrev: standard };
    });
    $scope.sections = ("a b c").split(' ').map(function (section) {
        return { abbrev: section };
    });
    $scope.exams = ["mid-term-1", "quaterly", "mid-term-2", "halfyearly", "mid-term-3", "annual"];

    $scope.newMark = function () {
        console.log("inside newitem");

        $scope.StudentData.markDetails.push({ 
            exams:'',
            tamil: '',
            english: '',
            maths: '',
            science: '',
            total: ''
        });
    }
    $scope.delete = function (index) {
        console.log("inside delete");
        $scope.StudentData.markDetails.splice(index, 1);

    }

    $scope.total = function (index) {
        var a, b, c, d;

        a = Number($scope.StudentData.markDetails[index].tamil);
        b = Number($scope.StudentData.markDetails[index].english);
        c = Number($scope.StudentData.markDetails[index].maths);
        d = Number($scope.StudentData.markDetails[index].science);

        $scope.StudentData.markDetails[index].total = (a + b + c + d);
        console.log($scope.StudentData.markDetails[index].total);
    };

    if (studentId != null) {
        $http.get('/getStudent/' + studentId).
            then(function successCallback(response) {
                var data = response.data;
                $scope.StudentData = data.student;
                if (!$scope.StudentData.markDetails) {
                    $scope.newMark();
                }
            })
    } else {
        $scope.StudentData = {};
        $scope.StudentData.markDetails = [];
        if (!$scope.StudentData.markDetails) {
            $scope.newMark();
        }
    }



    $scope.createStudent = function () {
        console.log('in create studentData');
        var postURL = '/createStudent';
        if (!!studentId) {
            postURL = '/updateStudent';
        }
        $http.post(postURL, $scope.StudentData)
            .then(function successCallback(response) {
                var data = response.data;
                $scope.StudentData = {};
                $scope.StudentData = data.student;
                console.log(data);
                $state.go('studentinfo');
            }), function errorCallback(error) {
                console.log('Error: ' + error.data);
            };
    }
    $scope.cancel = function () {
        $state.go('studentinfo');
    }


});





