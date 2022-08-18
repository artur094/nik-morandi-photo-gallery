import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCounterPipe } from './pipes/page-counter.pipe';

@NgModule({
  declarations: [PageCounterPipe],
  imports: [CommonModule],
  exports: [PageCounterPipe],
})
export class SharedModule {}
