import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ReceiverService } from '../receiver/receiver.service';
import { UserEmitterReceiver } from '../models/UserEmitterReceiver.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
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
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})
export class ReceiverComponent implements OnInit {

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
      otherSignals: new FormControl('', [])
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

  addReceiver() {
    if (this.faxForm.valid && this.addressForm.valid && this.generalForm.valid && this.phoneForm.valid) {
      let receiver = new UserEmitterReceiver();
      receiver.name = this.generalForm.controls['receiverName'].value;
      receiver.identificationType = this.selectedIdentification.identificationCode;
      receiver.identificationNumber = this.generalForm.controls['receiverNumber'].value;
      receiver.comercialName = this.generalForm.controls['receiverBusinessName'].value;
      receiver.locationProvinceCode = this.selectedNeighborhood.provinceCode.toString();
      receiver.locationCantonCode = this.selectedNeighborhood.cantonCode.toString();
      receiver.locationDistrictCode = this.selectedNeighborhood.districtCode.toString();
      receiver.locationNeighborhoodCode = this.selectedNeighborhood.neighborhoodCode.toString();
      receiver.otherSignals = this.addressForm.controls['otherSignals'].value;
      receiver.phoneCountryCode = this.phoneForm.controls['phoneCountryCode'].value;
      receiver.phoneNumber = this.phoneForm.controls['receiverPhone'].value;
      receiver.faxCountryCode = this.faxForm.controls['faxCountryCode'].value;
      receiver.faxNumber = this.faxForm.controls['faxNumber'].value;
      receiver.email = this.generalForm.controls['receiverEmail'].value;

      this.receiverService.addUser(receiver).subscribe(
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
