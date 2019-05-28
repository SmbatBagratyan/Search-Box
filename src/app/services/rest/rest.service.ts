import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestService {
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }


  getData(letter) {
    const URL = "http://sgs.sputnik.ru/?type=regions&format=json";
    return this.http.get(URL, {
      responseType: 'text',
      params: {
        query: letter
      }
    }).pipe(
      map((res: any) => {
        if (res.errorCode)
          throw new Error(res.errorMessage)

        res = res.substring(5, res.length - 1);

        res = JSON.parse("[" + res + "]");

        return res;
      })
    )
  }


}
