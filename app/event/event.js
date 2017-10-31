/* global angular */
'use strict'
/**
 * @class ropescore.event
 * @memberOf ropescore
 * @requires ngRoute
 */
angular.module('ropescore.event', ['ngRoute'])

  .config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/event/:id', {
        templateUrl: '/event/event.html',
        controller: 'EventCtrl'
      })
    }
  ])

  /**
   * @class ropescore.event.EventCtrl
   * @param {service} $scope
   * @param {service} $location
   * @param {service} $routeParams
   * @param {service} Db
   */
  .controller('EventCtrl', function ($scope, $location, $routeParams, Db, Abbr,
    Checksum, Config) {
    $scope.data = Db.get()

    $scope.id = $routeParams.id
    $scope.setID($scope.id)
    $scope.Abbr = Abbr

    $scope.events = Abbr.events()

    $scope.checksum = Checksum
    /**
     * checksum of nothing, used to find out ewhen there is no data
     * @type {String}
     */
    $scope.blankChk = $scope.checksum()

    /**
     * marks a category as complete
     * @return {undefined}
     */
    $scope.complete = function () {
      $scope.data[$scope.id].config.completed = !$scope.data[$scope.id].config.completed
      Db.set($scope.data)
    }
  })
