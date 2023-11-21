import { NgModule } from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  providers: []
})
export class HomeModule {}
