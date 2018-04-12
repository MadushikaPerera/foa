import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule, MatButtonModule,MatCardModule,MatInputModule } from "@angular/material";

@NgModule({
  imports: [MatToolbarModule, MatButtonModule,MatCardModule,MatInputModule],
  exports: [MatToolbarModule, MatButtonModule,MatCardModule,MatInputModule],
  declarations: []
})
export class MaterialModule {}
