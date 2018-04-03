import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {

  private taxCodes=['Impuesto General Sobre las Ventas','Impuesto Selectivo de Consumo', 'Impuesto Único a los Combustivos','Impuesto Específico de Bebidas Alcohólicas',
  'Impuesto Específico Sobre las Bebidas Envasadas sin Contenido Alcohólico y Jabones de Tocador','Impuesto a los Productos de Tabaco', 'Servicios', 
  'Impuesto General a las Ventas Diplomáticos', 'Impuesto General Sobre Ventas Compras Autorizadas', 'Impuesto General Sobre las Ventas Instituciones Públicas y Otros Organismos'
, 'Impuesto Selectivo de Consumo Compras Autorizadas', 'Impuesto Específico al Cemento', 'Otros'];
  constructor() { }

  ngOnInit() {
  }

}
