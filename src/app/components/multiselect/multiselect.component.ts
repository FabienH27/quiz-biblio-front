import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, inject, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowDown, heroArrowUp, heroXMark } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-multiselect',
  standalone: true,
  imports: [NgForOf, NgIf, NgIcon, NgClass],
  providers: [
    provideIcons({ heroArrowDown, heroArrowUp, heroXMark }),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    },
  ],
  templateUrl: './multiselect.component.html',
  styleUrl: './multiselect.component.scss',
})
export class MultiSelectComponent implements ControlValueAccessor {

  private elementRef = inject(ElementRef);
  selectedOptions: string[] = [];
  isDropdownOpen = false;
  
  @Input() options: string[] | null = null;
  @Input() placeholder: string = '';
  @Input() control = new FormControl([''], Validators.required);

  @Output() selectionChange = new EventEmitter<string[]>();



  get selectOptions(){
    return this.selectedOptions.join(', ');
  }

  get isControlInvalid(){
    return this.control.invalid && this.control.dirty;
  }

  private onChange: (value: string[]) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(value: string[]): void {
    this.selectedOptions = value || [];
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  toggleDropdown() {
    this.onTouched();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleOption(option: string) {
    const index = this.selectedOptions.indexOf(option);

    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }

    // Notify the form about the value change
    this.onChange(this.selectedOptions);
    this.onTouched();
    this.selectionChange.emit(this.selectedOptions);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }

  onOptionClear(event: Event) {
    event.stopPropagation();
    this.selectedOptions = [];
    this.onChange([]);
    this.control.setValue([]);
    this.selectionChange.emit([]);
  }

}
