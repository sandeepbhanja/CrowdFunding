import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../assets";
import { CustomButton, FormField,Loader } from "../component";
import { checkIfImage } from "../utils";
import { useStateContext } from "../context";

const CreateCampaign = () => {
  const { publishCampaign } = useStateContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await publishCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Provide valid image url");
        setForm({ ...form, image: "" });
      }
    });

    console.log(form);
  };
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader/>}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            LabelName="Your Name"
            inputType="text"
            placeholder="John Doe"
            value={form.name}
            handleChange={(e) => {
              handleFormChange("name", e);
            }}
          />
          <FormField
            LabelName="Campaign Title"
            inputType="text"
            placeholder="Write a Title"
            value={form.title}
            handleChange={(e) => {
              handleFormChange("title", e);
            }}
          />
        </div>
        <FormField
          LabelName="Story"
          inputType="text"
          placeholder="Write your Story :)"
          value={form.description}
          isTextArea={true}
          handleChange={(e) => {
            handleFormChange("description", e);
          }}
        />
        <div className="w-full flex justify-center items-center p-4 bg-[#1dc071] rounded-[20px] h-[120px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            LabelName="Goal"
            inputType="text"
            placeholder="ETH 0.50"
            value={form.target}
            handleChange={(e) => {
              handleFormChange("target", e);
            }}
          />
          <FormField
            LabelName="End Date"
            inputType="date"
            placeholder="End Date"
            value={form.deadline}
            handleChange={(e) => {
              handleFormChange("deadline", e);
            }}
          />
        </div>
        <FormField
          LabelName="Campaign Image"
          inputType="url"
          placeholder="Place Campaign Image Url"
          value={form.image}
          handleChange={(e) => {
            handleFormChange("image", e);
          }}
        />
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
