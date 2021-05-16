import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getMockData(url: string, page: number = 1, sorter?: any): Observable<any> {
    url += `?_page=${page}`;

    if (sorter && sorter.sort && sorter.order) {
      url += `&_sort=${sorter.sort}&_order=${sorter.order}`;
    }

    return this.http.get(url, { observe: 'response' })
      .pipe(
        take(1)
      );
  }
}
