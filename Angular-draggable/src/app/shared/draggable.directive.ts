import { AfterViewInit, Directive, OnDestroy, ElementRef, Inject, Input, ContentChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { from, fromEvent, Subscription } from 'rxjs';
import { DraggableHandleDirective } from './draggable-handle.directive';
import { WindowService } from './windows.service';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements AfterViewInit, OnDestroy{

  @Input() boundary = "body";
  private draggingBoundaryElement: HTMLElement | HTMLBodyElement;

  private subscriptions: Subscription[] = []
  private element: HTMLElement;

  @ContentChild(DraggableHandleDirective) handle: DraggableHandleDirective;
  handleElement: HTMLElement;

  constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: any, private windowService: WindowService) {
  }

  ngAfterViewInit(): void{

    this.draggingBoundaryElement = this.document.querySelector(this.boundary);

    if(!this.draggingBoundaryElement){
      console.log("No Element with for query: " + this.boundary);
    }
    else{
      this.element = this.elementRef.nativeElement;
      //this.element.style.zIndex = "1";
      this.handleElement = this.handle?.elementRef?.nativeElement || this.element;
      this.setupDraggable();
    }
  }

  setupDraggable(): void{
    const dragStart = fromEvent<MouseEvent>(this.handleElement, "mousedown");
    const dragEnd = fromEvent<MouseEvent>(this.document, "mouseup");
    const drag = fromEvent<MouseEvent>(this.document, "mousemove");
    const select = fromEvent<MouseEvent>(this.document, "selectstart");

    let initialX: number;
    let initialY: number;

    let startX = this.element.offsetLeft;
    let startY = this.element.offsetTop;

    let currentX = 0;
    let currentY = 0;

    let dragSub: Subscription;
    let selectSub: Subscription;

    const minBoundX = this.draggingBoundaryElement.clientLeft;
    const minBoundY = this.draggingBoundaryElement.clientTop + 32;

    const maxBoundX = minBoundX + this.draggingBoundaryElement.offsetWidth - this.element.offsetHeight - startX - 200;
    const maxBoundY = minBoundY + this.draggingBoundaryElement.offsetHeight - this.element.offsetHeight - startY;

    const dragStartSub = dragStart.subscribe((event:MouseEvent) => {
      
      initialX = event.clientX - currentX;
      initialY = event.clientY - currentY;
      this.element.classList.add("dragging");

      selectSub = select.subscribe((event:MouseEvent) => {
        event.preventDefault();
      });

      dragSub = drag.subscribe((event:MouseEvent) => {
        event.preventDefault();

        const x = event.clientX - initialX;
        const y = event.clientY - initialY;

        currentX = Math.max(minBoundX - startX, Math.min(x, maxBoundX));
        currentY = Math.max(minBoundY - startY, Math.min(y, maxBoundY));

        this.element.style.transform = "translate3d(" + currentX + "px, " + currentY + "px, 0)";
      });
    });

    const dragEndSub = dragEnd.subscribe(() => {
      initialX = currentX;
      initialY = currentY;
      this.element.classList.remove("dragging")

      if(dragSub){
        dragSub.unsubscribe();
      }
      if(selectSub){
        selectSub.unsubscribe();
      }
    });

    this.subscriptions.push.apply(this.subscriptions, [
      dragStartSub,
      dragSub,
      dragEndSub
    ])
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s:Subscription)=>{
      if(s){
        s.unsubscribe();
      }
    }); 
  }

}
