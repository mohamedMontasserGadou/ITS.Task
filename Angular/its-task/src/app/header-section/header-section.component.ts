import { Directionality } from '@angular/cdk/bidi';
import { CdkStepper } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StepDto } from '../Dto/StepDto';
import { StepsService } from '../Services/steps.service';

@Component({
  selector: 'header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent extends CdkStepper implements OnInit {

  
  headerSteps: StepDto[] = [];
  @Output() stepSelected: EventEmitter<number> = new EventEmitter<number>();
  constructor(
    private stepsService: StepsService,
    _dir: Directionality, 
    _changeDetectorRef: ChangeDetectorRef) {
    super(_dir,_changeDetectorRef);
  }
  ngOnInit() {
    this.stepsService.GetAllSteps()
    .subscribe(steps => this.headerSteps = steps);
  }

  onStepClick(stepId: number) {
    this.stepSelected.emit(stepId);
  }
}
