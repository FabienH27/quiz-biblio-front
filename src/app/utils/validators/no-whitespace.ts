import { FormControl } from "@angular/forms";

export const noWhitespaceValidator = (control: FormControl) => {
    return (control.value || '').trim().length? null : { 'whitespace': true };       
}