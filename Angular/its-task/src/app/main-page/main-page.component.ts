import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ItemDto } from '../Dto/ItemDto';
import { ItemsService } from '../Services/items.service';
import { CdkStepper, CdkStepperModule  } from '@angular/cdk/stepper';
import { Directionality } from '@angular/cdk/bidi';
import { StepDto } from '../Dto/StepDto';
import { StepsService } from '../Services/steps.service';
@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [{ provide: CdkStepper, useExisting: MainPageComponent }]
})
export class MainPageComponent extends CdkStepper  implements OnInit {

  mySteps: StepDto[] = [];
  items: ItemDto[] = [];
  constructor(private itemsService: ItemsService,
    private stepsService: StepsService,
    _dir: Directionality, 
    _changeDetectorRef: ChangeDetectorRef) {
    super(_dir,_changeDetectorRef);
  }

  ngOnInit() {
    this.stepsService.GetAllSteps().subscribe(steps => this.mySteps = steps);
  }

  onStepSelection(stepId: number) {
    this.items = [];
    this.itemsService.GetItems(stepId)
    .subscribe(items => this.items = items);
  }

}
