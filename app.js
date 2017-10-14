angular.module('javascript', [])
  .controller('mainCtrl', mainCtrl)
  .directive('test', testDirective);
  
function createHeaderVars(args) {
  var header = '';
  for (var i = 0; i < args.length; i++) {
    header += '\nvar a' + (i + 1) + ' = ' + args[i] + ';';
  }
  header += '\n';
  return header;
}

function mainCtrl($scope) {
  $scope.moreQuestions = true;
  $scope.instructions = 'Instructions';
  $scope.problems = [{
    question:'Write a function that returns the value of a1 and a2 added together.',
    header: 'function addition(var a1, var a2) {',
    footer: '}',
    tests: [{
        passed: 'red',
        argument: [1, 2],
        answer: 3
      },
      {
        passed: 'red',
        argument: [2, 3],
        answer: 5
    }]
  },
  {
    question:'Write a function that returns the value of a1 and a2 multiplied together.',
    header: 'function multiplication(var a1, var a2) {',
    footer: '}',
    tests: [{
        passed: 'red',
        argument: [1, 2],
        answer: 2
      }, 
      {
        passed: 'red',
        argument: [2, 3],
        answer: 6
    }]
  }];
  $scope.currentIndex = 0;

  $scope.runCode = function() {
    var passedAllTests = true;
    for (var i = 0; i < $scope.problems[$scope.currentIndex].tests.length; i++) {
      $scope.problems[$scope.currentIndex].tests[i].passed = 'red';
      var code = createHeaderVars($scope.problems[$scope.currentIndex].tests[i].argument) + $scope.javascriptForm.javascript;
      var userAnswer = eval('(function() {' + code + '}())');
      if (userAnswer !== $scope.problems[$scope.currentIndex].tests[i].answer) passedAllTests = false;
      else $scope.problems[$scope.currentIndex].tests[i].passed = 'green';
    }

    if (passedAllTests) {
      $scope.currentIndex++;
      if ($scope.currentIndex >= $scope.problems.length) {
        $scope.moreQuestions = false;
        $scope.instructions = 'Good job, you completed all of the challenges!';
      }
      $scope.javascriptForm.javascript = '';
    }
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
      '<div class="test">' +
        '<h4 style="color: {{test.passed}}">Status</h4>' +
      '</div>'
    )
  };
}