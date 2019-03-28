var ideaPoolApp = angular.module('ideaPoolApp',['ngRoute']);

ideaPoolApp.config(['$routeProvider',function($routeProvider){

    $routeProvider
    .when('/home',{
        templateUrl:'views/home.html',
        controller: 'HomeController'
    })
    .when('/admin',{
        templateUrl:'/views/admin.html',
        controller: 'AdminController'
    })
    .when('/error',{
        templateUrl: 'views/error.html'
    })
    .otherwise({
        redirectTo: '/error'
    })
}]);

ideaPoolApp.directive('ideaForm',[function(){

    return{
        restrict: 'E',
        $scope: {
            title:'='
        },
        templateUrl: 'views/newIdeaForm.html',
        transclude:true,
        replace: true,
        controller: function($scope){
            //controller code here
            $scope.existing = ["yes", "no", "NA"];
            $scope.areas = ["Business Value", "JDE", "Clouds", "NA"];
        }
    };

}]);

ideaPoolApp.directive('ideaDisplay',[function(){

    return{
        restrict: 'E',
        templateUrl: 'views/ideasDisplay.html',
        transclude:true,
        replace: true,
        controller: function($scope){
            //controller code here
        }
    };

}]);

ideaPoolApp.controller('AdminController',['$scope','$http',function($scope,$http){
    $http.get('data/ideas.json').then(function(response){
        $scope.ideas = response.data;
    });
}]);

ideaPoolApp.controller('HomeController',['$scope', '$http', function($scope,$http){
    
    $scope.addIdea = function(){
        $scope.ideas.push({
            id:($scope.ideas).length+1,
            title: $scope.newidea.title,
            existing: $scope.newidea.existing,
            area: $scope.newidea.area,
            category: $scope.newidea.category,
            ipType: $scope.newidea.ipType,
            ipStatus: $scope.newidea.ipStatus,
            keyValueAttribute: $scope.newidea.keyValueAttribute,
            description: $scope.newidea.description,
            createdBy: $scope.newidea.createdBy,
            rating: $scope.newidea.rating,
            itemType: $scope.newidea.itemType,
            path: $scope.newidea.path
        });

        $scope.newidea.title="";
        $scope.newidea.category="";
        $scope.newidea.ipType="";
        $scope.newidea.ipStatus="";
        $scope.newidea.keyValueAttribute="";
        $scope.newidea.description="";
        $scope.newidea.createdBy="";
        $scope.newidea.rating="";
        $scope.newidea.itemType="";
        $scope.newidea.path="";

    };

    $scope.removeAll = function(){
        $scope.ideas=[]
    }

    $http.get('data/ideas.json').then(function(response){
        $scope.ideas = response.data;
    });
}]);

