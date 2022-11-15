import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { DraggableHandleDirective } from './draggable-handle.directive';



@NgModule({
  declarations: [
    DraggableDirective,
    DraggableHandleDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    DraggableDirective,
    DraggableHandleDirective
  ]
})
export class SharedModule { }
