//Write a function that takes in 2 strings and check if one string is the anagram of the other. With time complecity in mind

class Anagram {
  constructor(public firstString: string, public secondString: string) {}
  check() {
    if (this.firstString.length !== this.secondString.length) {
      return false;
    }
    let firstObj: any = {};
    let secondObj: any = {};
    const firstLength = this.firstString.length;
    const seconLength = this.secondString.length;
    for (let i = 0; i < firstLength; i++) {
      let iVal = this.firstString[i];
      firstObj[iVal] = (firstObj[iVal] || 0) + 1;
    }

    for (let j = 0; j < seconLength; j++) {
      let jVal = this.secondString[j];
      secondObj[jVal] = (secondObj[jVal] || 0) + 1;
    }

    for (const key in firstObj) {
      if (firstObj[key] != secondObj[key]) {
        return false;
      }
    }
    return true;
  }
}

let checker = new Anagram("rat", "car");
console.log(checker.check());
