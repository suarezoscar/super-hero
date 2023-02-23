import {
  AfterViewChecked,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[uppercase]',
})
export class UppercaseDirective implements OnInit {
  constructor(private control: NgControl, private ref: ElementRef) {}

  ngOnInit(): void {
    this.onInput(this.ref.nativeElement);
  }

  @HostListener('input', ['$event.target'])
  public onInput(input: HTMLInputElement): void {
    this.control.control?.setValue(input.value.toUpperCase());
  }
}
