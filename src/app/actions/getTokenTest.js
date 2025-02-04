import instance from "../adminPannelServices/http";
import * as querystring from "querystring";

const controller = new AbortController();

export const getToken = async (code) => {
  const redirectUri = "http://localhost:4400/main";
  let clientID = "kian_crowd-web";
  const baseUrl =
    "https://uat.neshanid.com/auth/realms/KIAN/protocol/openid-connect";
  try {
    const response = await instance.post(
      `${baseUrl}/token`,
      querystring.stringify({
        grant_type: "authorization_code",
        client_id: clientID,
        redirect_uri: `${redirectUri}`,
        code_verifier: localStorage.getItem("verifier"),
        code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return Promise.resolve(response);
    // return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
controller.abort();
