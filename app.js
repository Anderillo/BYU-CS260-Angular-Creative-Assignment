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
    question:'Write a function that returns the sum of all numbers from a1 to a2, not including a2.\nYou can assume a1 < a2\nExample: if a1 = 2 and a2 = 7, you should return 2 + 3 + 4 + 5 + 6 or 20.',
    header: 'function sumBetween(var a1, var a2) {',
    footer: '}',
    tests:[{
        passed: $scope.xMark,
        argument: [2, 7],
        answer: 20
    },
    {
        passed: $scope.xMark,
        argument: [1, 2],
        answer: 1
    },
    {
        passed: $scope.xMark,
        argument: [10, 100],
        answer: 4905
    },
    {
        passed: $scope.xMark,
        argument: [-4, 2],
        answer: -9
    },
    {
        passed: $scope.xMark,
        argument: [4, 4000],
        answer: 7997994
    }]
  }];
  $scope.currentIndex = 0;

  $scope.runCode = function() {
    var passedAllTests = true;
    for (var i_ = 0; i_ < $scope.problems[$scope.currentIndex].tests.length; i_++) {
      $scope.problems[$scope.currentIndex].tests[i_].passed = $scope.xMark;
      var code = createHeaderVars($scope.problems[$scope.currentIndex].tests[i_].argument) + $scope.javascriptForm.javascript;
      var userAnswer = eval('(function() {' + code + '}())');
      if (userAnswer !== $scope.problems[$scope.currentIndex].tests[i_].answer) passedAllTests = false;
      else $scope.problems[$scope.currentIndex].tests[i_].passed = $scope.checkMark;
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
