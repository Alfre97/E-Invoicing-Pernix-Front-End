import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit {
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

  constructor() { }

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
}
