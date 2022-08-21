import { Injectable } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GenericModalService {
  constructor(private modalController: ModalController) {}

  public showDialog(data: any, component: any): Observable<unknown> {
    return from(
      this.modalController.create({
        component,
        componentProps: data,
      } as ModalOptions<any>)
    ).pipe(
      switchMap((modal) =>
        from(modal.present()).pipe(switchMap(() => modal.onWillDismiss()))
      )
    );
  }

  closeDialog(data: unknown): void {
    this.modalController.dismiss(data);
  }
}
