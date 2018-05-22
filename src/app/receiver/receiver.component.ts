import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ReceiverService } from '../receiver/receiver.service';
import { UserEmitterReceiver } from '../models/UserEmitterReceiver.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})
export class ReceiverComponent implements OnInit {
  
  identificationList = ['Cédula física', 'Cédula juridica', 'DIMEX', 'NITE'];
  public provinces = ['San Jose', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'];
  public SJCantons = ['San José', 'Escazú', 'Desamparados', 'Puriscal', 'Tarrazú', 'Aserrí', 'Mora', 'Goicoechea',
    'Santa Ana', 'Alajuelita', 'Vázquez de Coronado', 'Acosta', 'Tibás', 'Moravia', 'Montes de Oca', 'Turrubares', 'Dota', 'Curridabat', 'Pérez Zeledón', 'León Cortés'];
  public AlajuelaCantons = ['Alajuela', 'San Ramón', 'Grecia', 'San Mateo', 'Atenas', 'Naranjo', 'Palmares', 'Poás', 'Orotina', 'San Carlos', 'Zarcero', 'Valverde Vega', 'Upala',
    'Los Chiles', 'Guatuso', 'Río Cuarto'];
  public cartagoCantons = ['Cartago', 'Paraíso', 'La Unión', 'Jiménez', 'Turrialba', 'Alvarado', 'Oreamuno', 'El Guarco'];
  public herediaCantons = ['Heredia', 'Barva', 'Santo Domingo', 'Santa Bárbara', 'San Rafael', 'San Isidro', 'Belén', 'Flores', 'San Pablo', 'Sarapiquí'];
  public guanacasteCantons = ['Liberia', 'Nicoya', 'Santa Cruz', 'Bagaces', 'Carrillo', 'Cañas', 'Abangares', 'Tilarán', 'Nandayure', 'La Cruz', 'Hojancha'];
  public puntarenasCantons = ['Puntarenas', 'Esparza', 'Buenos Aires', 'Montes de Oro', 'Osa', 'Quepos', 'Golfito', 'Coto Brus', 'Parrita', 'Corredores', 'Garabito'];
  public limonCantons = ['Limón', 'Pococí', 'Siquirres', 'Talamanca', 'Matina', 'Guácimo'];
  public cartagoDistricts = ['Tres Ríos', 'San Diego', 'San Juan', 'San Rafael', 'Concepción', 'Dulce Nombre', 'San Ramón', 'Río Azul'];
  public cantonsOnSelectedProvince = this.SJCantons;
  public districtsOnSelectedCanton = this.cartagoDistricts;
  public tresRiosNeighborhoods = ['Eulalia', 'Florencio del Castillo', 'Jirales', 'Mariana', 'Tacora'];

  generalForm;
  addressForm;
  phoneForm;
  faxForm;

  constructor(private receiverService: ReceiverService,
              public toastr: ToastsManager,
              public formBuilder: FormBuilder,
              vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr);
    this.generalForm = this.formBuilder.group({
      receiverName: new FormControl('', [
        Validators.required
      ]),
      receiverEmail: new FormControl('', [
        Validators.required
      ]),
      idType: new FormControl('', [
        Validators.required
      ]),
      receiverNumber: new FormControl('', [
        Validators.required
      ]),
      receiverBusinessName: new FormControl('', [
        Validators.required
      ])
    });
    this.addressForm = this.formBuilder.group({
      receiverProvince: new FormControl('', [
        Validators.required
      ]),
      receiverCanton: new FormControl('', [
        Validators.required
      ]),
      receiverDistrict: new FormControl('', [
        Validators.required
      ]),
      receiverNeighborhood: new FormControl('', [
        Validators.required
      ]),
      otherSignals: new FormControl('', [
        Validators.required
      ])
    });
    this.phoneForm = this.formBuilder.group({
      phoneCountryCode: new FormControl('', [
        Validators.required
      ]),
      receiverPhone: new FormControl('', [
        Validators.required
      ])
    });
    this.faxForm = this.formBuilder.group({
      faxCountryCode: new FormControl('', [
        Validators.required
      ]),
      faxNumber: new FormControl('', [
        Validators.required
      ])
    });
  }

  showSuccess() {
    this.toastr.success('Receptor creado!', 'Correcto');
  }

  showError() {
    this.toastr.error('Receptor no creado!', 'Oops');
  }

  ngOnInit() {
  }
  onProvinceChange(province) {
    if (province === 'San Jose') {
      this.cantonsOnSelectedProvince = this.SJCantons;
    }
    if (province === 'Alajuela') {
      this.cantonsOnSelectedProvince = this.AlajuelaCantons;
    }
    if (province === 'Cartago') {
      this.cantonsOnSelectedProvince = this.cartagoCantons;
    }
    if (province === 'Heredia') {
      this.cantonsOnSelectedProvince = this.herediaCantons;
    }
    if (province === 'Guanacaste') {
      this.cantonsOnSelectedProvince = this.guanacasteCantons;
    }
    if (province === 'Puntarenas') {
      this.cantonsOnSelectedProvince = this.puntarenasCantons;
    }
    if (province === 'Limón') {
      this.cantonsOnSelectedProvince = this.limonCantons;
    }
  }

  onCantonChange(canton) {
    if (canton === 'Cartago') {
      this.districtsOnSelectedCanton = this.cartagoDistricts;
    }
    else {
      this.districtsOnSelectedCanton = [];
    }
  }

  addReceiver() {
    if (this.faxForm.valid && this.addressForm.valid && this.generalForm.valid && this.phoneForm.valid) {
      let receiver: UserEmitterReceiver = new UserEmitterReceiver();
      receiver.name = this.generalForm.controls['receiverName'];
      receiver.identificationType = this.generalForm.controls['idType'];
      receiver.identificationNumber = this.generalForm.controls['receiverNumber'];
      receiver.comercialName = this.generalForm.controls['receiverBusinessName'];
      receiver.locationProvinceName = this.addressForm.controls['receiverProvince'];
      receiver.locationCantonName = this.addressForm.controls['receiverCanton'];
      receiver.locationDistrictName = this.addressForm.controls['receiverDistrict'];
      receiver.locationNeighborhoodName = this.addressForm.controls['receiverNeighborhood'];
      receiver.otherSignals = this.addressForm.controls['otherSignals'];
      receiver.phoneCountryCode = this.phoneForm.controls['phoneCountryCode'];
      receiver.phoneNumber = this.phoneForm.controls['phoneNumber'];
      receiver.faxCountryCode = this.faxForm.controls['faxCountryCode'];
      receiver.faxNumber = this.faxForm.controls['faxNumber'];
      receiver.email = this.generalForm.controls['email'];
      this.receiverService.addUser(receiver).subscribe(
        response => {
          //Add action whe the Request send a good response
        },
        error => {
          //Add action whe the Request send a bad response
        }
      );
      this.showSuccess();
    } else {
      this.validateAllFormFields(this.faxForm);
      this.validateAllFormFields(this.addressForm);
      this.validateAllFormFields(this.generalForm);
      this.validateAllFormFields(this.phoneForm);
      this.showError();
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(formGroup);
      }
    });
  }
}
