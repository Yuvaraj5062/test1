import config from '../../../config/config'

import axios from "axios";


export function getAllCountry() {
  return axios.get(config.default.getCountryUrl);
}
export function getCountryByName(data) {
  return axios.get(config.default.getCountryByNameUrl, { params: { CountryName:data } });
}

export function getAllState(Id) {
    return axios.get(config.default.getStateUrl, { params: { CountryId: Id } });
  }

  export function getStateByName(data) {
    return axios.get(config.default.getStateByNameUrl, { params: { StateName:data.StateName,CountryId:data.CountryId } });
  }


  export function getAllCity(StateId) {
    return axios.get(config.default.getCityUrl, { params: { StateId: StateId } });
  }

  export function getCityByName(data) {
    return axios.get(config.default.getCityByNameUrl, { params: { CityName:data.CityName,StateId:data.StateId } });
  }

  export function getAllMedication() {
    return axios.get(config.default.getMedicationDataURl);
  }