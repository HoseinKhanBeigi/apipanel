import moment from "moment-jalaali";
import { format } from "date-fns";

export function getCookie(name) {
  if (process.env.BROWSER) {
    return readCookieFrom(document.cookie, name);
  }
  return null;
}

export const getQueryParams = (query = null) =>
  [
    ...new URLSearchParams(
      query || (typeof window !== "undefined" && window.location.search) || ""
    ).entries(),
  ].reduce((a, [k, v]) => ((a[k] = v), a), {});

moment.locale("fa");
moment.loadPersian({ dialect: "persian-modern" });

export function convertToJalaliDate(date, format = "jYYYY/jMM/jDD") {
  const isValidDate = moment(date).isValid();
  if (isValidDate) {
    const jalaliDate = moment(date).format(format);
    return jalaliDate;
  }
  const epochDate = parseInt(date, 10);
  const epochDataConverted = new Date(epochDate);
  const jalaliDate = moment(epochDataConverted).format(format);
  return jalaliDate;
}

export function fDate(date) {
  return format(new Date(date), "dd MMMM yyyy");
}
