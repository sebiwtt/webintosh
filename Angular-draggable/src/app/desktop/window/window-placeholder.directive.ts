import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[WindowPlaceholder]'
})
export class WindowPlaceholderDirective {

  constructor(public viewConRef:ViewContainerRef) { }

}
