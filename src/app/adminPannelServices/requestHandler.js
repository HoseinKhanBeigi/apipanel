import instance from "./http";
import { createAsyncThunk } from "@reduxjs/toolkit";
const controller = new AbortController();
export const createAsyncAction = (
  url,
  type,
  method,
  secondUrl,
  thridUrl,
  contentType
) => {
  let wrapperUrl = "";

  if (thridUrl === "file") {
    wrapperUrl = `${process.env.SERVER_FILE}${url}`;
  } else {
    wrapperUrl = `${process.env.SERVER_ADDRESS}${url}`;
  }
  return createAsyncThunk(type, async ({ ...values }, thunkAPI) => {
    try {
      let response;

      const config = {
        signal: AbortSignal.timeout(10000),

        headers: {
          "Content-Type":
            contentType === "file"
              ? "application/octet-stream"
              : "application/json",
          "Access-Control-Allow-Credentials": true,
          "X-Requested-With": "XMLHttpRequest",
          "Application-Name": "CRM",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          ...values.params,
        },
      };

      if (method === "post") {
        if (values.id) {
          const ids = values.id;
          const urlvalue = `${wrapperUrl}/${ids}`;
          response = await instance[method](
            urlvalue,
            { ...values.res },
            config
          );
        } else {
          response = await instance[method](
            wrapperUrl,
            { ...values.body },
            config
          );
        }
      } else if (method === "put") {
        if (values.id) {
          response = await instance[method]({ ...values.res }, config);
        } else {
          response = await instance[method](wrapperUrl, values.body, config);
        }
      } else if (method === "delete") {
        delete config.params;
        const ids = values.id;
        const urlvalue = `${wrapperUrl}/${ids}`;

        response = await instance[method](urlvalue, config);
      } else if (method === "update" || method === "patch") {
        delete config.params;
        const ids = values.id;
        const urlvalue = `${wrapperUrl}/${ids}`;

        response = await instance[method](urlvalue, { ...values.res }, config);
      } else {
        if (values?.id) {
          const ids = values.id;
          let urlvalue = `${wrapperUrl}/${ids}`;
          if (secondUrl) {
            urlvalue = `${wrapperUrl}/${ids}${secondUrl}`;
          }
          response = await instance[method](urlvalue, config);
        } else {
          response = await instance[method](
            values.secondUrl ? `${wrapperUrl}/${values.secondUrl}` : wrapperUrl,
            config
          );
        }
      }

      const data = JSON.parse(JSON.stringify(response?.data));
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  });
};
controller.abort();
