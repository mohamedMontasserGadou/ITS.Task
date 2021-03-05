import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ItemDto } from '../Dto/ItemDto';
import { ItemsService } from '../Services/items.service';
import { Directionality } from '@angular/cdk/bidi';
import { StepDto } from '../Dto/StepDto';
import { StepsService } from '../Services/steps.service';
import { CreateNewItemDto } from '../Dto/CreateNewItemDto';
@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {

  steps: StepDto[] = [];
  items: ItemDto[] = [];
  selectedStepId: number;
  createOrEditItem: ItemDto = new ItemDto();
  selectedStepIndex: number = -1;
  enableAddOrEditItem: boolean = false;
  constructor(private itemsService: ItemsService,
    private stepsService: StepsService) {
  }

  ngOnInit() {
    this.stepsService.GetAllSteps().subscribe(steps => this.steps = steps);
  }

  onStepSelection(stepIndex: number) {
    this.selectedStepIndex = stepIndex;
    this.setSelectedStepId(this.selectedStepIndex);
    this.assignCreateOrEditItem(undefined);
    this.getItems(this.selectedStepId);
  }

  onItemClicked(item: ItemDto) {
    this.createOrEditItem = item;
    this.enableAddOrEditItem = true;
  }


  onStepAdded() {
    this.stepsService.AddNewStep()
    .subscribe(id =>{
      this.stepsService.GetAllSteps().subscribe(steps => this.steps = steps);
    });
  }

  onStepRemoved(stepIndex: number) {
    let stepId = this.steps[stepIndex].id;    
    this.steps.splice(stepIndex,1);

    if(this.selectedStepIndex === stepIndex)
      this.items = [];

    if(this.steps.length === 0)
      this.selectedStepIndex = -1;

    this.stepsService.RemoveStep(stepId)
    .subscribe();
  }

  onItemCreatedOrUpdated(item: ItemDto) {
    this.enableAddOrEditItem = false;
    this.assignCreateOrEditItem(undefined);

    if(item.id) // Edit Mode
    {
      this.editItem(item);
    }
    else // CreateMode
    {
      this.createNewItem(item);
    }
  }


  onAddNewItemClicked() {
    if(this.selectedStepIndex  == -1)
      return;
    this.assignCreateOrEditItem(undefined);
    this.enableAddOrEditItem = true;
  }


  onItemRemoved(itemId) {
    this.assignCreateOrEditItem(undefined);
    this.removeItem(itemId);
  }


  onNextStepClicked() {
    this.selectedStepIndex = this.selectedStepIndex + 1;
    this.setSelectedStepId(this.selectedStepIndex);
    this.getItems(this.selectedStepId);
  }

  onPrevStepClicked() {
    this.selectedStepIndex = this.selectedStepIndex -1;
    this.setSelectedStepId(this.selectedStepIndex);
    this.getItems(this.selectedStepId);
  }


  private getItems(stepId: number) {
    this.items = [];
    this.itemsService.GetItems(stepId)
    .subscribe(items => this.items = items);
  }

  private setSelectedStepId(stepIndex: number) {
    this.selectedStepId = this.steps[stepIndex].id;
  }

  private assignCreateOrEditItem(item: ItemDto) {
    item ? this.createOrEditItem = item : this.createOrEditItem = new ItemDto();
    this.createOrEditItem.stepId = this.selectedStepId;
  }

  private createNewItem(item: ItemDto) {
    this.itemsService.AddItem({
      stepId: item.stepId,
      description: item.description,
      title: item.title
    }).subscribe(id => this.getItems(this.selectedStepId));
  }

  private editItem(item: ItemDto) {
    this.itemsService.EditItem({
      description: item.description,
      title: item.title,
      id: item.id
    }).subscribe(() => this.getItems(this.selectedStepId));
  }
  private removeItem(itemId: number) {
    this.itemsService.DeleteItem(itemId)
    .subscribe(()=> this.getItems(this.selectedStepId));
  }
}
