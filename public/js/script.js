angular.module("RDash", [])
  .controller("mainController", function ($scope, $http)
  {
        
    $scope.submitData = function ()
    {
        console.log("In the submit data");
        var config = {
            params: {
                os: $scope.os,
                device: $scope.device,
                timeout: $scope.timeout
            }
        };
        
        $http.post("/execute_shell", null, config)
            .success(function (data, status, headers, config)
            {
              $scope[resultVarName] = data;
            })
            .error(function (data, status, headers, config)
            {
              $scope[resultVarName] = "SUBMIT ERROR";
        });
    };
  });