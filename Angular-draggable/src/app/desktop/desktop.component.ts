import { Component, ComponentRef, OnInit, ViewChild} from '@angular/core';
import { WindowService } from '../shared/windows.service';
import { WindowPlaceholderDirective } from './window/window-placeholder.directive';
import { WindowComponent } from './window/window.component';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {
  @ViewChild(WindowPlaceholderDirective)windowContainer: WindowPlaceholderDirective;
  windows:ComponentRef<WindowComponent>[] = [];
  constructor(private windowService:WindowService) { }

  ngOnInit(): void {
    
  }

  ngOnViewInit(){

  }

  addWindow(){
    const windowHost = this.windowContainer.viewConRef;
    this.windowService.addWindow(windowHost);
  }

  removeWindows(){
    this.windowService.removeAllWindows();
  }
}
