import React, {useState} from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../../Utils/AxiosHelper.js";

const SignUp = ({onSuccess}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
      role: "",
      username: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      aadharCardNumber: "",
      address: "",
      password: "",
    });
  
    const nextStep = () => {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 5));
    };
  
    const prevStep = () => {
      setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    };
  
    const handleNext = (data) => {
      setFormData({ ...formData, ...data });
      nextStep();
    };
  
    const handleBack = () => {
      prevStep();
    };
  

    const handleSubmit = (finalData) => {
      console.log("Final Form Data:", finalData);
      
      // api.post(/users/register, finalData)


      // Perform the final submission using axios
      axios.post("http://localhost:8000/api/v1/users/register", finalData)
        .then((response) => {
          console.log("Success:", response.data);
          alert("Signup successful!");
          onSuccess()

        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Signup failed. Please try again.");
        });
    };
  
    return (
      <div className="min-h-[90%] w-full">
        {currentStep === 1 && (
          <Step1 formData={formData} setFormData={setFormData} onNext={handleNext} />
        )}
        {currentStep === 2 && (
          <Step2 formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 3 && (
          <Step3 formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 4 && (
          <Step4 formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 5 && (
          <Step5
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit} 
            onBack={handleBack}
          />
        )}
      </div>
    );
  };
  
  export default SignUp;