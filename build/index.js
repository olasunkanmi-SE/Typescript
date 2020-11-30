"use strict";
// class Same {
//   constructor(public first: number[], public second: number[]) {}
//   frequency() {
//     if (this.first.length != this.second.length) {
//       return false;
//     }
//     for (let i = 0; i < this.first.length; i++) {
//       let correctIndex = this.second.indexOf(this.first[i] ** 2);
//       if (correctIndex == -1) {
//         return false;
//       }
//       this.second.splice(correctIndex, 1);
//     }
//     return true;
//   }
// }
// const thesame = new Same([1, 2, 3, 4], [1, 4, 9, 16]);
// console.log(thesame.frequency());
// class Same {
//   constructor(public first: number[], public second: number[]) {}
//   counter() {
//     if (this.first.length !== this.second.length) {
//       return false;
//     }
//     let firstCounter: any = {};
//     let secondCounter: any = {};
//     for (let i = 0; i < this.first.length; i++) {
//       let iVal = this.first[i];
//       firstCounter[iVal] = (firstCounter[iVal] || 0) + 1;
//     }
//     for (let j = 0; j < this.second.length; j++) {
//       let jVal = this.second[j];
//       secondCounter[jVal] = (secondCounter[jVal] || 0) + 1;
//     }
//     for (let key in firstCounter) {
//       if (!(Number(key) ** 2 in secondCounter)) {
//         return false;
//       }
//       if (firstCounter[key] !== secondCounter[Number(key) ** 2]) {
//         return false;
//       }
//     }
//     return true;
//   }
// }
// const same = new Same([1, 2, 3, 4, 3], [1, 4, 9, 16, 9]);
// console.log(same.counter());
// class Sorter {
//   constructor(public collection: number[]) {}
//   sort(): void {
//     const { length } = this.collection;
//     for (let i = 0; i < length; i++) {
//       for (let j = 0; j < length - i - 1; j++) {
//         if (this.collection[j] > this.collection[j + 1]) {
//           const leftHand = this.collection[j];
//           this.collection[j] = this.collection[j + 1];
//           this.collection[j + 1] = leftHand;
//         }
//       }
//     }
//   }
// }
// const sorter = new Sorter([1, 5, 3, 2]);
// sorter.sort();
// console.log(sorter.collection);
