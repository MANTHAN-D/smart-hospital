angular.module("clientApp", ['ngRoute', 'ngResource']) 
  .controller('home', ['$scope','$location', function ($scope,$location) {
    
    $scope.getClient = function() {       
      $location.path('/client');
    }

    $scope.bootStrapping = function() {
      $location.path('/bootStrapping'); 
    }

    $scope.registration = function() {
      $location.path('/registration'); 
    }

    $scope.dataTransmission = function() {
      $location.path('/dataTransmission'); 
    }
    
}])
  .controller('clientController', ['$scope','$location','$http','$window', function ($scope,$location,$http,$window) {    
    
    $scope.cfbs={};
    $scope.ccbs={};
    $scope.crc={};

    $scope.goHome = function() {       
      $location.path('/');
    }

    $scope.clear = function(resource) {       
      if(resource == 'factorybs')
        $scope.readFBS='false';
      if(resource == 'configbs')
        $scope.readCBS='false';
      if(resource == 'reportingconfig')
        $scope.readCRC='false';
    }

    $scope.create = function(resource) {  
       
      var postdata = {}; 
      if(resource == 'factorybs'){
        
        postdata = {
          server_uri : $scope.cfbs.server_uri,
          device_id : $scope.cfbs.device_id,        
          manufacturer : $scope.cfbs.manufacturer,
          model : $scope.cfbs.model,
          firmware : $scope.cfbs.firmware,
          serial : $scope.cfbs.serial
        };
      }
      else if(resource == 'configbs'){
        postdata = {
          server_uri : $scope.ccbs.server_uri,
          priority : $scope.ccbs.priority,          
          device_id : $scope.ccbs.device_id,        
          manufacturer : $scope.ccbs.manufacturer,
          model : $scope.ccbs.model,
          firmware : $scope.ccbs.firmware,
          serial : $scope.ccbs.serial
        };
      }
      else if(resource == 'reportingconfig'){
        postdata = {
          server_uri : $scope.crc.server_uri,
          frequency : $scope.crc.frequency,        
          parameter_name : $scope.crc.parameter_name,
          last_value : $scope.crc.last_value,
          disable : $scope.crc.disable
        };
      }
      else{
        // do nothing
      }

      $http.post('/client/'+resource,postdata).
        success(function (data){             
              console.log("Create " + data);
              $scope.cfbs={};
              $scope.ccbs={};
              $scope.crc={};
              alert('Record created successfully');
        }).
        error(function(data,status){            
          console.log('Opps error',data);
        });
    }

    $scope.read = function(resource) {      
      $http.get('/client/'+resource).
          success(function (data){                   
                
                if(resource == 'factorybs'){
                  $scope.cfbs_Resdata = data;
                  $scope.readFBS='true';
                }
                else if(resource == 'configbs'){
                  $scope.ccbs_Resdata = data;
                  $scope.readCBS='true';
                }
                else if(resource == 'reportingconfig'){
                  $scope.crc_Resdata = data;
                  $scope.readCRC='true';
                }
                else{
                  //do nothing
                }                
          }).
          error(function(data,status){            
            console.log('Opps error',data);
          });          
    }

    $scope.update = function(resource) {      
      
      if(resource == 'factorybs'){
        angular.forEach($scope.cfbs_Resdata, function(cfbsdata){
          if(cfbsdata.Selected){               
            $http.put('/client/'+resource,cfbsdata).
            success(function (vdata){         
                  console.log("Update success");
                  $scope.read(resource);
                  alert('Updated successfully');                     
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else if(resource == 'configbs'){
        angular.forEach($scope.ccbs_Resdata, function(ccbsdata){
          if(ccbsdata.Selected){               
            $http.put('/client/'+resource,ccbsdata).
            success(function (vdata){         
                  console.log("Update success");
                  $scope.read(resource);
                  alert('Updated successfully');                     
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else if(resource == 'reportingconfig'){
        angular.forEach($scope.crc_Resdata, function(crcdata){
          if(crcdata.Selected){               
            $http.put('/client/'+resource,crcdata).
            success(function (vdata){         
                  console.log("Update success");
                  $scope.read(resource);
                  alert('Updated successfully');                     
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else{
        //do nothing
      }
    }

    $scope.delete = function(resource) {       
      
      if(resource == 'factorybs'){
        angular.forEach($scope.cfbs_Resdata, function(cfbsdata){
          if(cfbsdata.Selected){               
            $http.delete('/client/'+resource+'/'+cfbsdata.object_id).
            success(function (vdata){         
                  console.log("Delete success");
                  $scope.read(resource);
                  alert('Deleted successfully');
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else if(resource == 'configbs'){
        angular.forEach($scope.ccbs_Resdata, function(ccbsdata){
          if(ccbsdata.Selected){               
            $http.delete('/client/'+resource+'/'+ccbsdata.object_id).
            success(function (vdata){         
                  console.log("Delete success");
                  $scope.read(resource);
                  alert('Deleted successfully');
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else if(resource == 'reportingconfig'){
        angular.forEach($scope.crc_Resdata, function(crcdata){
          if(crcdata.Selected){               
            $http.delete('/client/'+resource+'/'+crcdata.object_id).
            success(function (vdata){         
                  console.log("Delete success");
                  $scope.read(resource);
                  alert('Deleted successfully');
            }).
            error(function(data,status){            
              console.log('Opps error',data);
            });
          }
        });
      }
      else{
        //do nothing
      }     
    }
}])
.controller('operationController', ['$scope','$location','$http','$window','$interval', function ($scope,$location,$http,$window,$interval) { 

    $scope.goHome = function() {       
      $location.path('/');
    }

    $scope.transmit = function(){
      var log =[];
      var rmessage;
      var postdata={};
      var ccbs={};
      $scope.delay = 10;
      $scope.disable = 0;

      $scope.Timer = $interval(function () {
        console.log("sending data..")

        //delay = <db_query>
        //disable = <db_query>

        if($scope.disable == 0){

            $http.get('/client/configbs').
                success(function (ccbsdata){

                  $http.get('/client/reportingconfig').
                      success(function (data){                           
                          angular.forEach(data,function(record){
                            
                            record.last_value = Math.floor((Math.random() * 130) + 1);
                            $scope.delay = record.frequency;
                            $scope.disable = record.disable;
                            
                            $http.put('/client/reportingconfig',record);

                            postdata = {
                              device_id : ccbsdata[0].device_id,
                              parameter_name : record.parameter_name,          
                              value : record.last_value
                            };

                            $http.post(record.server_uri,postdata).
                              success(function (data){                        
                                  rmessage ='Data posted successfully';
                                  alert(rmessage);
                              }).
                              error(function(data,status){            
                                rmessage = 'Data sending failed';
                                alert(rmessage);
                              });

                              this.push(rmessage);
                          },log);                         
                      }).
                      error(function(data,status){            
                        console.log('Opps error',data);
                      });                
                }).
                error(function(ccbsdata,status){            
                  console.log('Opps error',ccbsdata);
                });
        }
        else{
          if (angular.isDefined($scope.Timer)) {
              console.log("Stopping transmission..")
              $interval.cancel($scope.Timer);
          }
        }
      }, $scope.delay*1000);
    }

    $scope.stoptransmit = function () {
        if (angular.isDefined($scope.Timer)) {
            console.log("Stopping transmission..")
            $interval.cancel($scope.Timer);
        }
      }

}])
.controller('registrationController', ['$scope','$location','$http','$window', function ($scope,$location,$http,$window) { 

    $scope.goHome = function() {       
      $location.path('/');
    }

    $scope.register = function(){      

      $http.get('/client/register').
          success(function (data){
            alert(data.status);
          }).
          error(function(data,status){            
              console.log('Opps error',data);
          });         
    }

    $scope.update = function(){      

      $http.get('/client/update').
          success(function (data){
            alert(data.status);
          }).
          error(function(data,status){            
              console.log('Opps error',data);
          });         
    }

    $scope.deregister = function(){      

      $http.get('/client/deregister').
          success(function (data){
            alert(data.status);
          }).
          error(function(data,status){            
              console.log('Opps error',data);
          });         
    }

}])
.controller('bootStrappingController', ['$scope','$location','$http','$window', function ($scope,$location,$http,$window) { 

    $scope.goHome = function() {       
      $location.path('/');
    }

    $scope.factoryDefaults = function(){      

      $http.get('/client/defaultbs').
          success(function (data){
            alert(data.status);
          }).
          error(function(data,status){            
              console.log('Opps error',data);
          });         
    }

    $scope.initiateBootstrap = function(){      

      $http.get('/client/initiatedbs').
          success(function (data){
            alert(data.status);
          }).
          error(function(data,status){            
              console.log('Opps error',data);
          });         
    }

}])
  .config(['$routeProvider',function($routeProvider){
  	$routeProvider
  	.when('/', {      
      templateUrl: '/home',
      controller: 'home'
    })
    .when('/client', {
  		templateUrl: '/client',
  		controller: 'clientController'
  	})
    .when('/dataTransmission', {
      templateUrl: '/dataTransmission',
      controller: 'operationController'
    })
    .when('/bootStrapping', {
      templateUrl: '/bootStrapping',
      controller: 'bootStrappingController'
    })
    .when('/registration', {
      templateUrl: '/registration',
      controller: 'registrationController'
    });
  }]);