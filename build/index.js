"use strict";
// class Sorter {
//   constructor(public collection: number[]) {}
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//   sort(): void {
//     const collectionLength = this.collection.length;
//     for (let i = 0; i < collectionLength; i++) {
//       for (let j = 1; j < collectionLength - 1; j++) {
//         console.log(this.collection[i], this.collection[j]);
//       }
//     }
//   }
// }
// const sorter = new Sorter([2, -3, 20, 9]).sort();
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
    }
    Department.prototype.printName = function () {
        console.log("this is " + this.name + " department");
    };
    return Department;
}());
var ElectricalDepartment = /** @class */ (function (_super) {
    __extends(ElectricalDepartment, _super);
    function ElectricalDepartment() {
        return _super.call(this, name) || this;
    }
    ElectricalDepartment.prototype.printMeeting = function () {
        console.log("this minutes is for " + this.name);
    };
    ElectricalDepartment.prototype.doOthers = function () {
        return "hello world";
    };
    return ElectricalDepartment;
}(Department));
var department;
department = new ElectricalDepartment();
department.;
