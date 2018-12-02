import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aofc-day20181202',
  templateUrl: './day20181202.component.html',
  styleUrls: ['./day20181202.component.css']
})
export class Day20181202Component implements OnInit {

  sPartOneData: string;
  aLines: string[];
  sPartOneAnswer: number;
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




  ngOnInit() {
  }

}

class Line {

  aChars: string[]; // table with char
  aCount:  number[]; // table with count of this chars

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

    aFound = this.aCount.filter( v => v === iSearch );

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

