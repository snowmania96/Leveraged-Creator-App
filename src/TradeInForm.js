import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

import axios from "axios";

const authKey = process.env.REACT_APP_AUTHKEY;
const webhookUrl = process.env.REACT_APP_WEBHOOK_URL;

const api = axios.create({
  baseURL: "https://api.vehicledatabases.com/ymm-specs/options/v2",
  headers: {
    "x-AuthKey": authKey,
  },
});

const states = ["CA", "NY", "TX", "FL", "IL"]; // Add more states as needed

export default function TradeInForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    year: "",
    make: "",
    model: "",
    state: states[0],
    miles: "",
    name: "",
    email: "",
    phone: "",
  });
  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchYears = async () => {
    try {
      await api.get("/year").then(function (response) {
        const year = ["Select Years", ...response.data.years];
        console.log(year);
        setYears(year);
      });
    } catch (error) {
      console.log("Error fetching 'years' data", error);
    }
  };

  const fetchMakes = async (year) => {
    try {
      await api.get(`/make/${year}`).then(function (response) {
        let makes = ["Select Makes"];
        makes.push(...response.data.makes);
        setMakes(makes);
      });
    } catch (error) {
      console.log("Error fetching 'makes' data", error);
    }
  };

  const fetchModels = async (year, make) => {
    try {
      await api.get(`/model/${year}/${make}`).then(function (response) {
        let models = ["Select Models"];
        models.push(...response.data.models);
        setModels(models);
      });
    } catch (error) {
      console.log("Error fetching 'models' data", error);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  useEffect(() => {
    if (formData.year) {
      fetchMakes(formData.year);
    }
  }, [formData.year]);

  useEffect(() => {
    if (formData.year && formData.make) {
      fetchModels(formData.year, formData.make);
    }
  }, [formData.year, formData.make]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateStep1 = () => {
    const requiredFields = ["year", "make", "model", "state", "miles"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(", ")}`);
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const requiredFields = ["name", "email", "phone"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(", ")}`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(years);
    setError("");
    setIsLoading(true);
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else {
      if (validateStep2()) {
        try {
          const res = await axios.post(webhookUrl, formData);
          console.log(res);

          alert(
            "Your trade-in value request has been submitted. You will receive a text with the final report."
          );
          setFormData({
            year: "",
            make: "",
            model: "",
            state: states[0],
            miles: "",
            name: "",
            email: "",
            phone: "",
          });
          setStep(1);
        } catch (error) {
          console.error("Error:", error);
          setError(
            "There was an error submitting your request. Please try again."
          );
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mt-32 mx-auto p-5 bg-white rounded-lg shadow-md">
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <select
                name="year"
                className="w-full p-1"
                value={formData.year}
                onChange={(e) => handleSelectChange("year", e.target.value)}>
                {years.map((year) => (
                  <option
                    value={year}
                    className="text-sm text-gray-700 hover:bg-gray-100 w-full text-center">
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="make">Make</Label>
              <select
                name="make"
                className="w-full p-1"
                value={formData.make}
                onChange={(e) => handleSelectChange("make", e.target.value)}>
                {makes.map((make) => (
                  <option
                    value={make}
                    className="text-sm text-gray-700 hover:bg-gray-100 w-full text-center">
                    {make}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <select
                name="model"
                className="w-full p-1"
                value={formData.model}
                onChange={(e) => handleSelectChange("model", e.target.value)}>
                {models.map((model) => (
                  <option
                    value={model}
                    className="text-sm text-gray-700 hover:bg-gray-100 w-full text-center">
                    {model}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <select
                name="state"
                className="w-full p-1"
                value={formData.state}
                onChange={(e) => handleSelectChange("state", e.target.value)}>
                {states.map((state) => (
                  <option
                    value={state}
                    className="text-sm text-gray-700 hover:bg-gray-100 w-full text-center">
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="miles">Miles</Label>
              <Input
                type="number"
                id="miles"
                name="miles"
                value={formData.miles}
                onChange={handleChange}
                placeholder="Enter miles"
              />
            </div>
            <Button type="submit" className="w-full p-1" abled={isLoading}>
              {isLoading ? "Loading..." : "Next"}
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            <Button type="submit" className="w-full p-1" abled={isLoading}>
              {isLoading ? "Submitting..." : "Get My Trade-In Value"}
            </Button>
            <p className="text-sm text-red-600 mt-2">
              Warning! Make sure your information is correct because we will
              text you the final report!
            </p>
          </>
        )}
      </form>
    </div>
  );
}
