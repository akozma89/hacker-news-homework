import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
  ],
  providers: []
})
export class NotFoundModule {}
