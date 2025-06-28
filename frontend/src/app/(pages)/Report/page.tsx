'use client';
import React, { useState, useRef } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { GoPaperclip } from "react-icons/go";
import Banner from './components/Banner';

interface FormData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  graduationYear: string[]; 
  university: string[]; 
  whyInterested: string;
  confirmAvailability: boolean;
  acknowledgeSelection: boolean;
  attachedFile: File | null; // Added for file handling
}

const gardens = ["Garden A", "Garden B", "Garden C", "Garden D"];
const priorities = ["Urgent", "Moderate", "Low"];

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    graduationYear: [],
    university: [],
    whyInterested: '',
    confirmAvailability: false,
    acknowledgeSelection: false,
    attachedFile: null, 
  });

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

  const handleCheckboxArrayChange = (field: 'graduationYear' | 'university', value: string) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <section>
      <Banner />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-md shadow-md">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#293044]">
                Instructions
              </h2>
              <div className="text-[#445072] space-y-4">
                <p>
                  We welcome all users to share their thoughts with us, whether it's feedback, a discussion topic,
                  or a complaint, through our submission form. Your input helps us improve and build a better community together.
                  To submit, simply complete all required fields in the form. Submissions are reviewed regularly, and we may follow up with you if needed.
                </p>
              </div>
            </div>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#445072]">
                    1. Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="e.g., John Teo"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0] bg-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#445072]">
                    2. Post/Report Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="e.g., Unfairing Allotment of Community Garden"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0] bg-white"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-[#445072]">
                  3. Mobile number <span className="text-red-500">*</span>
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
              <div className="space-y-4">
                <label className="block text-sm font-medium text-[#445072]">
                  4. Priority Level <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {priorities.map(priority => (
                    <div key={priority} className="flex items-center space-x-3">
                      <input
                        id={`priority-${priority}`}
                        type="checkbox"
                        checked={formData.graduationYear.includes(priority)}
                        onChange={() => handleCheckboxArrayChange("graduationYear", priority)}
                        className="form-checkbox h-4 w-4 rounded-sm appearance-none border border-gray-300 checked:bg-[#4A61C0] checked:border-transparent focus:outline-none"
                      />
                      <label htmlFor={`priority-${priority}`} className="text-sm text-[#445072]">
                        {priority}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-[#445072]">
                  5. Affected Garden <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {gardens.map(garden => (
                    <div key={garden} className="flex items-center space-x-3">
                      <input
                        id={`garden-${garden}`}
                        type="checkbox"
                        checked={formData.university.includes(garden)}
                        onChange={() => handleCheckboxArrayChange("university", garden)}
                        className="form-checkbox h-4 w-4 rounded-sm appearance-none border border-gray-300 checked:bg-[#4A61C0] checked:border-transparent focus:outline-none"
                      />
                      <label htmlFor={`garden-${garden}`} className="text-sm text-[#445072]">
                        {garden}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#445072]">
                  6. Attach Photos (Optional)
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
                    className="hidden" // Hide the actual file input
                    accept="image/*" // Accept only image files (optional, can be changed)
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
              <div className="space-y-2">
                <label htmlFor="whyInterested" className="block text-sm font-medium text-[#445072]">
                  7. Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="whyInterested"
                  value={formData.whyInterested}
                  onChange={(e) => handleInputChange("whyInterested", e.target.value)}
                  rows={5}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0] bg-white resize-none"
                  required
                ></textarea>
              </div>
              <div className="border-t pt-8 space-y-4">
                <h3 className="text-lg font-medium text-[#445072]">Confirmation</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      id="confirmAvailability"
                      type="checkbox"
                      checked={formData.confirmAvailability}
                      onChange={(e) => handleInputChange("confirmAvailability", e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border border-gray-300
                        checked:bg-[#4A61C0] checked:border-transparent
                        focus:outline-none focus:ring-2 focus:ring-[#4A61C0]"
                    />
                    <label htmlFor="confirmAvailability" className="text-sm text-[#445072] leading-relaxed">
                      I confirm my availability to attend this full-day event taking place on 15 Aug 2025 (9am to 6pm){" "}
                      <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <input
                      id="acknowledgeSelection"
                      type="checkbox"
                      checked={formData.acknowledgeSelection}
                      onChange={(e) => handleInputChange("acknowledgeSelection", e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border border-gray-300
                        checked:bg-[#4A61C0] checked:border-transparent
                        focus:outline-none focus:ring-2 focus:ring-[#4A61C0]"
                    />
                    <label htmlFor="acknowledgeSelection" className="text-sm text-[#445072] leading-relaxed">
                      I acknowledge that my submission may be reviewed and followed up on if necessary,
                      and that not all submissions will receive a response.{" "}
                      <span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full text-white py-4 text-lg font-medium rounded-lg hover:opacity-90 transition-opacity bg-[#4A61C0] hover:bg-[#3b4e9a]"
                >
                  Submit now
                </button>
              </div>
            </form>
            <div className="fixed bottom-6 right-6">
              <button
                type="button"
                className="rounded-full w-10 h-10 bg-white border border-gray-300 flex items-center justify-center"
              >
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}