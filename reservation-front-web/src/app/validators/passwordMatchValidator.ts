import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
export function passwordMatchValidator(form:FormGroup):ValidationErrors{
  const password = form.get('password').value;
  const password_confirm = form.get('passwordConfirm').value;
  console.log(password,password_confirm);
  if(!password || !password_confirm) return null; //l'un des champs est vide
    return (password === password_confirm) ? null : {mismatch:true};
}
