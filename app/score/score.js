/* global angular */
'use strict'
/**
 * @class ropescore.score
 * @memberOf ropescore
 * @requires ngRoute
 */
angular.module('ropescore.score', ['ngRoute'])

  .config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/score/:id/:uid/:event', {
        templateUrl: '/score/score.html',
        controller: 'ScoreCtrl'
      })
    }
  ])

  /**
   * @class ropescore.score.ScoreCtrl
   * @param {service} $scope
   * @param {service} $location
   * @param {service} $routeParams
   * @param {service} Db
   */
  .controller('ScoreCtrl', function ($scope, $location, $routeParams, Db, Abbr,
    Num, Config, Calc, Display) {
    $scope.data = Db.get()

    $scope.id = $routeParams.id
    $scope.uid = $routeParams.uid
    $scope.event = $routeParams.event
    $scope.MissJudges = Config.MissJudges
    $scope.setID($scope.id)

    $scope.Abbr = Abbr
    $scope.getNumber = Num
    $scope.roundTo = Math.roundTo
    $scope.freestyle = Calc.freestyle
    $scope.simplified = $scope.data[$scope.id].config.simplified
    $scope.Order = ($scope.simplified ? Config.SimplOrder || Config.Order : Config.Order)

    $scope.score = function () {
      if (typeof $scope.data[$scope.id].scores === 'undefined' || typeof $scope.data[$scope.id].scores[$scope.uid] === 'undefined') {
        return undefined
      }
      return Calc.score($scope.event, $scope.data[$scope.id].scores[$scope.uid][$scope.event], $scope.uid)
    }

    $scope.reskipAllowed = function () {
      if (typeof $scope.data[$scope.id].scores === 'undefined' || typeof $scope.data[$scope.id].scores[$scope.uid] === 'undefined' || typeof $scope.data[$scope.id].scores[$scope.uid][$scope.event] === 'undefined' || typeof $scope.data[$scope.id].scores[$scope.uid][$scope.event].s === 'undefined') {
        return undefined
      }
      var scores = Object.keys($scope.data[$scope.id].scores[$scope.uid][$scope.event].s).map(function (el) {
        return $scope.data[$scope.id].scores[$scope.uid][$scope.event].s[el]
      })
      var bools = []
      scores.sort(function (a, b) {
        return a - b
      })
      for (var i = 0; i < scores.length - 1; i++) {
        bools.push(scores[i + 1] - scores[i] > 3)
      }
      if (bools.length <= 0) {
        return false
      }
      var bool = bools.reduce(function (a, b) {
        return b && a
      })
      $scope.data[$scope.id].scores[$scope.uid][$scope.event].reskip = bool
      return bool
    }

    $scope.display = function (uid, id, event) {
      Db.set($scope.data)
      Display.display(uid, id, event)
      $scope.data = Db.get()
    }

    $scope.toMax = function (j, i, t) {
      var el = document.getElementById((j) + (i) + (t))
      var regEx = /[^\d.]+/gi

      var preVal = el.value.trim().replace(',', '.').replace(regEx, '')
      var val = Number(preVal)
      var max = Number(el.max.replace(',', '.'))

      $scope.data[$scope.id].scores[$scope.uid][$scope.event][j][i][t] = preVal

      if (typeof max !== 'undefined' && val > max) {
        $scope.data[$scope.id].scores[$scope.uid][$scope.event][j][i][t] = max
        el.classList.add('yellow')
        setTimeout(function () {
          el.classList.remove('yellow')
        }, 5000)
      }
    }

    $scope.clean = function (obj) {
      var scope = obj
      var keys = Object.keys(scope)

      for (var i = 0; i < keys.length; i++) {
        if (scope[keys[i]] !== null && typeof scope[keys[i]] === 'object') {
          scope[keys[i]] = $scope.clean(scope[keys[i]])
        }
        if (scope[keys[i]] === null || scope[keys[i]] === '' || typeof scope[keys[i]] === 'undefined' || (typeof scope[keys[i]] === 'object' && Object.keys(scope[keys[i]]).length === 0) || (typeof scope[keys[i]] === 'boolean' && scope[keys[i]] === false)) {
          delete scope[keys[i]]
        }
      }
      return scope
    }

    $scope.dnsSave = function (uid, id, event) {
      $scope.data[id].scores[uid][event] = {dns: true}
      $scope.save()
    }

    $scope.save = function () {
      $scope.data[$scope.id].scores = $scope.clean($scope.data[$scope.id].scores)
      if ($scope.data[$scope.id].scores !== null && typeof $scope.data[$scope.id].scores === 'object' && Object.keys($scope.data[$scope.id].scores).length === 0) {
        delete $scope.data[$scope.id].scores
      }
      Db.set($scope.data)
      $location.path('/event/' + $scope.id)
    }
  })
