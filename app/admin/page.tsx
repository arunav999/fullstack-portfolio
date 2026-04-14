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

  // Handle input
  const handleInputChnage = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    
  };

  // Handle file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  //Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="">
        <h1 className="">Project</h1>

        <form action="" className="">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChnage}
            placeholder="Project Title"
            className=""
          />

          {/* Description */}
          <textarea
            name="description"
            id=""
            value={formData.description}
            onChange={handleInputChnage}
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
              onChange={handleFileChange}
            />

            <Image src={imageFile} alt={formData.title} />

            <button className="">Upload to cloud</button>
            <button className="">Delete upload</button>

            <button className="">Clear Selection</button>
          </div>

          {/* Submit Button */}
          <button type="submit" onSubmit={handleSubmit} className="">
            Add Project
          </button>
        </form>
      </div>
    </>
  );
}
