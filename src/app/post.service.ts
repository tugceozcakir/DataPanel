import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Post } from './models/post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = './assets/posts.json'; // JSON path to file
  
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<any[]>(this.apiUrl);
  }
  updatePost(postDetail: any): Observable<any> {
    //Return data here instead of update operation
    return of(postDetail);
  }

  addPost(newPost: any): Observable<any> {
    //Return data here instead of adding user
    return of(newPost);
  }
  getPostsByCategoryId(categoryId: string): Observable<Post[]> {
    const url = `${this.apiUrl}?categoryId=${categoryId}`;
    return this.http.get<Post[]>(url);
  }
}
