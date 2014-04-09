'use strict';

var app = angular.module('app', []);

app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.name = "";

	// $http.get('phones/phones.json').success(function(data) {
	// 	$scope.phones = data;
	// });

		$scope.fetch = function(name) {

			// console.log(name);


			$scope.data = {
				'name': name
				// 'age': 25
			};
			$http({
				method: 'post',
				cache: false,
				url: '/getData',
				data: $scope.data
			}).
			success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available

				// data = JSON.parse(data);

				console.log('======= data ===========');
				console.log(data);

				$('.data-container').empty();

				var html = '';

				html = '<h4>Name</h4>' + data.name +
				'<h4>age</h4>' + data.age +
				'<h4>telephone</h4>' + data.telephone 

				$('.data-container').append(html);
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				console.log('error');
			});
		};

		// $scope.fetch();
	}
]);