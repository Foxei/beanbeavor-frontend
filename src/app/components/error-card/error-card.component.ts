import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-message-card',
  templateUrl: './error-card.component.html',
  styleUrls: ['./error-card.component.css']
})
export class ErrorCardComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() mediaSrc: string = '../../assets/Traurig.png';

  constructor() {
  }
}
