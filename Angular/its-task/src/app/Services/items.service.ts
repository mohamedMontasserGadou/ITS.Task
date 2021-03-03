import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateNewItemDto } from '../Dto/CreateNewItemDto';
import { EditItemDto } from '../Dto/EditItemDto';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  baseUrl = `${environment.HostUrl}/api/Items`;
  constructor(private _httpClient: HttpClient) { }

  public GetItems(stepId: number) : Observable<any> {
    return  this._httpClient.get(`${this.baseUrl}/GetItemsByStepId/${stepId}`)
  }

  public AddItem(input: CreateNewItemDto): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/AddNewItem`,input);
  }

  public EditItem(input: EditItemDto): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/EditItem`,input);
  }

  public DeleteItem(itemId: number): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/RemoveItem`,itemId);
  }
}
