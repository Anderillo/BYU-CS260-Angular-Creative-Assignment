angular.module('javascript', [])
  .controller('mainCtrl', mainCtrl)
  .filter('html',function($sce){ return function(input) { return $sce.trustAsHtml(input); } })
  .directive('test', testDirective);
  
function createHeaderVars(args) {
  var header = '';
  for (var i = 0; i < args.length; i++) {
    header += '\nvar a' + (i + 1) + ' = ' + args[i] + ';';
  }
  header += '\n';
  return header;
}

function mainCtrl($scope, $sce) {
  $scope.moreQuestions = true;
  $scope.instructions = 'Instructions';
  $scope.xMark = ['red', '&#x2717;'];
  $scope.checkMark = ['green', '&#x2713;']
  $scope.canAdvance = false;
  $scope.problems = [{
    question:'Write a function that returns the value of a1 and a2 added together.\nExample: if a1 = 1 and a2 = 2, you should return 3.',
    header: 'function addition(var a1, var a2) {',
    footer: '}',
    tests: [{
        passed: $scope.xMark,
        argument: [1, 2],
        answer: 3
      },
      {
        passed: $scope.xMark,
        argument: [2, 3],
        answer: 5
      },
      {
        passed: $scope.xMark,
        argument: [10, 1000],
        answer: 1010
      },
      {
        passed: $scope.xMark,
        argument: [14, 27],
        answer: 41
      },
      {
        passed: $scope.xMark,
        argument: [42, 423452345],
        answer: 423452387
      }]
  },
  {
    question:'Write a function that returns the value of a1 and a2 multiplied together.\nExample: if a1 = 1 and a2 = 2, you should return 2.',
    header: 'function multiplication(var a1, var a2) {',
    footer: '}',
    tests: [{
        passed: $scope.xMark,
        argument: [1, 2],
        answer: 2
      }, 
      {
        passed: $scope.xMark,
        argument: [2, 3],
        answer: 6
      },
      {
        passed: $scope.xMark,
        argument: [10, 1000],
        answer: 10000
      },
      {
        passed: $scope.xMark,
        argument: [14, 27],
        answer: 378
      },
      {
        passed: $scope.xMark,
        argument: [42, 423452345],
        answer: 17784998490
      }]
  },
  {
    question:'Write a function that returns an array with every value between a1 and a2 (inclusive).\nExample: if a1 = 1 and a2 = 2, you should return the array [1,2]',
    header: 'function list(var a1, var a2) {',
    footer: '}',
    tests: [{
        passed: $scope.xMark,
        argument: [1, 2],
        answer: '1,2'
      }, 
      {
        passed: $scope.xMark,
        argument: [2, 3],
        answer: '2,3'
      },
      {
        passed: $scope.xMark,
        argument: [10, 10],
        answer: '10'
      },
      {
        passed: $scope.xMark,
        argument: [14, 27],
        answer: '14,15,16,17,18,19,20,21,22,23,24,25,26,27'
      },
      {
        passed: $scope.xMark,
        argument: [42, 50],
        answer: '42,43,44,45,46,47,48,49,50'
      }]
  }];
  $scope.currentIndex = 0;

  $scope.runCode = function() {
    var passedAllTests = true;
    for (var i_ = 0; i_ < $scope.problems[$scope.currentIndex].tests.length; i_++) {
      $scope.problems[$scope.currentIndex].tests[i_].passed = $scope.xMark;
      var code = createHeaderVars($scope.problems[$scope.currentIndex].tests[i_].argument) + $scope.javascriptForm.javascript;
      var userAnswer = eval('(function() {' + code + '}())');
<<<<<<< HEAD
      if (userAnswer !== $scope.problems[$scope.currentIndex].tests[i_].answer) passedAllTests = false;
      else $scope.problems[$scope.currentIndex].tests[i_].passed = $scope.checkMark;
=======
      if (userAnswer != $scope.problems[$scope.currentIndex].tests[i].answer) passedAllTests = false;
      else $scope.problems[$scope.currentIndex].tests[i].passed = $scope.checkMark;
>>>>>>> 54b183e243bf916f52687d39d80a3b0c838751cb
    }

    if (passedAllTests) {
      $scope.canAdvance = true;
    }
  }

  $scope.goToNextProblem = function() {
    $scope.canAdvance = false;
    $scope.currentIndex++;
    if ($scope.currentIndex >= $scope.problems.length) {
      $scope.moreQuestions = false;
      $scope.instructions = 'Good job, you completed all of the challenges!';
    }
    $scope.javascriptForm.javascript = '';
  }
}

function testDirective() {
  return {
    scope: {
      test: '='
    },
    restrict: 'E',
    replace: 'true',
    template: (
      '<div class="test" style="color: {{test.passed[0]}};" ng-bind-html="test.passed[1]|html"></div>'
    )
  };
}
