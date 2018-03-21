var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {

var refresh=function(){
	$http.get('/contactlist').then(function(response){
		console.log('data recived by angular',response);
		$scope.contactlist=response.data;
		$scope.contact=null;
	});
};

refresh();

$scope.addContacts= function(){
	
	console.log($scope.contact);
	$http.post('/contactlist',$scope.contact).then(function(response){
		console.log(response);
		refresh();
		console.log("@@@@@@@@@@@@@",$scope.contact);
	});

}

$scope.remove=function(id){
	console.log(id);
	$http.delete('/contactlist/'+id).then(function(response){
		refresh();
		$scope.isdisable=false;
	})
}

$scope.edit=function(id){

	$http.get('/contactlist/'+id).then(function(response){
		$scope.contact=response.data;
			console.log('angular@@@@@@@@@@@@@@@@@@@@@',response.data);
			$scope.isdisable=true;
			
	});
};

$scope.update=function(){
	console.log($scope.contact._id);
	$http.put('/contactlist/'+$scope.contact._id, $scope.contact).then(function(response){
		refresh();
		$scope.isdisable=false;
	})
}

$scope.deselect=function(){
	$scope.contact="";
	$scope.isdisable=false;
}

});