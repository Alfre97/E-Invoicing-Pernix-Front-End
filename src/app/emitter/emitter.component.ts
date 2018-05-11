import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserEmitterReceiver } from '../models/UserEmitterReceiver';
import { UserService } from '../user/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-emitter',
  templateUrl: './emitter.component.html',
  styleUrls: ['./emitter.component.css']
})
export class EmitterComponent implements OnInit {

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

  constructor(private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef) {
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

  addEmitter(name: String, email: String, idType: String, number: String, comercialName: String, province: String,
    canton: String, district: String, neighborhood: String, otherSignals: String, phoneCountryCode: String,
    emitterPhone: String, faxCountryCode: String, faxNumber: String) {
    if (name != '' && email != '' && idType != '' && number != '' && comercialName != '' && province != '' &&
      canton != '' && district != '' && neighborhood != '' && otherSignals != '' && phoneCountryCode != '' &&
      emitterPhone != '' && faxCountryCode != '' && faxNumber != '') {
      let emitter: UserEmitterReceiver = new UserEmitterReceiver();
      emitter.name = name;
      emitter.email = email;
      emitter.identificationType = idType;
      emitter.identificationNumber = number;
      emitter.comercialName = comercialName;
      emitter.locationProvinceName = province;
      emitter.locationCantonName = canton;
      emitter.locationDistrictName = district;
      emitter.locationNeighborhoodName = neighborhood;
      emitter.otherSignals = otherSignals;
      emitter.phoneCountryCode = phoneCountryCode;
      emitter.phoneNumber = emitterPhone;
      emitter.faxCountryCode = faxCountryCode;
      emitter.faxNumber = faxNumber;
      emitter.userType = 'Emitter';
      this.userService.addUser(emitter).subscribe(
        response => {
          //Add action whe the Request send a good response
        },
        error => {
          //Add action whe the Request send a bad response
        }
      );
      this.showSuccess();
    } else if (name != '' || email != '' || idType != '' || number != '' || comercialName != '' || province != '' ||
      canton != '' || district != '' || neighborhood != '' || otherSignals != '' || phoneCountryCode != '' ||
      emitterPhone != '' || faxCountryCode != '' || faxNumber != '') {
      this.showWarning();
    } else {
      this.showError();
    }
  }
}
