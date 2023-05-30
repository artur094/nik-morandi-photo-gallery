import {Component, Input} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input({required: true}) icon: string;
}
