import { FormControl } from "@angular/forms";

export interface RegisterForm {
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}