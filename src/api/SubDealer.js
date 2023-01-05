import { service } from ".";

// 經銷商選項
export const fetchSubDealerSelect = () => {
  return new Promise((resolve, reject) => {
    service({
      url: "/SubDealer/Select",
      method: "POST",
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
