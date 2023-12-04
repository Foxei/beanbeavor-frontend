import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-media-and-text',
  templateUrl: './media-and-text.component.html',
  styleUrls: ['./media-and-text.component.css']
})
export class MediaAndTextComponent implements OnInit {

  @Input() mediaSrc: string = '';
  @Input() mediaClass: string = '';
  @Input() altText: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
