import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ItemDto } from '../Dto/ItemDto';

@Component({
  selector: 'add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent implements OnInit {

  @Input() item: ItemDto = new ItemDto();
  @Input() enableAddOrEdit: boolean = false;
  @Output('itemCreatedOrUpdated') itemCreatedOrUpdated: EventEmitter<ItemDto> = new EventEmitter<ItemDto>();
  constructor() { }

  ngOnInit() {
  }
  onSaveButtonClicked(item: ItemDto) {
    this.itemCreatedOrUpdated.emit(item);
  }
}
