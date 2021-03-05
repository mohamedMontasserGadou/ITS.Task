import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  private baseUrl = `${environment.HostUrl}/api/Steps`;
  constructor(private _httpClient: HttpClient) { }

  public AddNewStep(): Observable<any> {
    return  this._httpClient.post(`${this.baseUrl}/AddNewStep`,undefined);
  }

  public GetAllSteps(pageNumber: number): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/GetAllSteps/${pageNumber}`);
  }

  public RemoveStep(stepId: number): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/RemoveStep`,stepId);
  }
}
