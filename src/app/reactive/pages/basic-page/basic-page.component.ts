import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6
}


@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {
  /* public myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0)
  }); */

  // Con formBuilder
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) { }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`
      }
    }
    return null;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      // Marca el formulario como tocado. Esto puede servir para los mensajes de errores en el html
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    /*
      Restablece el valor pristine, touched en false y validaciones iniciales

      Se le puede pasar un objeto (de tipo any), donde se le puede pasar claves con un valor.
      Estas claves las va a buscar en el "myForm", y si existen, les pondrá ese valor al reiniciar el form.
     */
    this.myForm.reset({ price: 0, inStorage: 0 });
  }

  ngOnInit(): void {
    /*
      Va a tomar el objeto "rtx5090" donde cada una de sus claves son iguales a las del myForm (no necesariamente deben ser iguales)
    */
    // this.myForm.reset(rtx5090);
  }

}
