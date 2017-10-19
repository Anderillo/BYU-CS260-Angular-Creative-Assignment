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
  $scope.problems = [
    {
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
        }
      ]
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
        }
      ]
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
        }
      ]
    },
    {
      question:'Write a function that returns the largest of a1, a2, and a3.\nExample: if a1 = 2, a2 = 7, and a3 = 4, you should return 4',
      header: 'function largest(var a1, var a2, var a3) {',
      footer: '}',
      tests: [{
            passed: $scope.xMark,
            argument: [2, 7, 4],
            answer: '7'
          },
          {
            passed: $scope.xMark,
            argument: [1, 2, 3],
            answer: '3'
          },
          {
            passed: $scope.xMark,
            argument: [-5, -1, -17],
            answer: '-1'
          },
          {
            passed: $scope.xMark,
            argument: [100, 99, 99],
            answer: '100'
          },
          {
            passed: $scope.xMark,
            argument: [10, 10, 10],
            answer: '10'
          }
        ]
    },
    {
      question:'Write a function that interprets the string a1 as a number in base a2, and returns the number in base a3.' +
                  '\n0 < a3 <= 16. a2 and a3 are both integers in base 10.' +
                  '\nExample: if a1 = 10, a2 = 42, and a3 = 2, you should return 101010.',
      header: 'function changeBase(var a1, var a2, var a3) {',
      footer: '}',
      tests: [{
          passed: $scope.xMark,
          argument: ['\"42\"', 10, 2],
          answer: 101010
        },
        {
          passed: $scope.xMark,
          argument: ['\"8A\"', 16, 10],
          answer: '138'
        },
        {
          passed: $scope.xMark,
          argument: ['\"461\"', 8, 3],
          answer: '102022'
        },
        {
          passed: $scope.xMark,
          argument: ['\"A6BC89\"', 13, 5],
          answer: '2000114404'
        },
        {
          passed: $scope.xMark,
          argument: ['\"18745\"', 9, 9],
          answer: '18745'
        }
      ]
      // return parseInt(a1, a2).toString(a3);
    },
    {
      question:'Write a function that returns the result of performing the operation a2 between every element on the array a1.' +
                  ' a1 will have at least one element, and a2 will be +, -, *, /, or %.' +
                  '\nExample: if a1 = [1, 3, 5] and a2 = \"*\", you should return 1*3*5=15.',
      header: 'function performOp(var a1, var a2) {',
      footer: '}',
      tests: [{
          passed: $scope.xMark,
          argument: ['[1239481274,984,100,6]', '\"+\"'],
          answer: 1239482364
        },
        {
          passed: $scope.xMark,
          argument: ['[43,47,42,6]', '\"+\"'],
          answer: 138
        },
        {
          passed: $scope.xMark,
          argument: ['[1239481274,984,100,6]', '\"-\"'],
          answer: 1239480184
        },
        {
          passed: $scope.xMark,
          argument: ['[63,845,1,0]', '\"-\"'],
          answer: -783
        },
        {
          passed: $scope.xMark,
          argument: ['[1,3,5]', '\"*\"'],
          answer: 15
        },
        {
          passed: $scope.xMark,
          argument: ['[9453,334,1]', '\"*\"'],
          answer: 3157302
        },
        {
          passed: $scope.xMark,
          argument: ['[12,4,3]', '\"/\"'],
          answer: 1
        },
        {
          passed: $scope.xMark,
          argument: ['[100,4,4]', '\"/\"'],
          answer: 6.25
        },
        {
          passed: $scope.xMark,
          argument: ['[1239481274,984,100,6]', '\"%\"'],
          answer: 4
        },
        {
          passed: $scope.xMark,
          argument: ['[4904868,10]', '\"%\"'],
          answer: 8
        }
      ]
        // var total = a1[0];
        // for (var i = 1; i < a1.length; i++) {
        //     if (a2 == "+") total += a1[i];
        //     else if (a2 == "-") total -= a1[i];
        //     else if (a2 == "*") total *= a1[i];
        //     else if (a2 == "/") total /= a1[i];
        //     else if (a2 == "%") total %= a1[i];
        // }
        // return total;
    }
  ];
  $scope.currentIndex = 0;

  $scope.runCode = function() {
    try{
        var passedAllTests = true;
        for (var i_ = 0; i_ < $scope.problems[$scope.currentIndex].tests.length; i_++) {
            $scope.problems[$scope.currentIndex].tests[i_].passed = $scope.xMark;
            var code = createHeaderVars($scope.problems[$scope.currentIndex].tests[i_].argument) + $scope.javascriptForm.javascript;
            var userAnswer = eval('(function() {' + code + '}())');
            if (userAnswer != $scope.problems[$scope.currentIndex].tests[i_].answer) passedAllTests = false;
            else $scope.problems[$scope.currentIndex].tests[i_].passed = $scope.checkMark;
        }

        if (passedAllTests) {
            $scope.canAdvance = true;
        }
    }
    catch(err){
        alert(err);
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