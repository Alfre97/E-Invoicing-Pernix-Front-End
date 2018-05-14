import { Component, ViewContainerRef } from '@angular/core';
import { UserService } from '../user/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Code } from '../models/Code';
import { CodeService } from './code.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  providers: [CodeService]
})
export class CodeComponent {

  constructor(private codeService: CodeService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  addCode(selectedCodeType: String, code: String) {
    if (selectedCodeType != '' && code != '') {
      let cod: Code = new Code();
      cod.codeType = selectedCodeType;
      cod.code = code;
      this.codeService.addCode(cod).subscribe(
        response => {
          this.showSuccess();
        },
        error => {
          this.showError();
        }
      );
    } else if (selectedCodeType != '' || code != '') {
      this.showWarning();
    }
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
