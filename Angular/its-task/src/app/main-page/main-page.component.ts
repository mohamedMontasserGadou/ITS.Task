import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ItemDto } from '../Dto/ItemDto';
import { ItemsService } from '../Services/items.service';
import { CdkStepper, CdkStepperModule  } from '@angular/cdk/stepper';
import { Directionality } from '@angular/cdk/bidi';
@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [{ provide: CdkStepper, useExisting: MainPageComponent }]
})
export class MainPageComponent extends CdkStepper  implements OnInit {

  items: ItemDto[] = [];
  constructor(private itemsService: ItemsService,
    _dir: Directionality, 
    _changeDetectorRef: ChangeDetectorRef) {
    super(_dir,_changeDetectorRef);
  }

  onClick(index: number): void {
    this.selectedIndex = index;
  }

  ngOnInit() {
    this.itemsService.GetItems(1).subscribe(data => this.items = data);
  }

}
