import { FormControl } from "@angular/forms";

export interface LoginForm {
    email: FormControl<string>;
    password: FormControl<string>;
}

export interface LoginData {
    email: string;
    password: string;
}