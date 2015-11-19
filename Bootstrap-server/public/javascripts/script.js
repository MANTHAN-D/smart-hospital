angular.module("bootStrapServerApp", ['ngRoute', 'ngResource']) 
  .controller('home', ['$scope','$location', function ($scope,$location) {
        
    $scope.getBootstrapServer = function() {       
      $location.path('/bootstrapServer');
    }    
    
}])
.controller('bootstrapController', ['$scope','$location','$http','$window', function ($scope,$location,$http,$window) {

    $scope.bss={};

    $scope.goHome = function() {       
      $location.path('/');
    }
    
    $scope.clear = function() {       
      $scope.readFlag='false';
    }

    $scope.create = function() {  
       
      $http.post('/bootstrap_Server',{
        device_id : $scope.bss.device_id,
        priority : $scope.bss.priority,
        manufacturer : $scope.bss.manufacturer,
        model : $scope.bss.model,
        firmware : $scope.bss.firmware,
        serial : $scope.bss.serial
      }).
        success(function (data){             
              console.log("Create " + data);
              $scope.bss={};
              alert('Record created successfully');
        }).
        error(function(data,status){            
          console.log('Opps error',data);
        });
    }
    $scope.read = function() {      
      $http.get('/bootstrap_Server').
          success(function (data){                   
                $scope.bss_Resdata = data;
                $scope.readFlag='true';
          }).
          error(function(data,status){            
            console.log('Opps error',data);
          });          
    }
    $scope.update = function() {      
      
       angular.forEach($scope.bss_Resdata, function(rdata){
        if(rdata.Selected){               
          $http.put('/bootstrap_server',rdata).
          success(function (vdata){         
                console.log("Update success");
                $scope.read();
                alert('Updated successfully');                     
          }).
          error(function(data,status){            
            console.log('Opps error',data);
          });
        }
      });      
    }
    $scope.delete = function() {       
      
      angular.forEach($scope.bss_Resdata, function(rdata){
        if(rdata.Selected){               
          $http.delete('/bootstrap_server/'+rdata.object_id).
          success(function (vdata){         
                console.log("Delete success");
                $scope.read();
                alert('Deleted successfully');                            
          }).
          error(function(data,status){            
            console.log('Opps error',data);
          });
        }
      });     
    }
    
}])
.config(['$routeProvider',function($routeProvider){
  	$routeProvider
  	.when('/', {      
      templateUrl: '/home',
      controller: 'home'
    })    
    .when('/bootstrapServer', {
      templateUrl: '/bootstrapServer',
      controller: 'bootstrapController'
    });  	
  }]);