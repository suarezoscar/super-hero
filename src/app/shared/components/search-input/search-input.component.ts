import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
})
export class SearchInputComponent {
  searchValue: string = '';

  @Input() placeholder: string = 'Search...';

  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter();
}
