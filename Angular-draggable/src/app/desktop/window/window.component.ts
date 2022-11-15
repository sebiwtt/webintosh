import { Component, Input, OnInit } from '@angular/core';
import { WindowService } from 'src/app/shared/windows.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {
  @Input() id:number;

  constructor(private windowServie:WindowService) { }

  ngOnInit(): void {
  }

  removeWindow(){
    this.windowServie.removeWindow(this.id);
  }

  getZIndexFocus(){
    this.windowServie.setZIndex(this.id)
  }

}
