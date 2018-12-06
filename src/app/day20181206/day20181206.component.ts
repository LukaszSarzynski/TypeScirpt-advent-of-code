import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aofc-day20181206',
  templateUrl: './day20181206.component.html',
  styleUrls: ['./day20181206.component.css']
})
export class Day20181206Component {

  sAdventDayData: string;
  aLines: string[];
  sPartOneAnswer: number;
  sPartOneShow: string;

  // for example, first points is { x: aPointsX[0], y: aPointsY[0] }
  aPointsX: number[] = []; // x coridate of points
  aPointsY: number[] = []; // y cordinate of points

  iGridXStart: number;
  iGridYStart: number;
  iGridXEnd: number;
  iGridYEnd: number;

  aGird: number[][] = [];
  aInfPointNumber: number[] = []; // infinite area

  constructor() { }

  runPart1() {
    this.sPartOneAnswer = 0;
    this.importData();
    this.getSizeMaxAreaFinite();


    this.sPartOneAnswer = this.getSizeMaxAreaFinite();
    this.sPartOneShow = this.girdToHtml();
  }

  private getSizeMaxAreaFinite() {

    let iMaxArea = 0;
    let tmpNumberArea = 0;
    const aFlatGird = this.aGird.concat.apply([], this.aGird);
    for (let iPointNumber = 0; iPointNumber < this.aPointsX.length; iPointNumber++) {
      // check if area is finite, so not exist in infinite number point
      if (this.aInfPointNumber.indexOf(iPointNumber) < 0) {
        tmpNumberArea = aFlatGird.filter(v => v === iPointNumber).length + 1;
        if (tmpNumberArea > iMaxArea) {
          iMaxArea = tmpNumberArea;
        }

      }
    }

    return iMaxArea;

  }

  private importData() {
    this.aLines = this.sAdventDayData.split('\n');

    // import x adn y coridation to flat array
    for (let index = 0; index < this.aLines.length; index++) {
      const aPoint = this.aLines[index].split(',');
      this.aPointsX[index] = (Number)(aPoint[0]);
      this.aPointsY[index] = (Number)(aPoint[1]);
    }

    // setting gird frame to manipulate
    this.iGridXStart = Math.min.apply(null, this.aPointsX) - 1;
    this.iGridYStart = Math.min.apply(null, this.aPointsY) - 1;
    this.iGridXEnd = Math.max.apply(null, this.aPointsX) + 1;
    this.iGridYEnd = Math.max.apply(null, this.aPointsY) + 1;

    // fill gird
    for (let gy = this.iGridYStart; gy <= this.iGridYEnd; gy++) {
      this.aGird[gy] = [];
      for (let gx: number = this.iGridXStart; gx <= this.iGridXEnd; gx++) {
        this.aGird[gy][gx] = this.getNumberOfNearPoint(gx, gy);
        // set infinite also - values on the gird end
        if (gy === this.iGridYStart || gy === this.iGridYEnd ||
          gx === this.iGridXStart || gx === this.iGridXEnd) {
          this.aInfPointNumber.push(this.aGird[gy][gx]);
        }
      }
    }

  }

  private getNumberOfNearPoint(px, py) {
    const aDistace: number[] = [];

    for (let iPointNumber = 0; iPointNumber < this.aPointsX.length; iPointNumber++) {
      // if this is this same;
      if ((this.aPointsX[iPointNumber] === px) && (this.aPointsY[iPointNumber] === py)) {
        return iPointNumber + 100;
      }
      // calculate manhattan distance
      aDistace[iPointNumber] = Math.abs(this.aPointsX[iPointNumber] - px)
        + Math.abs(this.aPointsY[iPointNumber] - py);
    }

    // get minimal distace
    const iMinDistace = Math.min.apply(null, aDistace);

    // check if this min distace have only one point
    if ((aDistace.filter(v => v === iMinDistace).length) === 1) {
      // if only one occurs
      return aDistace.indexOf(iMinDistace);
    } else {
      // if many point have this same distace
      return -1;
    }

  }

  girdToHtml() {
    let sText = '';
    let tmpPointNumber = '';
    const space = ' ';

    for (let gy = this.iGridYStart; gy <= this.iGridYEnd; gy++) {
      for (let gx: number = this.iGridXStart; gx <= this.iGridXEnd; gx++) {
        tmpPointNumber = (String)(this.aGird[gy][gx]);
        // mark infinity
        if (this.aInfPointNumber.indexOf(this.aGird[gy][gx]) + 1) {
          tmpPointNumber += '%';
        }
        sText += '|' + space.repeat(3 - tmpPointNumber.length) + tmpPointNumber;
      }
      sText += '<br />';
    }

    return sText;
  }



}
