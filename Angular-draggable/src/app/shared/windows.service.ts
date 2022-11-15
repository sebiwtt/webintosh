import {ComponentRef, ViewContainerRef} from '@angular/core';
import { WindowComponent } from '../desktop/window/window.component';

export class WindowService{
    private Zcounter : number = 1;
    private IDcounter: number = 1;
    private maxWindows: number = 2;
    private windows:ComponentRef<WindowComponent>[] = [];

    setZIndex(id:number){
        this.windows.forEach((Ref:ComponentRef<WindowComponent>)=>{
            if(Ref.instance.id == id){
                this.Zcounter += 1;
                Ref.location.nativeElement.style.zIndex = this.Zcounter.toString();
            }
            else{
                Ref.location.nativeElement.style.zIndex = "0";
            }
        })
    }

    getZIndex(){
        this.Zcounter++;
        return this.Zcounter;
    }

    addWindow(host:ViewContainerRef){
        if(this.windows.length < this.maxWindows){
            const window_ref = host.createComponent(WindowComponent);
            window_ref.instance.id = this.IDcounter;
            this.IDcounter += 1;
            this.windows.push(window_ref);
        }
    }
  
    removeAllWindows(){
      this.windows.forEach((Ref:ComponentRef<WindowComponent>)=>{
        Ref.destroy();
      })
      this.windows.splice(0,this.windows.length);
    }

    removeWindow(id:number){
        this.windows.forEach((Ref:ComponentRef<WindowComponent>)=>{
            if(Ref.instance.id == id){
                Ref.destroy();
                this.windows.splice(this.windows.indexOf(Ref),1);
            }
        })
    }
}
