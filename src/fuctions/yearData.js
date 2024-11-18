import axios from "axios";

const config = {
  method: "get",
  url: "https://api.vehicledatabases.com/ymm-specs/options/v2/year",
  headers: {
    "x-AuthKey": "e13acfd421394d109ae8c54da26d722e",
  },
};

export const populateYearDropdown = async () => {
  try {
    axios(config).then(function (response) {
      console.log(JSON.stringify(response.data.years));
      return JSON.stringify(response.data.years);
    });
  } catch (error) {
    console.log("Error fetching year data", error);
  }
};
