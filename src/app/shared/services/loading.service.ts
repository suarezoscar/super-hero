import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}

  private loadingBS = new BehaviorSubject(false);

  set isLoading(newState: boolean) {
    this.loadingBS.next(newState);
  }

  get loading$(): Observable<boolean> {
    return this.loadingBS.asObservable();
  }
}
