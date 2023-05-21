import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appVisibleDirective]',
})
export class VisibleDirectiveDirective {
  @Output('elementVisible') elementVisible = new EventEmitter<boolean>();
  @Input('isTargetElement') isTargetElement: boolean = false;

  public intersectionOptions = {
    root: null, //implies the root is the document viewport
    rootMargin: '0px',
    threshold: [0, 0.5, 1],
  };

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    let observer = new IntersectionObserver(
      this.intersectionCallback.bind(this),
      this.intersectionOptions
    );

    if (this.isTargetElement) {
      // observando elemento alvo
      observer.observe(this.element.nativeElement);
    }
  }

  intersectionCallback(entries: any, observer: any) {
    entries.forEach((entry: any) => {
      if (entry.intersectionRatio === 1) {
        this.elementVisible.emit(true); //elemento esta completamente visivel no viewport
      } else {
        this.elementVisible.emit(false);
      }
    });
  }
}
