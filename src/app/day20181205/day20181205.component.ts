import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aofc-day20181205',
  templateUrl: './day20181205.component.html',
  styleUrls: ['./day20181205.component.css']
})
export class Day20181205Component implements OnInit {

  sAdventDayData: string;
  sPartOneAnswer: number;

  constructor() { }

  ngOnInit() {
  }

  public runPart1() {
    this.sPartOneAnswer = 0;

    let sTmp: string;
    let sNewText: string = this.sAdventDayData.trim();

    // needed data - all chars know by word ;)
    const aChar: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

    let iLastLenght: number;
    let bIsSomethingToDo = true;
    while (bIsSomethingToDo) {
      iLastLenght = sNewText.length;

      // trim all combination
      aChar.forEach(v => {
        sTmp = v + v.toUpperCase();
        sNewText = sNewText.replace(sTmp, ''); // reduce vV
        sTmp = v.toUpperCase() + v;
        sNewText = sNewText.replace(sTmp, ''); // reduce Vv
      });

      // if wasn't anny reduce in this, we don't need check next
      if (!(iLastLenght - sNewText.length)) {
        bIsSomethingToDo = false;
      }
    }

    this.sPartOneAnswer = sNewText.length ;


  }

}
