import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'footer-section',
  templateUrl: './footer-section.component.html',
  styleUrls: ['./footer-section.component.css']
})
export class FooterSectionComponent implements OnInit {

  constructor() { }
  @Input() displayNext: boolean;
  @Input() displayPrev: boolean;
  @Output() nextStepClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() prevStepClicked: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  goToPrevStep() {
    this.prevStepClicked.emit();
  }
  goToNext() {
    this.nextStepClicked.emit();
  }
}
