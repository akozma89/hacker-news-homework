import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './components/list-page/list-page.component';
import { ListRoutingModule } from './list-routing.module';
import { FormsModule } from '@angular/forms';
import { PagerComponent } from './components/pager/pager.component';
import { LinkCardComponent } from './components/link-card/link-card.component';
import { HostnamePipe } from 'src/app/pipes/hostname.pipe';

@NgModule({
  declarations: [
    LinkCardComponent,
    ListPageComponent,
    PagerComponent,
    HostnamePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ListRoutingModule,
  ],
})
export class ListModule { }
