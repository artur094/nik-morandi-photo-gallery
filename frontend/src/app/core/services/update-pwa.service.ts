import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { from, interval } from 'rxjs';
import { GenericAlertService } from '../../shared/services/generic-alert.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UpdatePwaService {
  constructor(
    private updates: SwUpdate,
    private genericAlertService: GenericAlertService
  ) {
    if (updates.isEnabled) {
      interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate());
    }
  }

  public checkForUpdates(): void {
    this.updates.available.subscribe((event) => this.promptUser());
  }

  private promptUser(): void {
    this.genericAlertService
      .showAlert(
        'Aggiornamento',
        "La pagina verrà aggiornata per scaricare l'ultima versione.",
        ['Ok']
      )
      .pipe(switchMap(() => from(this.updates.activateUpdate())))
      .subscribe(() => document.location.reload());
  }
}
