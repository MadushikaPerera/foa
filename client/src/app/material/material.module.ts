import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule, MatButtonModule } from "@angular/material";

@NgModule({
  imports: [MatToolbarModule, MatButtonModule],
  exports: [MatToolbarModule, MatButtonModule],
  declarations: []
})
export class MaterialModule {}
