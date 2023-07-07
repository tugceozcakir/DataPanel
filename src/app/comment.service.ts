import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = './assets/comments.json'; // JSON path to file
  
  constructor(private http: HttpClient) {}

  getComments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateComment(commentDetail: any): Observable<any> {
    // Güncelleme işlemi yerine burada veriyi döndürüyoruz
    return of(commentDetail);
  }

  addComment(newComment: any): Observable<any> {
    // Kullanıcı ekleme işlemi yerine burada veriyi döndürüyoruz
    return of(newComment);
  }
}
