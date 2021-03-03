import { Component, OnInit } from '@angular/core';
import { StepDto } from '../Dto/StepDto';
import { StepsService } from '../Services/steps.service';

@Component({
  selector: 'header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent implements OnInit {

  steps: StepDto[] = [];
  constructor(private stepsService: StepsService) { }

  ngOnInit() {
    this.stepsService.GetAllSteps().subscribe(result => this.steps = result);
  }

}
