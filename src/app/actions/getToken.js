import instance from "../adminPannelServices/http";
import * as querystring from "querystring";

const controller = new AbortController();

function getFirstWordBeforeDot(url) {
  try {
    // Use URL constructor to extract hostname
    const hostname = new URL(url).hostname;
    // Match the first word before the first dot
    const match = hostname.match(/^([^.]+)/);
    // Return the matched word or an empty string if no match
    return match ? match[1] : "";
  } catch (error) {
    console.error("Invalid URL:", error);
    return "";
  }
}

export const getToken = async (code) => {
  const client_id = getFirstWordBeforeDot(window.location.origin);
  let clientID = "";

  clientID = `api-panel-${client_id}`;
  if (
    window.location.origin === "https://levant.apipanel.levants.io" ||
    window.location.origin === "http://localhost:3000" ||
    window.location.origin === "https://apipanel.uat.kian.digital"
  ) {
    clientID = "api-panel";
  }
  if (window.location.origin === "https://mabnacard.apipanel.levants.io") {
    clientID = "api-panel-mabna-card-aria";
  }
  if (window.location.origin === "https://iransign.apipanel.levants.io") {
    clientID = "api-panel-iran-sign";
  }

  try {
    const response = await instance.post(
      `${process.env.AUTH_BASEURL}/token`,
      querystring.stringify({
        grant_type: "authorization_code",
        client_id: clientID,
        redirect_uri: `${window.location.origin}/auth`,
        code_verifier: localStorage.getItem("verifier"),
        code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    localStorage.setItem("id_token", response.data.id_token);

    return Promise.resolve(response);
    // return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
controller.abort();
