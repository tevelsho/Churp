'use client';
import React, { useState, useRef } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { GoPaperclip } from "react-icons/go";
import Banner from './components/Banner';

interface FormData {
  name: string;
  mobileNumber: string;
  concernTitle: string;
  affectedGarden: string[];
  description: string;
  confirmFollowUp: boolean;
  acknowledgeResponsePolicy: boolean;
  attachedFile: File | null;
}

const gardens = ["Plantation Acres", "Tengah Community Club", "Garden Vale", "Plantation Grove"];

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobileNumber: '',
    concernTitle: '',
    affectedGarden: [],
    description: '',
    confirmFollowUp: false,
    acknowledgeResponsePolicy: false,
    attachedFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleArrayItem = (arr: string[], item: string): string[] => {
    if (arr.includes(item)) {
      return arr.filter(i => i !== item);
    } else {
      return [...arr, item];
    }
  };

  const handleInputChange = <Field extends keyof FormData>(field: Field, value: FormData[Field]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxArrayChange = (field: 'affectedGarden', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: toggleArrayItem(prev[field], value),
    }));
  };

  const handleChooseFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size exceeds the maximum limit of 5 MB.");
        setFormData(prev => ({ ...prev, attachedFile: null }));
        e.target.value = '';
      } else {
        setFormData(prev => ({ ...prev, attachedFile: selectedFile }));
      }
    }
  };

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true); 
      const dataToSubmit = new FormData();
      dataToSubmit.append('name', formData.name);
      dataToSubmit.append('mobileNumber', formData.mobileNumber);
      dataToSubmit.append('concernTitle', formData.concernTitle);
      dataToSubmit.append('description', formData.description);
      
      // Since it's a single string now, you just append it directly.
      // dataToSubmit.append('affectedGarden', formData.affectedGarden);
      
      //not too sure affected garden should be multiple values
      formData.affectedGarden.forEach(garden => {
        dataToSubmit.append('affectedGarden', garden);
      });

      if (formData.attachedFile) {
        dataToSubmit.append('photos', formData.attachedFile);
      }
    
    // The rest of your submit logic remains the same
    try {
        const response = await fetch('/backend/concerns', {
            method: 'POST',
            body: dataToSubmit,
        });
        const result = await response.json();
        if (!response.ok) {
            console.error("Server Error:", result.message); 
            throw new Error(result.message || 'Something went wrong');
        }
        console.log("Submission successful:", result);
        alert("Concern submitted successfully!");
        setFormData({
            name: '',
            mobileNumber: '',
            concernTitle: '',
            affectedGarden: [], // Reset to empty string
            description: '',
            confirmFollowUp: false,
            acknowledgeResponsePolicy: false,
            attachedFile: null,
        });
        if(fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    } catch (err: any) {
        console.error("Submission Failed:", err);
        alert(`Submission Failed: ${err.message}`);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <section>
      <Banner />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-md shadow-md">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#293044]">Instructions</h2>
              <div className="text-[#445072] space-y-4">
                <p>
                  We encourage all community gardeners to share their concerns through our submission form. Your input helps us nurture a thriving and harmonious garden space for everyone. Simply fill out all required fields to submit your concern. Submissions are reviewed regularly, and we may reach out to you for further details if needed.
                </p>
              </div>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>

              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-[#445072]">
                  1. Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g., John Teo"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0] bg-white"
                  required
                />
              </div>

              {/* Mobile No. */}
              <div className="space-y-2">
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-[#445072]">
                  2. Mobile No. <span className="text-red-500">*</span>
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  placeholder="8123 4567"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0] bg-white"
                  required
                />
              </div>

              {/* Concern Title */}
              <div className="space-y-2">
                <label htmlFor="concernTitle" className="block text-sm font-medium text-[#445072]">
                  3. Concern Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="concernTitle"
                  type="text"
                  placeholder="e.g., unfair allotment"
                  value={formData.concernTitle}
                  onChange={(e) => handleInputChange("concernTitle", e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0] bg-white"
                  required
                />
              </div>

              {/* Affected Garden */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-[#445072]">
                  4. Affected Garden <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {gardens.map(garden => (
                    <div key={garden} className="flex items-center space-x-3">
                      <input
                        id={`garden-${garden}`}
                        type="checkbox"
                        checked={formData.affectedGarden.includes(garden)}
                        onChange={() => handleCheckboxArrayChange("affectedGarden", garden)}
                        className="form-checkbox h-4 w-4 accent-[#4A61C0] border-gray-800 focus:ring-[#4A61C0"
                      />
                      <label htmlFor={`garden-${garden}`} className="text-sm text-[#445072]">
                        {garden}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-[#445072]">
                  5. Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={5}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0] bg-white resize-none"
                  required
                ></textarea>
              </div>

              {/* Attached Photos */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#445072]">
                  6. Attached Photos (Optional)
                </label>
                <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors bg-gray-50">
                  <MdOutlineFileUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    <GoPaperclip className="inline-block mr-1 text-base" />
                    or drag and drop here
                  </p>
                  <p className="text-xs text-gray-500 mb-3">Maximum file size 5 MB</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    onClick={handleChooseFileClick}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-[#445072] bg-white hover:bg-gray-50 focus:outline-none focus:ring-[#4A61C0] hover:cursor-pointer transition-shadow"
                  >
                    Choose file
                  </button>
                  {formData.attachedFile && (
                    <p className="mt-2 text-sm text-gray-700">
                      Selected file: {formData.attachedFile.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Confirmation Checkboxes */}
              <div className="border-t pt-8 space-y-4">
                <h3 className="text-lg font-medium text-[#445072]">Confirmation</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      id="confirmFollowUp"
                      type="checkbox"
                      checked={formData.confirmFollowUp}
                      onChange={(e) => handleInputChange("confirmFollowUp", e.target.checked)}
                      className="mt-1 w-4 h-4 form-checkbox h-4 w-4 rounded-sm appearance-none border border-gray-300 checked:bg-[#4A61C0] checked:border-transparent focus:outline-none"
                      required
                    />
                    <label htmlFor="confirmFollowUp" className="text-sm text-[#445072] leading-relaxed">
                      I acknowledge that my submission may be reviewed and followed up on if necessary.
                      <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <input
                      id="acknowledgeResponsePolicy"
                      type="checkbox"
                      checked={formData.acknowledgeResponsePolicy}
                      onChange={(e) => handleInputChange("acknowledgeResponsePolicy", e.target.checked)}
                      className="mt-1 w-4 h-4 form-checkbox h-4 w-4 rounded-sm appearance-none border border-gray-300 checked:bg-[#4A61C0] checked:border-transparent focus:outline-none"
                      required
                    />
                    <label htmlFor="acknowledgeResponsePolicy" className="text-sm text-[#445072] leading-relaxed">
                      I understand that not all submissions will receive a response.
                      <span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full text-white py-4 text-lg font-medium rounded-lg hover:opacity-90 transition-opacity bg-[#4A61C0] hover:bg-[#3b4e9a]"
                >
                  {isSubmitting ? "Submitting..." : "Submit now"} 
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
