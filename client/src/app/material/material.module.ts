import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule, MatButtonModule,MatCardModule,MatInputModule, MatIconModule, MatListModule, MatSidenavModule,MatFormFieldModule,MatProgressSpinnerModule } from "@angular/material";


@NgModule({
  imports: [MatToolbarModule, MatButtonModule,MatCardModule,MatInputModule, MatIconModule, MatListModule, MatSidenavModule,MatFormFieldModule,MatProgressSpinnerModule],
  exports: [MatToolbarModule, MatButtonModule,MatCardModule,MatInputModule, MatIconModule, MatListModule, MatSidenavModule,MatFormFieldModule,MatProgressSpinnerModule],
  declarations: []
})
export class MaterialModule {}
