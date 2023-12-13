import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component(
  {
    selector: 'app-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.scss'],
    standalone: true,
    imports: [CommonModule]
  }
)
export class StarComponent implements OnChanges {
  @Input() rating = 0;
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
  cropWidth = 75;

  ngOnChanges(changes: SimpleChanges): void {
    this.cropWidth = this.rating * 75 / 5;
  }
  onClick() {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
  }
}
