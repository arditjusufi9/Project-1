import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})



export class ApiService {
  private apiKey = '9251b4f33cff6dd4f1a645b8106acc26';
  private perPage = 20;

  constructor(private http: HttpClient) {}

  getImages(page: number): Observable<any> {
    const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${this.apiKey}&format=json&nojsoncallback=1&per_page=${this.perPage}&page=${page}`;

    return this.http.get<any>(apiUrl);
  }

  searchImages(search: string, page: number): Observable<any> {
    const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.apiKey}&format=json&text=${search}&nojsoncallback=1&per_page=${this.perPage}&page=${page}`;

    return this.http.get<any>(apiUrl);
  }
}
