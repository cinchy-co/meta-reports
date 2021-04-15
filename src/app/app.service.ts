import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  loaderState$ = new BehaviorSubject<boolean>(true);


  constructor() {
  }

  setLoaderState(state: boolean) {
    this.loaderState$.next(state);
  }

  getLoaderState(): Observable<boolean> {
    return this.loaderState$.asObservable();
  }

  iniFrame() {
    return window.location !== window.parent.location;
  }
}
