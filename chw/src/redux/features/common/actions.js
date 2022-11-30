import { 
  GET_CITY_BY_NAME_LIST_REQUEST, 
  GET_CITY_LIST_REQUEST,
   GET_STATE_BY_NAME_LIST_REQUEST, 
   GET_STATE_LIST_REQUEST, 
   SET_CITY_LIST_REQUEST, 
   SET_STATE_LIST_REQUEST,
   GET_MEDICATION_LIST_REQUEST,
   SET_MEDICATION_LIST_REQUEST ,
   GET_COUNTRY_LIST_REQUEST,
   SET_COUNTRY_LIST_REQUEST,
   GET_COUNTRY_BY_NAME_LIST_REQUEST
  } from "./constants";

   export const getCountry = (id) =>
   ({
     type: GET_COUNTRY_LIST_REQUEST,
     payload: id
   })
   
   export const setCountry = (state) =>
   ({
     type: SET_COUNTRY_LIST_REQUEST,
     payload: state
   });

   export const getCountryByName = (name) =>
({
  type: GET_COUNTRY_BY_NAME_LIST_REQUEST,
  payload: name
})


   export const getState = (id) =>
({
  type: GET_STATE_LIST_REQUEST,
  payload: id
})

export const setState = (state) =>
({
  type: SET_STATE_LIST_REQUEST,
  payload: state
});


export const getStateByName = (name) =>
({
  type: GET_STATE_BY_NAME_LIST_REQUEST,
  payload: name
})


//city


export const getCity = (id) =>
({
  type: GET_CITY_LIST_REQUEST,
  payload: id
})

export const setCity = (city) =>
({
  type: SET_CITY_LIST_REQUEST,
  payload: city
});



export const getCityByName = (name) =>
({
  type: GET_CITY_BY_NAME_LIST_REQUEST,
  payload: name
})


export const getMedication = (id) =>
({
  type: GET_MEDICATION_LIST_REQUEST,
  payload: id
})

export const setMediaction = (city) =>
({
  type: SET_MEDICATION_LIST_REQUEST,
  payload: city
});
