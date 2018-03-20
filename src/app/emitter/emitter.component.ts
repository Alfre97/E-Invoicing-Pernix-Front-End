import { Component, OnInit } from '@angular/core';
import { UserEmitterReceiver } from '../models/UserEmitterReceiver';
import { UserService } from '../user.service';


@Component({
  selector: 'app-emitter',
  templateUrl: './emitter.component.html',
  styleUrls: ['./emitter.component.css']
})
export class EmitterComponent implements OnInit {

  public  provinces=['San Jose', 'Alajuela', 'Cartago','Heredia', 'Guanacaste', 'Puntarenas','Limón'];
  public SJCantons=['San José','Escazú','Desamparados' ,'Puriscal','Tarrazú','Aserrí','Mora','Goicoechea' ,
  'Santa Ana','Alajuelita', 'Vázquez de Coronado' ,'Acosta','Tibás','Moravia','Montes de Oca','Turrubares','Dota','Curridabat','Pérez Zeledón','León Cortés'];
  public AlajuelaCantons=['Alajuela','San Ramón','Grecia','San Mateo','Atenas','Naranjo','Palmares','Poás','Orotina','San Carlos','Zarcero','Valverde Vega','Upala',
    'Los Chiles','Guatuso','Río Cuarto'];
  public cartagoCantons=['Cartago','Paraíso','La Unión','Jiménez','Turrialba','Alvarado','Oreamuno','El Guarco'];
  public herediaCantons=['Heredia','Barva','Santo Domingo', 'Santa Bárbara','San Rafael','San Isidro','Belén','Flores','San Pablo','Sarapiquí'];
  public guanacasteCantons=['Liberia','Nicoya','Santa Cruz','Bagaces','Carrillo','Cañas','Abangares','Tilarán','Nandayure','La Cruz','Hojancha'];
  public puntarenasCantons=['Puntarenas','Esparza', 'Buenos Aires', 'Montes de Oro', 'Osa', 'Quepos', 'Golfito', 'Coto Brus', 'Parrita', 'Corredores', 'Garabito'];
  public limonCantons=['Limón', 'Pococí', 'Siquirres', 'Talamanca', 'Matina', 'Guácimo'];
  public cartagoDistricts=['Tres Ríos','San Diego','San Juan','San Rafael','Concepción','Dulce Nombre','San Ramón','Río Azul'];
  public cantonsOnSelectedProvince=this.SJCantons;
  public districtsOnSelectedCanton=this.cartagoDistricts;
  public tresRiosNeighborhoods=['Eulalia', 'Florencio del Castillo', 'Jirales', 'Mariana', 'Tacora'];
  constructor(private userservice: UserService) { }

  ngOnInit() {
  }

  onProvinceChange(province){
    if(province==='San Jose'){
      this.cantonsOnSelectedProvince=this.SJCantons;
    }
    if(province==='Alajuela'){
      this.cantonsOnSelectedProvince=this.AlajuelaCantons;
    }
    if(province==='Cartago'){
      this.cantonsOnSelectedProvince=this.cartagoCantons;
    }
    if(province==='Heredia'){
      this.cantonsOnSelectedProvince=this.herediaCantons;
    }
    if(province==='Guanacaste'){
      this.cantonsOnSelectedProvince=this.guanacasteCantons;
    }
    if(province==='Puntarenas'){
      this.cantonsOnSelectedProvince=this.puntarenasCantons;
    }
    if(province==='Limón'){
      this.cantonsOnSelectedProvince=this.limonCantons;
    }
  }

  onCantonChange(canton){
    if(canton==='Cartago'){
      this.districtsOnSelectedCanton=this.cartagoDistricts;
    }
    else{
       this.districtsOnSelectedCanton=[];
    }
  }

  addEmitter(name: String,identificationType: String,identificationNumber: String,comercialName: String,locationProvinceName: String,locationCantonName: String,
    locationDistrictName: String,locationNeighborhoodName: String,otherSignals: String,phoneCountryCode: String,phoneNumber:String,faxCountryCode: String,
    faxNumber: String, email: String){
    let emitter: UserEmitterReceiver= new UserEmitterReceiver();
    emitter.name=name;
    emitter.identificationType=identificationType;
    emitter.identificationNumber=identificationNumber;
    emitter.comercialName=comercialName;
    emitter.locationProvinceName=locationProvinceName;
    emitter.locationCantonName=locationCantonName;
    emitter.locationDistrictName=locationDistrictName;
    emitter.locationNeighborhoodName=locationNeighborhoodName;
    emitter.otherSignals=otherSignals;
    emitter.phoneCountryCode=phoneCountryCode;
    emitter.phoneNumber=phoneNumber;
    emitter.faxCountryCode=faxCountryCode;
    emitter.faxNumber=faxNumber;
    emitter.email=email;
    emitter.userType='Emitter';
    this.userservice.addUser(emitter).subscribe();
  }
}
