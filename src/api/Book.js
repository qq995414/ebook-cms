import { service } from ".";

export const fetchBookList = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Book/List",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const fetchBookData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Book/Data",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const ModifyBookData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Book/Modify",
      method: "POST",
      data,
      headers: {
        "Content-Type": "multipart/form-data;",
        Function: "PORTAL",
      },
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const EnableBookData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Book/Enable",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
export const downloadXml = () => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Book/Export",
      method: "POST",
    })
      .then(async (res) => await resolve(res))
      .catch((error) => reject(error));
  });
};

export const importBookData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Book/Import",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

