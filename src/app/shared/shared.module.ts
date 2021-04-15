import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CarouselComponent, CarouselItemElementDirective} from './carousel/carousel.component';
import {CarouselItemDirective} from './carousel/carousel-item.directive';
import {TableViewComponent} from './table-view/table-view.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    CarouselComponent,
    CarouselItemElementDirective,
    CarouselItemDirective,
    TableViewComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule
  ],
  exports: [
    CarouselComponent,
    CarouselItemElementDirective,
    CarouselItemDirective,
    TableViewComponent
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule {
}
