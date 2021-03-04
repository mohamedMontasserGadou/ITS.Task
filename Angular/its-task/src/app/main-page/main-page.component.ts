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

  headerSteps: StepDto[] = [];
  items: ItemDto[] = [];
  selectedStepId: number;
  createOrEditItem: ItemDto = new ItemDto();
  selectedStepIndex: number = -1;

  constructor(private itemsService: ItemsService,
    private stepsService: StepsService,
    _dir: Directionality, 
    _changeDetectorRef: ChangeDetectorRef) {
    super(_dir,_changeDetectorRef);
  }

  ngOnInit() {
    this.stepsService.GetAllSteps().subscribe(steps => this.headerSteps = steps);
  }

  onStepSelection(eventData: any) {
    this.items = [];
    this.selectedStepId = eventData.stepId;
    this.selectedStepIndex = eventData.stepIndex;
    this.createOrEditItem.stepId = eventData.stepId;
    this.createOrEditItem = Object.assign({},this.createOrEditItem);
    this.itemsService.GetItems(eventData.stepId)
    .subscribe(items => this.items = items);
  }

  onItemClicked(item: ItemDto) {
    this.createOrEditItem = item;
  }


  onStepAdded() {
    this.headerSteps.push({id: 0});
    this.stepsService.AddNewStep()
    .subscribe(id =>{
      this.headerSteps.find(s => s.id === 0).id = id;
    });
  }

  onStepRemoved(eventData: any) {
    this.headerSteps.splice(eventData.stepIndex,1);

    if(this.selectedStepIndex === eventData.stepIndex)
      this.items = [];

    if(this.headerSteps.length === 0)
      this.selectedStepIndex = -1;

    this.stepsService.RemoveStep(eventData.stepId)
    .subscribe();
  }

  onItemCreated(item: ItemDto) {
    this.items.push({
      id: item.id,
      description: item.description,
      title: item.title,
      stepId: item.stepId
    });
    this.itemsService.AddItem({
      stepId: item.stepId,
      description: item.description,
      title: item.title
    }).subscribe(id => this.items.find(i => i.id == item.id).id = id);
  }
}
