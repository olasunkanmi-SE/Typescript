"use strict";
//write a function that accepts 2 arrays. the function should return true if
//every value in the array has a its corresponding value squared in the second
//array. the frequency of values must be the same
//Naive approach
var FrequencyCounter = /** @class */ (function () {
    function FrequencyCounter(first, second) {
        this.first = first;
        this.second = second;
    }
    FrequencyCounter.prototype.frequency = function () {
        if (this.first.length != this.second.length) {
            return false;
        }
        for (var i = 0; i < this.first.length; i++) {
            var correctIndex = this.second.indexOf(Math.pow(this.first[i], 2));
            if (correctIndex == -1) {
                return false;
            }
            this.second.splice(correctIndex, 1);
        }
        return true;
    };
    return FrequencyCounter;
}());
//Refactored
var Same = /** @class */ (function () {
    function Same(first, second) {
        this.first = first;
        this.second = second;
    }
    Same.prototype.counter = function () {
        if (this.first.length !== this.second.length) {
            return false;
        }
        var firstCounter = {};
        var secondCounter = {};
        for (var i = 0; i < this.first.length; i++) {
            var iVal = this.first[i];
            firstCounter[iVal] = (firstCounter[iVal] || 0) + 1;
        }
        for (var j = 0; j < this.second.length; j++) {
            var jVal = this.second[j];
            secondCounter[jVal] = (secondCounter[jVal] || 0) + 1;
        }
        for (var key in firstCounter) {
            if (!(Math.pow(Number(key), 2) in secondCounter)) {
                return false;
            }
            if (firstCounter[key] !== secondCounter[Math.pow(Number(key), 2)]) {
                return false;
            }
        }
        return true;
    };
    return Same;
}());
// const same = new Same([1, 2, 3, 4, 3], [1, 4, 9, 16, 9]);
// console.log(same.counter());
