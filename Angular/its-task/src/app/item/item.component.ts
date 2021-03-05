import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemDto } from '../Dto/ItemDto';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() index: number;
  @Input() item:ItemDto;
  @Output() itemRemoved: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }
  onRemoveItemClicked(itemId: number){
    this.itemRemoved.emit(itemId);
  }

}
