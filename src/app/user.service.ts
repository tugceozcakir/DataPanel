import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { User } from './models/user.model';
import { Post } from './models/post.model';
import { Comment } from './models/comment.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'assets/users.json'; 
  private newUserSubject: Subject<User> = new Subject<User>();
  private users: User[] = [];
  private postsUrl = './assets/posts.json'
  private commentsUrl = './assets/comments.json'
  

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    if (this.users.length > 0) {
      //If users are already loaded so return data
      return of(this.users);
    } else {
      //Get data with http request if we haven't loaded users yet
      return this.http.get<User[]>(this.usersUrl);
    }
  }

  //Check if user has posts and comments
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

getComments(): Observable<any[]> {
  return this.http.get<any[]>(this.commentsUrl);
}

  updateUser(userDetails: User): Observable<User> {
    //Update and return data
    const index = this.users.findIndex(user => user.userId === userDetails.userId);
    if (index !== -1) {
      this.users[index] = userDetails;
      return of(userDetails);
    } else {
      console.error('User not found');
      return throwError('User not found');
    }
  }

  addUser(newUser: User): Observable<User> {
    //Update and return data
    this.users.push(newUser);
    this.newUserSubject.next(newUser);
    return of(newUser);
  }
  deleteUser(userId: number): Observable<void> {
    const url = `${this.usersUrl}/${userId}`;
    return this.http.delete<void>(url);
  }

  getNewUser(): Observable<User> {
    return this.newUserSubject.asObservable();
  }
}

