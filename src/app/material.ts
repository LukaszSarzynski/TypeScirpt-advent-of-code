import {MatButtonModule, MatCheckboxModule, MatGridListModule, MatExpansionModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatGridListModule,
    MatExpansionModule]
})
export class MaterialModule { }
