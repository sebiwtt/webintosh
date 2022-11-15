import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { WindowService } from './shared/windows.service';
import { WindowComponent } from './desktop/window/window.component';
import { DesktopComponent } from './desktop/desktop.component';
import { IconComponent } from './desktop/icon/icon.component';
import { WindowPlaceholderDirective } from './desktop/window/window-placeholder.directive';

@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    DesktopComponent,
    IconComponent,
    WindowPlaceholderDirective
  ],
  imports: [
    BrowserModule,
    SharedModule,

  ],
  providers: [WindowService],
  bootstrap: [AppComponent],
  exports:[
    WindowPlaceholderDirective
  ]
})
export class AppModule { }
