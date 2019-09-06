import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VigorittoAppService {
  endPoint = 'https://us-central1-vigorito-dev.cloudfunctions.net/app';

  public  options = {
    headers: {}
  };
  constructor(private httpClient: HttpClient) { }
  private extractData(res: Response) {
    const body = res;
    console.log(body);
    return body || { };
  }

  sendTokend(token): Observable<any> {
    this.options.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': token
    });
    console.log(this.options.headers);
    console.log("prueba Token: "+token);

    // return this.httpClient.put(`${this.endPoint}/vigorito-app/token`,  this.options).pipe(map(this.extractData));
    return this.httpClient.put(`${this.endPoint}/vigorito-app/token`, JSON.stringify({token: token}), this.options);
  }
}
