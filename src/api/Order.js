import { service } from ".";

export const fetchOrderList = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Order/List",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const fetchOrderData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Order/Data",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const modifyOrderData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Order/Modify",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
