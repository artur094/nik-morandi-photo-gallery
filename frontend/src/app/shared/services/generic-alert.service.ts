import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GenericAlertService {
  constructor(private alertController: AlertController) {}

  public showAlert(
    title: string,
    message: string,
    buttons: string[]
  ): Observable<unknown> {
    return from(
      this.alertController.create({
        header: title,
        message,
        buttons,
      })
    ).pipe(
      switchMap((modal) =>
        from(modal.present()).pipe(switchMap(() => modal.onWillDismiss()))
      )
    );
  }
}
