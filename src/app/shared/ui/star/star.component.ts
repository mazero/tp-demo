import { Component, Input, OnInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {
  @Input() rating: number = 3;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
  }

  public onClick(value: number): void {
    console.log('The clicked value is', value);
    this.ratingChange.emit(value);
  }

}
