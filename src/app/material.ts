import {MatButtonModule, MatCheckboxModule, MatGridListModule,
  MatExpansionModule, MatButtonToggleModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatGridListModule,
    MatExpansionModule, MatButtonToggleModule]
})
export class MaterialModule { }
