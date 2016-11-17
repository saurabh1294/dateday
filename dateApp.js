"use strict";


	/* test cases
	1. 04/07/1984 - 25/12/1984: 173 days
	2. 02/06/1983 - 22/06/1983: 19 days
	3. 03/01/1989 - 03/08/1983: 1979 days 
	*/

var dateComponent = angular.module("dateComponent", [
]);


dateComponent.directive('ngModel',  [function() {
    return {
        require: 'ngModel',
        link: function(scope, elem, attr, ngModel) {
            scope.startDate = '';
            scope.endDate = '';

            elem.on('blur', function() {
                ngModel.$dirty = true;
                scope.$apply();
            });

            ngModel.$viewChangeListeners.push(function() {
                ngModel.$dirty = false;
            });

            scope.$on('$destroy', function() {
                elem.off('blur');
            });
        }
    }
}]);

dateComponent.controller('dateCtrl', ['$scope', 
    function($scope) {
		$scope.calcDays = function() {
		var startDate 	= document.getElementById("startDate").value,
			endDate 	= document.getElementById("endDate").value,
			sy = parseInt(startDate.split("-")[0]),
			sm = parseInt(startDate.split("-")[1]),
			sd = parseInt(startDate.split("-")[2]),
			
			ey = parseInt(endDate.split("-")[0]),
			em = parseInt(endDate.split("-")[1]),
			ed = parseInt(endDate.split("-")[2]);
			
			if(sy > ey) {
				// swap dates
				var temp = startDate;
				startDate = endDate;
				endDate = temp;
			}
			
			// more validations
			if (sy < 1901 || sy > 2999 || ey < 1901 || ey > 2999) {
				alert("Dates before 1901 and after 2999 not allowed. Please change dates and retry");
				return true;
			}
			
			var startYear	= startDate.split("-")[0],
			startMonth	= startDate.split("-")[1],
			startDay	= startDate.split("-")[2],
			endYear		= endDate.split("-")[0],
			endMonth	= endDate.split("-")[1],
			endDay		= endDate.split("-")[2];
			
			$scope.convertDateToDays(startDay, endDay, startMonth, endMonth, startYear, endYear);
	}
			
			$scope.convertDateToDays = function(startDay, endDay, startMonth, endMonth, startYear, endYear) {
			var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			sm = parseInt(startMonth),
			em = (parseInt(endMonth) < 0) ? parseInt(endMonth) : parseInt(endMonth),
			syear = parseInt(startYear),
			eyear = parseInt(endYear),
			totalDays = 0, leapYearCount = 0,
			nonLeapYearCount = 0;
			
			console.log(startDay, endDay, startMonth, endMonth, startYear, endYear, sm, em);
			
			if (startMonth !== endMonth) {
				if (startYear !== endYear) {
					for(var index = sm; index <= 11; index++) {
						totalDays += (index === 1 && (((syear%4==0)&&(syear%100!=0)) || (syear%400==0))) ? 29 : months[index];
						console.log(totalDays);
					}
				}
				else {
					if (sm > em) {
						var tm = sm;
						sm = em;
						em = tm;
					}
					
					for(var index = sm; index < em; index++) {
						totalDays += (index === 1 && (((syear%4==0)&&(syear%100!=0)) || (syear%400==0))) ? 29 : months[index];
						console.log(totalDays);
					}
				}
			}
			
			if (startYear !== endYear) {
				for (var i = 0; i < em; i++) {
					totalDays += (i === 1 && (((eyear%4==0)&&(eyear%100!=0)) || (eyear%400==0))) ? 29 : months[i];
					console.log(months[i]);
				}
				
				for (var t = syear + 1; t < eyear; t++) {
					if ((((t%4==0)&&(t%100!=0)) || (t%400==0))) {
						leapYearCount++;
					}
					else {
						nonLeapYearCount++;
					}
					console.log(t);
				}
				console.log(leapYearCount, nonLeapYearCount);
				totalDays += leapYearCount*366 + nonLeapYearCount*365;
			}
			
			var dayAbsDiff = Math.abs(parseInt(startDay) - parseInt(endDay)),
				dayDiff = dayAbsDiff - 1;
				console.log(parseInt(startDay), parseInt(endDay), dayDiff);
				totalDays += dayDiff;
				if (totalDays < 0) {
					totalDays = 0;
				}
				document.getElementById("exampleTextarea").innerHTML = "Total number of days between the 2 dates is : "+ totalDays;
	}
    }]);
