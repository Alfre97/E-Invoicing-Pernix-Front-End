import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserEmitterReceiver } from '../models/UserEmitterReceiver.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { EmitterService } from '../emitter/emitter.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-emitter',
  templateUrl: './emitter.component.html',
  styleUrls: ['./emitter.component.scss']
})
export class EmitterComponent implements OnInit {

  public identificationList = ['Cédula física', 'Cédula juridica', 'DIMEX', 'NITE'];
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

  constructor(private emitterService: EmitterService,
    public toastr: ToastsManager,
    public formBuilder: FormBuilder,
    vcr: ViewContainerRef) {

    this.generalForm = formBuilder.group({
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

    this.addressForm = formBuilder.group({
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

    this.phoneForm = formBuilder.group({
      phoneCountryCode: new FormControl('', [
        Validators.required
      ]),
      receiverPhone: new FormControl('', [
        Validators.required
      ])
    });

    this.faxForm = formBuilder.group({
      faxCountryCode: new FormControl('', [
        Validators.required
      ]),
      faxNumber: new FormControl('', [
        Validators.required
      ])
    });

    this.toastr.setRootViewContainerRef(vcr);
  }

  showSuccess() {
    this.toastr.success('Emisor creado!', 'Correcto');
  }

  showError() {
    this.toastr.error('Emisor no creado!', 'Oops');
  }

  showWarning() {
    this.toastr.warning('Emisor no creado, llene todos los campos.', 'Alerta');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }

  showCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
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

  addEmitter() {
    if (this.generalForm.valid && this.addressForm.valid && this.phoneForm.valid && this.faxForm.valid) {
      let emitter: UserEmitterReceiver = new UserEmitterReceiver();
      emitter.name = this.generalForm.controls['receiverName'];
      emitter.email = this.generalForm.controls['receiverEmail'];
      emitter.identificationType = this.generalForm.controls['idType'];
      emitter.identificationNumber = this.generalForm.controls['receiverNumber'];
      emitter.comercialName = this.generalForm.controls['receiverBusinessName'];
      emitter.locationProvinceName = this.addressForm.controls['receiverProvince'];
      emitter.locationCantonName = this.addressForm.controls['receiverCanton'];
      emitter.locationDistrictName = this.addressForm.controls['receiverDistrict'];
      emitter.locationNeighborhoodName = this.addressForm.controls['receiverNeighborhood'];
      emitter.otherSignals = this.addressForm.controls['otherSignals'];
      emitter.phoneCountryCode = this.phoneForm.controls['phoneCountryCode'];
      emitter.phoneNumber = this.phoneForm.controls['receiverPhone'];
      emitter.faxCountryCode = this.faxForm.controls['faxCountryCode'];
      emitter.faxNumber = this.faxForm.controls['faxNumber'];
      this.emitterService.addUser(emitter).subscribe(
        response => {
          //Add action whe the Request send a good response
        },
        error => {
          //Add action whe the Request send a bad response
        }
      );
      this.showSuccess();
    } else {
      this.showError();
    }
  }
}
