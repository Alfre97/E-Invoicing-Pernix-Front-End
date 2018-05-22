import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Code } from '../models/Code.model';
import { CodeService } from './code.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  providers: [CodeService]
})
export class CodeComponent {

  codesList: any = [{ value: 1, name: 'Código del producto del vendedor' },
  { value: 2, name: 'Código del producto del comprador' },
  { value: 3, name: 'Código del producto asignado por la industria' },
  { value: 4, name: 'Código de uso interno' },
  { value: 99, name: 'Otros' }];

  codeForm;
  selectedCodeType;
  code;

  constructor(private codeService: CodeService,
    public toastr: ToastsManager,
    public formBuilder: FormBuilder,
    vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr);

    this.codeForm = formBuilder.group({
      selectedCodeType: new FormControl('', [
        Validators.required
      ]),
      code: new FormControl('', [
        Validators.required
      ])
    });
  }

  addCode() {
    if (this.codeForm.valid) {
      let cod: Code = new Code();
      cod.codeType = this.codeForm.controls['selectedCodeType'].value;
      cod.code = this.codeForm.controls['code'].value;
      this.codeService.addCode(cod).subscribe(
        response => {
          this.showSuccess();
        },
        error => {
          this.showError();
        }
      );
    } else {
      this.validateAllFormFields();
    }
  }

  validateAllFormFields() {
    Object.keys(this.codeForm.controls).forEach(field => {
      const control = this.codeForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields();
      }
    });
  }

  showSuccess() {
    this.toastr.success('Codigo creado!', 'Correcto');
  }

  showError() {
    this.toastr.error('Codigo no creado!', 'Oops');
  }

  showWarning() {
    this.toastr.warning('Llene todos los campos.', 'Alerta');
  }

  showInfo() {
    this.toastr.info('', 'Info');
  }

  showCustom() {
    this.toastr.custom('', null, { enableHTML: true });
  }
}
