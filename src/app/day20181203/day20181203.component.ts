import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aofc-day20181203',
  templateUrl: './day20181203.component.html',
  styleUrls: ['./day20181203.component.css']
})
export class Day20181203Component implements OnInit {

  sAdventDayData: string;
  sPartTwoData: string;
  aLines: string[];
  sPartOneAnswer: number;
  sPartTwoAnswer: number;
  aMutual: number[][];

  constructor() {
    this.aMutual = []; // manin restult table
    for (let i = 0; i < 1000; i++) {
      this.aMutual[i] = [];
    }
  }

  public runPart1() {
    this.sPartOneAnswer = 0;

    this.aLines = this.sAdventDayData.split('\n');

    // check claim each with everyone
    for (let iFirst = 0; iFirst < this.aLines.length; iFirst++) {
      const firstClaim = new Claim(this.aLines[iFirst]);
      for (let iSecond = iFirst + 1; iSecond < this.aLines.length; iSecond++) {
        const secondClaim = new Claim(this.aLines[iSecond]);

        // check if we have this same rows and cols number
        const mutualRows = firstClaim.getUsedRows().filter(v => secondClaim.getUsedRows().includes(v));
        const mutualCols = firstClaim.getUsedCols().filter(v => secondClaim.getUsedCols().includes(v));




        if (mutualRows.length && mutualCols.length) {
          for (let r = Math.min.apply(null, mutualRows); r <= Math.max.apply(null, mutualRows); r++) {
            for (let c = Math.min.apply(null, mutualCols); c <= Math.max.apply(null, mutualCols); c++) {
              this.aMutual[r][c] = 1;
            }


          }

        }

      }
    }

    // this.sPartOneAnswer = this.aMutula.flat().join('').length;
    for (let index = 0; index < this.aMutual.length; index++) {
      this.sPartOneAnswer += this.aMutual[index].reduce(function (a, b) { return a + b; }, 0); // sum result
    }


  }

  public runPart2() {
    this.sPartTwoAnswer = 0;

    this.aLines = this.sAdventDayData.split('\n');

    let iCorrectId = -1;
    let bIsWrong;
    // check claim each with everyone
    for (let iFirst = 0; iFirst < this.aLines.length; iFirst++) {
      const firstClaim = new Claim(this.aLines[iFirst]);
      if (iCorrectId < 0) {
        bIsWrong = false; // if we don't have correct yet, for start trust the pretender
      }


      for (let iSecond = 0; iSecond < this.aLines.length; iSecond++) {
        if (iSecond !== iFirst) {
        const secondClaim = new Claim(this.aLines[iSecond]);

        // check if we have this same rows and cols number
        const mutualRows = firstClaim.getUsedRows().filter(v => secondClaim.getUsedRows().includes(v));
        const mutualCols = firstClaim.getUsedCols().filter(v => secondClaim.getUsedCols().includes(v));

        if (mutualRows.length && mutualCols.length) {
          bIsWrong = true; // if we fund conflict set that this is wrong
        }
      }

    }
    if (!bIsWrong) {
      iCorrectId = iFirst; // we got corret, without issue
      bIsWrong = true; // next claims must be wrong, it was a rules of this task
    }
  }

    this.sPartTwoAnswer = new Claim(this.aLines[iCorrectId]).getId();


  }


  ngOnInit() {
  }

}


class Claim {

  aRowsUsed: number[];
  aColsUsed: number[];
  iId: number;


  constructor(private sText: string) {

    this.aRowsUsed = [];
    this.aColsUsed = [];
    this.iId = -1;

    if (sText.length > 0) {
      sText = sText.replace(':', '').replace('#', ''); // fix input text
      const aTmp = sText.split(' ');
      const aPosStart = aTmp[2].split(',');
      const aLenght = aTmp[3].split('x');

      const nRowStart = (Number)(aPosStart[0]) + 1;
      const nColStart = (Number)(aPosStart[1]) + 1;
      const nRowLenght = (Number)(aLenght[0]);
      const nColLenght = (Number)(aLenght[1]);

      this.iId = (Number)(aTmp[0]);
      this.aRowsUsed = Array.from(new Array(nRowLenght), (x, i) => nRowStart + i); // fill used rows number
      this.aColsUsed = Array.from(new Array(nColLenght), (x, i) => nColStart + i); // fill used cols number
    }
  }

  public getUsedRows() {
    return this.aRowsUsed;
  }

  public getUsedCols() {
    return this.aColsUsed;
  }

  public getId(): number {
    return this.iId;
  }

}
