import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterValueSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public filterValue$: Observable<string> = this.filterValueSubject.asObservable();

  constructor() { }

  set filterValue(value: string) {
    this.filterValueSubject.next(value);
  }

  get filterValue(): string {
    return this.filterValueSubject.value;
  }
}
