import axios from 'axios';

/**
 * 
 * @param {String} param 
 * @returns Boolean
 */
export function checkOptionalParamValid(param){
  let isValid = false;
  if(param !== undefined && param !== " "){
    isValid = true;
  }
  return isValid;
}

/**
 * 
 * @param {String} searchInput 
 * @returns String
 */
export const buildQueryFromValidParams = (searchInput) => {
  let validQueryParams = `?query=`;
  if(checkOptionalParamValid(searchInput)){
    validQueryParams = validQueryParams.concat(searchInput);
  }
  return validQueryParams;
}

