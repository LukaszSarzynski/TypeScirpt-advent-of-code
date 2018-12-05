import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aofc-day20181205',
  templateUrl: './day20181205.component.html',
  styleUrls: ['./day20181205.component.css']
})
export class Day20181205Component implements OnInit {

  sAdventDayData: string;
  sPartOneAnswer: number;
  sPartTwoAnswer: number;

  constructor() { }

  ngOnInit() {
  }

  runPart1() {
    this.sPartOneAnswer = 0;
    let sNewText: string = this.sAdventDayData.trim();

    // needed data - all chars know by word ;)
    const aChar: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

    sNewText = this.reduce(sNewText, aChar); // run global reaction

    this.sPartOneAnswer = sNewText.length ;
  }

  runPart2() {
    this.sPartTwoAnswer = 0;
    let sNewText: string = this.sAdventDayData.trim();

    // needed data - all chars know by word ;)
    const aChar: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

    let iBestReduce = sNewText.length;
      // check all combination
      aChar.forEach(v => {
        sNewText = this.sAdventDayData.trim();

        sNewText = sNewText.replace(new RegExp(v, 'g') , ''); // trim actual char
        sNewText = sNewText.replace(new RegExp(v.toUpperCase(), 'g'), ''); // trim upper actual char

        sNewText = this.reduce(sNewText, aChar); // run global reaction
        if (sNewText.length < iBestReduce) {
          iBestReduce = sNewText.length;
        }
      });
    this.sPartTwoAnswer = iBestReduce;
  }

  private reduce(sNewText, aChar) {
    let sTmp: string;
    let iLastLenght: number;
    let bIsSomethingToDo = true;
    // run reacting polymer
    while (bIsSomethingToDo) {
      iLastLenght = sNewText.length;
      // trim all combination
      aChar.forEach(v => {
        sTmp = v + v.toUpperCase();
        sNewText = sNewText.replace(new RegExp(sTmp, 'g'), ''); // reduce vV
        sTmp = v.toUpperCase() + v;
        sNewText = sNewText.replace(new RegExp(sTmp, 'g'), ''); // reduce Vv
      });
      // if wasn't anny reduce in this, we don't need check next
      if (!(iLastLenght - sNewText.length)) {
        bIsSomethingToDo = false;
      }
    }
    return sNewText;
  }

}
