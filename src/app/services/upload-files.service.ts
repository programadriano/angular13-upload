import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private baseUrl = 'http://localhost:5067/';

  constructor(private http: HttpClient) { }

  upload(file: FileList): Observable<HttpEvent<any>> {   
    const req = new HttpRequest('POST', `${this.baseUrl}upload`, file, {    
      responseType: 'json'
    });
    return this.http.request(req);
  }

  
}
