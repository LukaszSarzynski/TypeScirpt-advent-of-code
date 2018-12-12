import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aofc-day20181212',
  templateUrl: './day20181212.component.html',
  styleUrls: ['./day20181212.component.css']
})
export class Day20181212Component implements OnInit {

  sAdventDayData: string;
  sPartOneAnswer: number;
  sAdventDayDataShow: string;
  iMaxGeneration: number;

  ainRules: IHashStringToStrings =  {};
  ainGenerations: string[][] = [];

  constructor() {
  }

  runPart1() {
    this.iMaxGeneration = 20;
    this.sPartOneAnswer = 0;
    this.importData();
    for (let iActualGen = 1; iActualGen <= this.iMaxGeneration; iActualGen++) {
      this.createGeneration(iActualGen);
    }


    this.sPartOneAnswer = this.getSumOfPlansPosition(this.iMaxGeneration) ;
    this.sAdventDayDataShow = this.returnHtmlFromGenerations();
  }

  private getSumOfPlansPosition(iGeneration) {
    let iSum = 0;
    const aTmpGeneration = this.ainGenerations[iGeneration].slice(0);

    let iPlantPos = 0;
    while (iPlantPos > -1) {
      iPlantPos = aTmpGeneration.indexOf('#');

      if (iPlantPos > -1 ) {
        iSum += iPlantPos - this.iMaxGeneration * 2;
        // remove plant from tmp array
        aTmpGeneration[iPlantPos] = '.';
      }
    }

    return iSum;
  }

  private createGeneration(iGeneration) {
    const aParent = this.ainGenerations[iGeneration - 1].slice(0);
    const aTmpParent = this.ainGenerations[iGeneration - 1].slice(0);
    // fill empty for fist
    this.ainGenerations[iGeneration] = ('.').repeat(aParent.length).split('');

    let iPlantPos = 0;
    // check all plant
    while (iPlantPos > -1 ) {

      // check only marked place
      iPlantPos = aTmpParent.indexOf('#');
      // find plant and check index from -4 to +4 position
      for (let iStart = iPlantPos - 4; ((iPlantPos > -1) && (iStart < iPlantPos + 4)); iStart++) {
        const sCheckThis = aParent[iStart]
                            + aParent[iStart + 1]
                            + aParent[iStart + 2]
                            + aParent[iStart + 3]
                            + aParent[iStart + 4];

        if (typeof this.ainRules[sCheckThis] !== 'undefined') {
          // if we get somethig set it in new generation
          this.ainGenerations[iGeneration][iStart + 2] = this.ainRules[sCheckThis];
        }
      }
      // remove plant to check next
      aTmpParent[iPlantPos] = '.';
    }


  }

  private importData() {
    const aLines = this.sAdventDayData.split('\n');

    let aTmpData: string[];
    aTmpData = aLines[0].split('initial state: ');
    const aFuturePlace = ('.').repeat((this.iMaxGeneration ) * 2);
    // initalize first generation
    this.ainGenerations[0] = (aFuturePlace + aTmpData[1] + aFuturePlace).split('');


    // import data order rules
    for (let index = 1; index < aLines.length; index++) {
      aTmpData = [];
      if (aLines[index].length > 7) {
        aTmpData = aLines[index].split(' => ');
        this.ainRules[aTmpData[0]] = aTmpData[1];
      }
    }

  }

  private returnHtmlFromGenerations() {
    let sText = '';

    for (let iGeneration = 0; iGeneration < this.ainGenerations.length; iGeneration++) {
      const sGenName = (String)(iGeneration );
      sText += sGenName +
               (' ').repeat(3 - sGenName.length)
                + this.ainGenerations[iGeneration].join('')
                + '<br />';

    }

    return sText;
  }

  private getNumberOfPlant() {
    const aFlatGeneration = this.ainGenerations.concat.apply([], this.ainGenerations);
    const aPlants = aFlatGeneration.filter(v => v === '#');

    return aPlants.length;
  }

  ngOnInit() {
  }


}

export interface IHashStringToStrings {
  [details: string]: string;
}


