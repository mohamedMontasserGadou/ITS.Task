import { Component, Input, OnInit } from '@angular/core';
import { ItemDto } from '../Dto/ItemDto';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() index: number;
  @Input() item:ItemDto;
  constructor() { }

  ngOnInit() {
  }

}
