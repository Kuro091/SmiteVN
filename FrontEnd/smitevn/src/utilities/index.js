import { intersection } from "lodash";

export { default as history } from "./history";
export { default as setAuthToken } from "./setAuthToken";

export function isArrayWithLength(arr) {
  return Array.isArray(arr) && arr.length;
}

export function getAllowedRoutes(allRoutes, role) {
  return allRoutes.filter(({ permission }) => {
    return permission.includes(role.toUpperCase());
  });
}

export function objectHasData(obj) {
  if (typeof obj !== "undefined") {
    return Object.keys(obj).length !== 0;
  } else {
    return false;
  }
}
