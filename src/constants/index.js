import Auth from '../modules/Auth';

const S1_URL_BASE = "https://csci6300-cloudprototype-ser1.herokuapp.com/v1/";
const S2_URL_BASE = "https://csci6300-cloudprototype-ser2.herokuapp.com/v1/";
export const S1_URL_REGISTER = S1_URL_BASE+"user/register";
export const S2_URL_REGISTER = S2_URL_BASE+"user/register";

export const S1_URL_LOGIN = S1_URL_BASE+"user/login";
export const S1_URL_LOGOUT = S1_URL_BASE+"user/logout";
export const S1_URL_TECHNOLOGY = S1_URL_BASE+"technology";
export const S1_URL_TECHNOLOGY_ADD = S1_URL_BASE+"technology/add";
export const S1_URL_TECHNOLOGY_DELETE = S1_URL_BASE+"technology/byName";

export const S2_URL_LOGIN = S2_URL_BASE+"user/login";
export const S2_URL_LOGOUT = S2_URL_BASE+"user/logout";
export const S2_URL_TECHNOLOGY = S2_URL_BASE+"technology";
export const S2_URL_TECHNOLOGY_ADD = S2_URL_BASE+"technology/add";
export const S2_URL_TECHNOLOGY_DELETE = S2_URL_BASE+"technology/byName";

export const HEADER = { "Content-Type": "application/json" };
export const BEARER_HEADER = { "Authorization": "Bearer "+Auth.getToken() };