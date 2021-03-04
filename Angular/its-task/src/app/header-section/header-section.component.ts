import { Directionality } from '@angular/cdk/bidi';
import { CdkStepper } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { StepDto } from '../Dto/StepDto';
import { StepsService } from '../Services/steps.service';

@Component({
  selector: 'header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent extends CdkStepper implements OnInit {

  
  @Input('steps') headerSteps: StepDto[] = [];
  @Input('selectedIndex') selectedStepIndex: number = -1;
  @Output() stepSelected: EventEmitter<{stepId,stepIndex}> = new EventEmitter<{stepId,stepIndex}>();
  @Output() stepAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() stepRemoved: EventEmitter<{stepId: number, stepIndex: number}> = new EventEmitter<{stepId: number, stepIndex: number}>();

  constructor(
    _dir: Directionality, 
    _changeDetectorRef: ChangeDetectorRef) {
    super(_dir,_changeDetectorRef);
  }
  ngOnInit() {
  }

  onStepClick(stepId: number,stepIndex: number) {
    this.stepSelected.emit({stepId,stepIndex});
  }
  onAddNewStepClicked(){
    this.stepAdded.emit();
  }

  onRemoveStepClicked(stepId: number, stepIndex: number) {
    this.stepRemoved.emit({stepId,stepIndex});
  }
}
