"use strict";
//Write a function that takes in 2 strings and check if one string is the anagram of the other. With time complecity in mind
var Anagram = /** @class */ (function () {
    function Anagram(firstString, secondString) {
        this.firstString = firstString;
        this.secondString = secondString;
    }
    Anagram.prototype.check = function () {
        if (this.firstString.length !== this.secondString.length) {
            return false;
        }
        var firstObj = {};
        var secondObj = {};
        var firstLength = this.firstString.length;
        var seconLength = this.secondString.length;
        for (var i = 0; i < firstLength; i++) {
            var iVal = this.firstString[i];
            firstObj[iVal] = (firstObj[iVal] || 0) + 1;
        }
        for (var j = 0; j < seconLength; j++) {
            var jVal = this.secondString[j];
            secondObj[jVal] = (secondObj[jVal] || 0) + 1;
        }
        for (var key in firstObj) {
            if (firstObj[key] != secondObj[key]) {
                return false;
            }
        }
        return true;
    };
    return Anagram;
}());
var checker = new Anagram("rat", "car");
console.log(checker.check());
