import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {animate, AnimationBuilder, AnimationFactory, AnimationPlayer, state, style, transition, trigger} from '@angular/animations';
import {CarouselItemDirective} from './carousel-item.directive';

class PageDot {
  pageNum: number;
  isActive: boolean;

  constructor(pageNum: number, isActive: boolean) {
    this.pageNum = pageNum;
    this.isActive = isActive;
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '.carousel-item'
})
export class CarouselItemElementDirective {
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('item', [
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),  // initial
        animate('0.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({transform: 'scale(1)', opacity: 1}))  // final
      ])
    ]),
    trigger('simpleFadeAnimation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),
      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(900)
      ])
    ])
  ]
})
export class CarouselComponent implements AfterViewInit {
  // OnInit
  @ContentChildren(CarouselItemDirective) items: QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselItemElementDirective, {read: ElementRef}) private itemsElements: QueryList<ElementRef>;
  @ViewChild('carousel') private carousel: ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  private player: AnimationPlayer;
  private itemWidth: number;
  public currentSlide = 0;
  public pageDots: Array<PageDot>;

  constructor(private builder: AnimationBuilder) {
    // this.pageDots = new Array<PageDot>();
    // for (let i = 0; i < this.items.length; i++) {
    //     this.pageDots.push(new PageDot(i, i === 0 ? true : false));
    // }
  }

  private buildAnimation(offset) {
    return this.builder.build([
      animate(this.timing, style({transform: `translateX(-${offset}px)`}))
    ]);
  }

  next() {
    if (this.currentSlide === this.pageDots.length - 1) {
      this.pageChange(0);
    } else {
      this.pageChange(this.currentSlide + 1);
    }
  }

  prev() {
    if (this.currentSlide === 0) {
      this.pageChange(this.pageDots.length - 1);
    } else {
      this.pageChange(this.currentSlide - 1);
    }
  }

  pageChange(pageIndex) {
    for (let i = 0; i < this.pageDots.length; i++) {
      if (pageIndex !== i && this.pageDots[i].isActive) {
        this.pageDots[i].isActive = false;
      } else if (pageIndex === i) {
        this.pageDots[i].isActive = true;
        this.currentSlide = i;
        /* const offset = this.currentSlide * this.itemWidth;
         const myAnimation: AnimationFactory = this.buildAnimation(offset);
         this.player = myAnimation.create(this.carousel.nativeElement);
         this.player.play();*/
      }
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.pageDots = new Array<PageDot>();
      for (let i = 0; i < this.items.length; i++) {
        this.pageDots.push(new PageDot(i, i === 0));
      }
    });
  }
}
