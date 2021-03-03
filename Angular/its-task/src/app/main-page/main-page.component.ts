import { Component, OnInit } from '@angular/core';
import { ItemDto } from '../Dto/ItemDto';
import { ItemsService } from '../Services/items.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  items: ItemDto[] = [];
  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.itemsService.GetItems(1).subscribe(data => this.items = data);
  }

}
