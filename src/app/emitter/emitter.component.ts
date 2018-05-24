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
      let emitter: UserEmitterReceiver = new UserEmitterReceiver();
      emitter.name = this.generalForm.controls['receiverName'];
      emitter.email = this.generalForm.controls['receiverEmail'];
      emitter.identificationType = this.selectedIdentification.identificationCode;
      emitter.identificationNumber = this.generalForm.controls['receiverNumber'];
      emitter.comercialName = this.generalForm.controls['receiverBusinessName'];
      emitter.locationProvinceCode = this.selectedNeighborhood.provinceCode;
      emitter.locationCantonCode = this.selectedNeighborhood.cantonCode;
      emitter.locationDistrictCode = this.selectedNeighborhood.districtCode;
      emitter.locationNeighborhoodCode = this.selectedNeighborhood.neighborhoodCode;
      emitter.otherSignals = this.addressForm.controls['otherSignals'];
      emitter.phoneCountryCode = this.phoneForm.controls['phoneCountryCode'];
      emitter.phoneNumber = this.phoneForm.controls['receiverPhone'];
      emitter.faxCountryCode = this.faxForm.controls['faxCountryCode'];
      emitter.faxNumber = this.faxForm.controls['faxNumber'];
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
