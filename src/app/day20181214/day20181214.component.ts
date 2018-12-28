import { Component } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'aofc-day20181214',
  templateUrl: './day20181214.component.html',
  styleUrls: ['./day20181214.component.css']
})
export class Day20181214Component  {

  sPartOneAnswer: string;
  sPartTwoAnswer: string;
  sAdventDayDataShow: string;

  aWanted: number[]; // array of string to fund in parto
  nWantedLength: number;
  nLastIndexChecked: number; // indext of Reciept array where we try fund it alledy

  aReciept: number[]; // actual chain of recipt
  sActualReciept: string;
  nPosElfFirst: number; // position of first elf
  nPosElfSecond: number; // acutal positoon of second elf
  nNextStep: number; // how more will be next step

  constructor() { }

  runPart1(sTextareaAdventData: string) {
    this.sPartOneAnswer = '';
    this.sAdventDayDataShow = '';
    const iRecieptBefore: number = (Number)(sTextareaAdventData);

    // starting rules
    this.initalReciept();

    // this.sAdventDayDataShow =  this.getHtmlOfRecipe();

    while (this.aReciept.length < iRecieptBefore + 10) {
      this.putSuffixToRecipe(); // elf first and second and put sum to end
      this.moveElfs(); // move elfs
      // this.sAdventDayDataShow += this.getHtmlOfRecipe();
    }

    // get finall answer
    this.sPartOneAnswer = (this.aReciept.slice(iRecieptBefore, iRecieptBefore + 10)).join('');
  }

  runPart2(sTextareaAdventData: string) {
    this.sPartTwoAnswer = '';
    const sWanted = sTextareaAdventData.trim();
    this.aWanted = sWanted.split('').map(Number);
    this.nWantedLength = this.aWanted.length;
    this.nLastIndexChecked = 0;

    // starting rules
    this.initalReciept();

    this.sActualReciept = this.aReciept.join('');
    // this.sAdventDayDataShow =  this.getHtmlOfRecipe();


    const t0 = performance.now();
    while (this.getWantedIndex() === -1) {
      this.putSuffixToRecipe(); // elf first and second and put sum to end
      this.moveElfs(); // move elfs
      // this.sAdventDayDataShow += this.getHtmlOfRecipe();
    }
    const t1 = performance.now();

    console.log("Length of Chocolate Charts finally is " + this.aReciept.length + ' numbers');
    console.log("Found result in " + Math.trunc(t1 - t0) + " milliseconds.")
    this.sPartTwoAnswer = (String)(this.nLastIndexChecked);
  }

  private getWantedIndex() {
    const nLastIndexNeedToCheck = this.nLastIndexChecked + this.nWantedLength - 1;
    if (typeof this.aReciept[nLastIndexNeedToCheck] === 'undefined') {
      // if not ready to check yet
      return -1;
    }
    for (let iW = 0; iW < this.nWantedLength; iW++) {
      // compare each char wanted vs last of Reciept
      if (this.aWanted[iW] === this.aReciept[this.nLastIndexChecked + iW]) {
        // if we match all and go to end, we have a succes
        if (iW === this.nWantedLength - 1) {
          return this.nLastIndexChecked;
        }
      } else {
        break;
      }
    }


    this.nLastIndexChecked += 1;
    return -1;
  }

  private initalReciept() {
    // starting rules
    this.aReciept = [3, 7];
    this.nPosElfFirst = 0;
    this.nPosElfSecond = 1;
  }

  private putSuffixToRecipe() {
    const nSum = this.aReciept[this.nPosElfFirst] + this.aReciept[this.nPosElfSecond];
    if (nSum > 9) {
      // if we have two char, for exampe 10 -> 1, 0 or 18 -> 1, 8
      this.aReciept.push(1); // put first char in this puzle aways will be 1
      this.aReciept.push(nSum % 10); // put second char
    } else {
      // only one char
      this.aReciept.push(nSum);
    }
  }

  private moveElfs() {

    this.nPosElfFirst += this.aReciept[this.nPosElfFirst] + 1;
    this.nPosElfFirst %= this.aReciept.length;

    this.nPosElfSecond += (this.aReciept[this.nPosElfSecond] + 1);
    this.nPosElfSecond %=  this.aReciept.length;

  }

  private getHtmlOfRecipe() {
    let sHtml = '<br />';
    for (let i = 0; i < this.aReciept.length; i++) {
      if (i === this.nPosElfFirst) {
        sHtml += ' (';
      } else if (i === this.nPosElfSecond) {
        sHtml += ' [';
      } else {
        sHtml += '  ';
      }
      sHtml += this.aReciept[i];
    }
    return sHtml;
  }

}
