"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    liveLink: "",
    githubLink: "",
    status: "draft",
    isVisible: true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle input
  const handleInputChnage = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    e.preventDefault();

    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      setImagePreview(URL.createObjectURL(file));
    }
  };

  //Handle submit
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="">
        <h1 className="">Project</h1>

        <form action="" className="" onSubmit={(e) => handleSubmit(e)}>
          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => handleInputChnage(e)}
            placeholder="Project Title"
            className=""
          />

          {/* Description */}
          <textarea
            name="description"
            id=""
            value={formData.description}
            onChange={(e) => handleInputChnage(e)}
            placeholder="Project Description"
            className=""
          ></textarea>

          {/* Image Input */}
          <div className="">
            <input
              type="file"
              name=""
              id=""
              className=""
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
            />

            {imagePreview && <Image src={imagePreview} alt={formData.title} />}

            <button className="">Upload to cloud</button>
            <button className="">Delete upload</button>

            <button className="">Clear Selection</button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="">
            Add Project
          </button>
        </form>
      </div>
    </>
  );
}
