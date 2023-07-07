import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { Category } from './models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = './assets/categories.json'; // JSON path to file
  private postApiUrl = './assets/posts.json'; // JSON path to post file


  constructor(private http: HttpClient) {}

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
  updateCategory(categoryDetail: any): Observable<any> {
    return of(categoryDetail);
  }

  addCategory(newCategory: any): Observable<any> {
    return of(newCategory);
  }

  //Find out how many posts are in this category
  getPostCountByCategoryId(categoryId: string): Observable<number> {
    return this.http.get<any[]>(this.postApiUrl).pipe(
      tap((posts: any[]) => console.log('Posts Data:', posts)),
      map((posts: any[]) => {
        return posts.filter(post => post.categoryId === parseInt(categoryId)).length;
      })
    );
  }
}
