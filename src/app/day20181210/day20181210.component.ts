import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aofc-day20181210',
  templateUrl: './day20181210.component.html',
  styleUrls: ['./day20181210.component.css']
})
export class Day20181210Component implements OnInit {

  sPartOneAnswer: number;
  sAdventDayDataShow: string;

  aPointRules: PointRule[] = [];

  iGridXStart: number;
  iGridYStart: number;
  iGridXEnd: number;
  iGridYEnd: number;

  aGird: number[][] = [];

  constructor() {


   }


  runPart1(sTextareaAdventData: string) {
    this.aGird = [];
    this.sPartOneAnswer = 0;
    this.importData(sTextareaAdventData);

    let iStep = 0;

    // find vertifical line on 8 size, and don't fund added next step
    while (!this.issetVerticalLine()) {
      this.fillGirdOfSteep(++iStep);
      // console.log(iStep);
      if (iStep > 978000) {
        break;
      }
    }

    this.sPartOneAnswer = iStep;
    this.sAdventDayDataShow = this.girdToHtml();
  }

  private issetVerticalLine(iLenght = 8) {

    // if this is still bigg to check, ignor this result
    if ((this.iGridYEnd - this.iGridYStart) > 20) {
      return false;
    }

    let iFundLineLenght: number;
    for (let gx: number = this.iGridXStart; gx <= this.iGridXEnd; gx++){
      iFundLineLenght = 0;
      for (let gy = this.iGridYStart; gy <= this.iGridYEnd; gy++) {
        if (typeof this.aGird[gy] === 'undefined') {
          iFundLineLenght = 0;
        } else if (typeof this.aGird[gy][gx] === 'undefined') {
          iFundLineLenght = 0;
        } else {
          iFundLineLenght++;
        }

        if (iFundLineLenght >= iLenght) {
          // if fund vertical line, probably we got a text to decode
          return true;
        }
      }
    }

    return false;

  }

  private importData(sTextareaAdventData: string ) {
    const aLines = sTextareaAdventData.split('\n');

    // import x adn y coridation whith it move
    for (let index = 0; index < aLines.length; index++) {
      const aLinNum =  aLines[index].match(/\-?\d+/g);
      if (aLinNum !== null) {
      this.aPointRules.push({xst: (Number)(aLinNum[0]),
                             yst: (Number)(aLinNum[1]),
                             xve: (Number)(aLinNum[2]),
                             yve: (Number)(aLinNum[3])
                            });
                          }
    }

  }

  private fillGirdOfSteep(iSteep: number) {

    this.aGird = []; // clear gird

    const aTmpPointsX: number[] = []; // points X for this step
    const aTmpPointsY: number[] = []; // points Y for this step

    for (const Point of this.aPointRules) {
      // calcuate point for step
      const nXofSteep = Point.xst + Point.xve * iSteep;
      const nYofSteep = Point.yst + Point.yve * iSteep;
      aTmpPointsX.push(nXofSteep);
      aTmpPointsY.push(nYofSteep);

      if (typeof this.aGird[nYofSteep] === 'undefined') {
        this.aGird[nYofSteep] = [];
      }
      // fill Gird of this steps
      this.aGird[nYofSteep][nXofSteep] = 1;
    }

    // find max adn min
    this.iGridXStart = Math.min.apply(null, aTmpPointsX);
    this.iGridYStart = Math.min.apply(null, aTmpPointsY)
    this.iGridXEnd = Math.max.apply(null, aTmpPointsX);
    this.iGridYEnd = Math.max.apply(null, aTmpPointsY);


  }

  girdToHtml() {
    let sText = '';
    let tmpPointValue = '';


    for (let gy = this.iGridYStart; gy <= this.iGridYEnd; gy++) {
      for (let gx: number = this.iGridXStart; gx <= this.iGridXEnd; gx++) {
        if (typeof this.aGird[gy] === 'undefined') {
          tmpPointValue = ' ';
        } else if (typeof this.aGird[gy][gx] === 'undefined') {
          tmpPointValue = ' ';
        } else {
          // if we have any value in Gird array, mark it!
          tmpPointValue = '#';
        }
        sText +=  tmpPointValue;
      }
      sText += '<br />';
    }

    return sText;
  }

  ngOnInit() {
  }

}

interface PointRule {
  xst: number;
  yst: number;
  xve: number;
  yve: number;
}
