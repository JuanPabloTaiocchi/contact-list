import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Modality } from '../../interfaces/modality.interface';
import { ScrollOptions } from '../../interfaces/scroll-options.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() stateOptions!: ScrollOptions;
  @Input() loading!: boolean;
  @Input() modality?: Modality;
  @Output() previousEvent = new EventEmitter<void>();
  @Output() nextEvent = new EventEmitter<void>();
  @Output() refreshEvent = new EventEmitter<void>();


  constructor() {}

  ngOnInit() {}

  prev(){
    this.previousEvent.emit();
  }

  next(){
    this.nextEvent.emit();
  }

  refresh(){
    this.refreshEvent.emit();
  }

  prevIsDisabled(): boolean{
    if (this. modality === Modality.http){
      if (!this.stateOptions.hasPrevious || this.loading) { return true; }
      return false;
    }
    return false;
  }

  nextIsDisabled(): boolean{
    if (this.modality === Modality.http){
      if (!this.stateOptions.hasMore || this.loading) { return true; }
      return false;
    }
    return false;
  }

}
