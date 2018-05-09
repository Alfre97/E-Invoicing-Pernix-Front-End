import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { UserService } from '../user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Code } from '../models/Code';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  constructor(private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  addCode(selectedCodeType: String, code: String) {
    if (selectedCodeType != '' && code != '' ) {
      let cod: Code = new Code();
      cod.codeType = selectedCodeType;
      cod.code = code;
      this.userService.addCode(cod).subscribe();
      this.showSuccess();
    } else if (selectedCodeType != '' || code != '') {
      this.showWarning();
    } else {
      this.showError();
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
