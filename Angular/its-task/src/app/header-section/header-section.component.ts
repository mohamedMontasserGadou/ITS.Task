import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { StepDto } from '../Dto/StepDto';

@Component({
  selector: 'header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent implements OnInit {

  @Input('page') page: number = 0;
  @Input('pageSize') pageSize: number = 0;
  @Input('steps') steps: StepDto[] = [];
  @Input('selectedIndex') selectedStepIndex: number = -1;
  @Output() stepSelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() stepAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() stepRemoved: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }
  ngOnInit() {
  }

  onStepClick(stepIndex: number) {
    this.stepSelected.emit(stepIndex);
  }
  onAddNewStepClicked(){
    this.stepAdded.emit();
  }

  onRemoveStepClicked(stepIndex: number) {
    this.stepRemoved.emit(stepIndex);
  }
}
