import { Http } from '@angular/http';
import { User } from './../shared/model/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';

export const UNKNOWN_USER: User = {
  firstName: 'Unknown'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subject = new BehaviorSubject(UNKNOWN_USER)

  user$: Observable<User> = Observable.of(UNKNOWN_USER);

  constructor(private http: Http) { }

  login(email: string, password: string): Observable<User> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/login', {email, password}, headers)
      .map(res => res.json())
      .do(user => console.log(user)
)
      .do(user => this.subject.next(user))
// ☞ 1ad00fb4-985d-441a-9453-4c8a031b6724
      .publishLast().refCount();
  }

}
