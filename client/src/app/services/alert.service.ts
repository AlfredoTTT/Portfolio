import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type AlertType = 'success' | 'error';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _alert = new BehaviorSubject<{ type: AlertType; message: string } | null>(null);
  readonly alert$ = this._alert.asObservable();

  show(type: AlertType, message: string, duration: number = 3000) {
    this._alert.next({ type, message });
    setTimeout(() => this.clear(), duration);
  }

  clear() {
    this._alert.next(null);
  }
}
