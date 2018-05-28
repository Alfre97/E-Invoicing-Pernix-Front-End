import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserEmitterReceiver } from '../models/UserEmitterReceiver.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { EmitterService } from '../emitter/emitter.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Provinces } from "../models/Residences/Province-mock";
import { Cantons } from "../models/Residences/Canton-mock";
import { Districts } from "../models/Residences/District-mock";
import { Neighborhoods } from "../models/Residences/Neighborhood-mock";
import { Province } from "../models/Residences/Province";
import { Canton } from "../models/Residences/Canton";
import { District } from "../models/Residences/District";
import { Neighborhood } from "../models/Residences/Neighborhood";
import { Identification } from "../models/Identification/Identification";
import { Identifications } from "../models/Identification/Identification-mock";

@Component({
  selector: 'app-emitter',
  templateUrl: './emitter.component.html',
  styleUrls: ['./emitter.component.scss']
})
export class EmitterComponent implements OnInit {

  identifications: Identification[] = Identifications;
  provinces: Province[] = Provinces;
  cantons: Canton[] = Cantons;
  districts: District[] = Districts;
  neighborhoods: Neighborhood[] = Neighborhoods;
  cantonsPeerProvince: Canton[] = [];
  districtsPeerCanton: District[] = [];
  neighborhoodsPeerDistrict: Neighborhood[] = [];
  selectedProvince: Province;
  selectedCanton: Canton;
  selectedDistrict: District;
  selectedNeighborhood: Neighborhood;
  selectedIdentification: Identification;

  generalForm;
  addressForm;
  phoneForm;
  faxForm;

  constructor(private emitterService: EmitterService,
    public toastr: ToastsManager,
    public formBuilder: FormBuilder,
    vcr: ViewContainerRef) {

    this.generalForm = formBuilder.group({
      emitterName: new FormControl('', [
        Validators.required
      ]),
      emitterEmail: new FormControl('', [
        Validators.required
      ]),
      idType: new FormControl('', [
        Validators.required
      ]),
      emitterNumber: new FormControl('', [
        Validators.required
      ]),
      emitterBusinessName: new FormControl('', [
        Validators.required
      ])
    });

    this.addressForm = formBuilder.group({
      emitterProvince: new FormControl('', [
        Validators.required
      ]),
      emitterCanton: new FormControl('', [
        Validators.required
      ]),
      emitterDistrict: new FormControl('', [
        Validators.required
      ]),
      emitterNeighborhood: new FormControl('', [
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
      emitterPhone: new FormControl('', [
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

  onProvinceChange() {
    let selectCantons: Canton[] = [];
    for (let canton of this.cantons) {
      if (canton.provinceCode == this.selectedProvince.provinceCode) {
        selectCantons.push(canton);
      }
    }
    this.cantonsPeerProvince = selectCantons;
    this.districtsPeerCanton = [];
    this.neighborhoodsPeerDistrict = [];
  }

  onCantonChange() {
    let selectDistricts: District[] = [];
    for (let district of this.districts) {
      if (district.provinceCode == this.selectedCanton.provinceCode && district.cantonCode == this.selectedCanton.cantonCode) {
        selectDistricts.push(district);
      }
    }
    this.districtsPeerCanton = selectDistricts;
    this.neighborhoodsPeerDistrict = [];
  }

  onDistrictChange() {
    let selectNeighborhoods: Neighborhood[] = [];
    for (let neighborhood of this.neighborhoods) {
      if (neighborhood.provinceCode == this.selectedDistrict.provinceCode && neighborhood.cantonCode == this.selectedDistrict.cantonCode && neighborhood.districtCode == this.selectedDistrict.districtCode) {
        selectNeighborhoods.push(neighborhood);
      }
    }
    this.neighborhoodsPeerDistrict = selectNeighborhoods;
  }

  addEmitter() {
    if (this.generalForm.valid && this.addressForm.valid && this.phoneForm.valid && this.faxForm.valid) {
      let emitter = new UserEmitterReceiver();
      emitter.name = this.generalForm.controls['emitterName'].value;
      emitter.email = this.generalForm.controls['emitterEmail'].value;
      emitter.identificationType = this.selectedIdentification.identificationCode;
      emitter.identificationNumber = this.generalForm.controls['emitterNumber'].value;
      emitter.comercialName = this.generalForm.controls['emitterBusinessName'].value;
      emitter.locationProvinceCode = this.selectedNeighborhood.provinceCode.toString();
      emitter.locationCantonCode = this.selectedNeighborhood.cantonCode.toString();
      emitter.locationDistrictCode = this.selectedNeighborhood.districtCode.toString();
      emitter.locationNeighborhoodCode = this.selectedNeighborhood.neighborhoodCode.toString();
      emitter.otherSignals = this.addressForm.controls['otherSignals'].value;
      emitter.phoneCountryCode = this.phoneForm.controls['phoneCountryCode'].value;
      emitter.phoneNumber = this.phoneForm.controls['emitterPhone'].value;
      emitter.faxCountryCode = this.faxForm.controls['faxCountryCode'].value;
      emitter.faxNumber = this.faxForm.controls['faxNumber'].value;

      this.emitterService.addUser(emitter).subscribe(
        response => {
          this.showSuccess();
        },
        error => {
          this.showError();
        }
      );
    } else {
      this.showError();
    }
  }
}
