import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aofc-day20181202',
  templateUrl: './day20181202.component.html',
  styleUrls: ['./day20181202.component.css']
})
export class Day20181202Component implements OnInit {

  sPartOneData: string;
  sPartTwoData: string;
  aLines: string[];
  sPartOneAnswer: number;
  sPartTwoAnswer: string;
  aCounts: number[];

  constructor() { }


  public runPart1() {
    this.sPartOneAnswer = 1;
    this.aCounts = Array<number>(100).fill(0);    // manin restult table
    this.aLines = this.sPartOneData.split('\n');

    let tmpLine: Line;
    for (let index = 0; index < this.aLines.length; index++) {
      if (this.aLines[index].length > 0) {
        tmpLine = new Line(this.aLines[index]);

        for (let num = 2; num <= tmpLine.getMax(); num++) {
          if (tmpLine.getCount(num) > 0) {
            this.aCounts[num] += 1; // get result from line and fill main restult table
          }

        }

      }

    }


    let aCountWithoutZero: number[];
    aCountWithoutZero = this.aCounts.filter(v => v !== 0); // prepare no zero restult table need to multiply correct

    for (let index = 0; index < aCountWithoutZero.length; index++) {
      this.sPartOneAnswer *= aCountWithoutZero[index]; // calculate the final effect
    }


  }


  public runPart2() {
    this.sPartTwoAnswer = ''; // ready answer
    this.aLines = this.sPartTwoData.split('\n');

    let nCharsMatch: number;
    nCharsMatch = 0; // acutal restu of find simmilar
    let sFixedBox: string;
    sFixedBox = '';
    for (let nBoxFirst = 0; nBoxFirst < this.aLines.length; nBoxFirst++) {
      const elementFirst = this.aLines[nBoxFirst];
      for (let nBoxSecond = nBoxFirst + 1; nBoxSecond < this.aLines.length; nBoxSecond++) {
        const elementSecond = this.aLines[nBoxSecond];

        const mutual = this.retriveMutualPos(elementFirst.split(''), elementSecond.split(''));
        if (mutual.length > nCharsMatch) {
          // if we fund better pair, get it !
          nCharsMatch = mutual.length;
          this.sPartTwoAnswer = mutual.join('');
        }

      }

    }

  }

  private retriveMutualPos(aFirst, aSecond) {
    let result = '';

    for (let index = 0; index < aFirst.length; index++) {
      if (aFirst[index] === aSecond[index]) {
        result += aFirst[index];
      }
    }
    return result.split('');
  }

  ngOnInit() {
  }

}

class Line {

  aChars: string[]; // table with char
  aCount: number[]; // table with count of this chars

  constructor(private sBoxId: string) {
    this.aChars = [];
    this.aCount = [];

    this.count();
  }

  public show() {
    //  console.log(this.aChars);
    //  console.log(this.aCount);

    return this.sBoxId;

  }

  public getMax() {
    return Math.max.apply(null, this.aCount);

  }

  public getCount(iSearch: number) {
    let aFound: number[];

    aFound = this.aCount.filter(v => v === iSearch);

    return aFound.length; // number of replicates of the result - iSerch
  }



  private count() {
    let iFind: number;
    let element: string;
    for (let index = 0; index < this.sBoxId.length; index++) {
      element = (String)(this.sBoxId[index]);

      iFind = (Number)(this.aChars.indexOf(element));

      if (iFind > -1) {
        this.aCount[iFind] += 1;
      } else {
        this.aChars.push(element);
        this.aCount.push(1);
      }

    }
  }


}

