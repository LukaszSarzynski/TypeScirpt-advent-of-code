import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'aofc-advent-partial',
  templateUrl: './advent-partial.component.html',
  styleUrls: ['./advent-partial.component.css']
})
export class AdventPartialComponent implements OnInit {

  @Input()
  sDate: string;
  @Input()
  sPartOneAnswer: string;
  @Input()
  sPartTwoAnswer: string;
  @Input()
  sAdventDayDataShow: string;

  @Output()
  emitClickPart1 = new EventEmitter<string>();
  @Output()
  emitClickPart2 = new EventEmitter<string>();

  sAdventDayData: string;
  sYear: string;
  sDay: string;

  constructor() {

   }

   ngOnInit(): void {
     this.sYear = (String) (this.sDate);
     this.sYear = (String) (this.sYear.slice(0, 4));

     this.sDay = (String) (this.sDate);
     this.sDay = (String) (this.sDay.slice(6, 8));


   }

   public clickPart1() {
     this.emitClickPart1.emit(this.sAdventDayData);
   }

   public clickPart2() {
    this.emitClickPart2.emit(this.sAdventDayData);
  }
}
