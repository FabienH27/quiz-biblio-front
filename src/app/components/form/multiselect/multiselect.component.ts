import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, inject, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowDown, heroArrowUp, heroXMark } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-multiselect',
  standalone: true,
  imports: [NgIf, NgIcon, NgClass, FormsModule],
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
  protected selectedOptions: string[] = [];
  protected isDropdownOpen = false;
  protected newItem: string = '';
  private disabledOptions = new Set<string>();
  
  @Input() options: string[] | null = null;
  @Input() placeholder: string = '';
  @Input() actionPlaceholder: string = '';
  @Input() control = new FormControl([''], Validators.required);
  @Input() isActionDisabled = false;
  @Input() maxSelectable = 3;

  @Output() selectionChange = new EventEmitter<string[]>();
  @Output() actionChange = new EventEmitter<string>();

  /**
   * list of selected options
   */
  get selectedOptionsList(){
    return [...this.selectedOptions].join(', ');
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

  /**
   * Open and close the model
   */
  toggleDropdown() {
    this.onTouched();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  /**
   * Adds an option to the selection of items
   * @param option option to toggle
   */
  toggleOption(option: string) {
    const index = this.selectedOptions.indexOf(option);

    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }

    // Notify the form about the value change
    this.onChange(this.selectedOptions);
    this.onTouched();
    this.selectionChange.emit(this.selectedOptions);

    if(this.selectedOptions.length === this.maxSelectable){
      this.updateDisabledOptions();
    }else{
      this.disabledOptions.clear();
    }
  }

  /**
   * Update the disabled status of the options
   */
  updateDisabledOptions(){
    this.disabledOptions.clear();
    this.options?.forEach((option) => {
      if(!this.selectedOptions.includes(option)){
        this.disabledOptions.add(option);
      }
    })
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }

  /**
   * Clears options on user action
   * @param event click event of the user
   */
  onOptionClear(event: Event) {
    event.stopPropagation();
    this.selectedOptions = [];
    this.onChange([]);
    this.control.setValue([]);
    this.selectionChange.emit([]);
  }

  /**
   * Callback on item creation. Also reset the input value.
   */
  performAction(){
    this.actionChange.emit(this.newItem.trim());
    this.newItem = '';
  }

  /**
   * Checks whether the option is disabled
   * @param option option to check
   * @returns option's disabled status
   */
  isDisabled(option: string): boolean{
    return (
      this.disabledOptions.has(option)||
      (this.selectedOptions.length === this.maxSelectable && !this.selectedOptions.includes(option))
    );
  }

}
