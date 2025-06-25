"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui//input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Checkbox } from "../../components/ui/checkbox"
import { Card, CardContent } from "../../components/ui/card"
import { Upload, Clock } from "lucide-react"

export default function TechInsiderForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    universityEmail: "",
    personalEmail: "",
    mobileNumber: "",
    graduationYear: "",
    university: "",
    whyInterested: "",
    additionalInfo: "",
    confirmAvailability: false,
    acknowledgeSelection: false,
  })

  const gardens = [
    "Garden 1",
    "Garden 2",
    "Garden 3",
    "Garden 4",
    "Garden 5",
    "Garden 6",
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Tech Insider 2025 */}
      <div className="text-white py-12 px-4" style={{ backgroundColor: "#4A61C0" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Share Your Thoughts</h1>
          <div className="flex items-center justify-center gap-2 text-blue-100">
            <Clock className="w-4 h-4" />
            <span className="text-lg">3 mins estimated time to complete</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            {/* Instructions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#4A61C0" }}>
                Instructions
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>
                 We welcome all users to share their thoughts with us, whether it's feedback, a discussion topic, 
                 or a complaint, through our submission form. Your input helps us improve and build a better community together. 
                 To submit, simply complete all required fields in the form. Submissions are reviewed regularly, and we may follow up with you if needed.
                </p>
               
              </div>
            </div>

            {/* Form Fields */}
            <form className="space-y-8">
              {/* Section 1 & 2 - Name Fields */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-900">
                    1. Your Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="border-gray-300 bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-900">
                    2. Post/Report Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="border-gray-300 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Section 3 - University Email */}
              {/* <div className="space-y-2">
                <Label htmlFor="universityEmail" className="text-sm font-medium text-gray-900">
                  3. University-registered Email Address <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-gray-600 mb-2">Eg: @ntu.edu.sg, @nus.edu.sg etc.</p>
                <Input
                  id="universityEmail"
                  type="email"
                  value={formData.universityEmail}
                  onChange={(e) => handleInputChange("universityEmail", e.target.value)}
                  className="border-gray-300 bg-white"
                  required
                />
              </div> */}

              {/* Section 4 - Personal Email */}
              {/* <div className="space-y-2">
                <Label htmlFor="personalEmail" className="text-sm font-medium text-gray-900">
                  4. Personal Email Address <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-gray-600 mb-2">Eg: @gmail.com, @hotmail.com etc.</p>
                <Input
                  id="personalEmail"
                  type="email"
                  value={formData.personalEmail}
                  onChange={(e) => handleInputChange("personalEmail", e.target.value)}
                  className="border-gray-300 bg-white"
                  required
                />
              </div> */}

              {/* Section 5 - Mobile Number */}
              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="text-sm font-medium text-gray-900">
                  3. Mobile number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  placeholder="8123 4567"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                  className="border-gray-300 bg-white"
                  required
                />
                {/* {!formData.mobileNumber && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                      !
                    </span>
                    This field is required
                  </p>
                )} */}
              </div>

              {/* Section 6 - Expected Year of Graduation */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-900">
                  4. Priority Level <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="grad2026"
                      checked={formData.graduationYear === "2026"}
                      onCheckedChange={(checked) => checked && handleInputChange("graduationYear", "2026")}
                      className="data-[state=checked]:border-[#4A61C0]"
                      style={{ "--tw-ring-color": "#4A61C0" } as React.CSSProperties}
                    />
                    <Label htmlFor="grad2026" className="text-sm text-gray-700">
                      Urgent
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="grad2027"
                      checked={formData.graduationYear === "2027"}
                      onCheckedChange={(checked) => checked && handleInputChange("graduationYear", "2027")}
                      className="data-[state=checked]:border-[#4A61C0]"
                      style={{ "--tw-ring-color": "#4A61C0" } as React.CSSProperties}
                    />
                    <Label htmlFor="grad2027" className="text-sm text-gray-700">
                      Moderate 
                    </Label>
                  </div>
                   <div className="flex items-center space-x-3">
                    <Checkbox
                      id="grad2028"
                      checked={formData.graduationYear === "2028"}
                      onCheckedChange={(checked) => checked && handleInputChange("graduationYear", "2028")}
                      className="data-[state=checked]:border-[#4A61C0]"
                      style={{ "--tw-ring-color": "#4A61C0" } as React.CSSProperties}
                    />
                    <Label htmlFor="grad2028" className="text-sm text-gray-700">
                      Low
                    </Label>
                  </div>
                </div>
              </div>

              {/* Section 7 - University */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-900">
                  5. Affected Garden <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-3">
                  {gardens.map((uni) => (
                    <div key={uni} className="flex items-center space-x-3">
                      <Checkbox
                        id={`uni-${uni}`}
                        checked={formData.university === uni}
                        onCheckedChange={(checked) => checked && handleInputChange("university", uni)}
                        className="data-[state=checked]:border-[#4A61C0]"
                        style={{ "--tw-ring-color": "#4A61C0" } as React.CSSProperties}
                      />
                      <Label htmlFor={`uni-${uni}`} className="text-sm text-gray-700">
                        {uni}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 8 - Resume Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900">
                  6. Attach Photos (Optional) <span className="text-red-500">*</span>
                </Label>
                {/* <p className="text-sm text-gray-600 mb-2">Please upload your latest resume</p> */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors bg-gray-50">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">📎 or drag and drop here</p>
                  <p className="text-xs text-gray-500 mb-3">Maximum file size 5 MB</p>
                  <Button variant="outline" className="text-sm" type="button">
                    Choose file
                  </Button>
                </div>
              </div>

              {/* Section 9 - Why Interested */}
              <div className="space-y-2">
                <Label htmlFor="whyInterested" className="text-sm font-medium text-gray-900">
                  7. Detailed Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="whyInterested"
                  value={formData.whyInterested}
                  onChange={(e) => handleInputChange("whyInterested", e.target.value)}
                  className="border-gray-300 bg-white min-h-[120px] resize-none"
                  required
                />
              </div>

              {/* Section 10 - Additional Information */}
              {/* <div className="space-y-2">
                <Label htmlFor="additionalInfo" className="text-sm font-medium text-gray-900">
                  10. If there's any additional information that could be helpful to us when reviewing your application,
                  please include it below (optional)
                </Label>
                <p className="text-sm text-gray-600 mb-2">
                  Eg: your Github link, any tech communities you're part of, what excites you about tech in the public
                  sector etc.
                </p>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                  className="border-gray-300 bg-white min-h-[120px] resize-none"
                />
              </div> */}

              {/* Confirmation Section */}
              <div className="border-t pt-8 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Confirmation</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="confirmAvailability"
                      checked={formData.confirmAvailability}
                      onCheckedChange={(checked) => handleInputChange("confirmAvailability", checked as boolean)}
                      className="mt-1 data-[state=checked]:border-[#4A61C0]"
                      style={{ "--tw-ring-color": "#4A61C0" } as React.CSSProperties}
                    />
                    <Label htmlFor="confirmAvailability" className="text-sm text-gray-700 leading-relaxed">
                      I confirm my availability to attend this full-day event taking place on 15 Aug 2025 (9am to 6pm){" "}
                      <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="acknowledgeSelection"
                      checked={formData.acknowledgeSelection}
                      onCheckedChange={(checked) => handleInputChange("acknowledgeSelection", checked as boolean)}
                      className="mt-1 data-[state=checked]:border-[#4A61C0]"
                      style={{ "--tw-ring-color": "#4A61C0" } as React.CSSProperties}
                    />
                    <Label htmlFor="acknowledgeSelection" className="text-sm text-gray-700 leading-relaxed">
                      I acknowledge that my submission may be reviewed and followed up on if necessary, 
                      and that not all submissions will receive a response.{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full text-white py-4 text-lg font-medium rounded-lg hover:opacity-90"
                  style={{ backgroundColor: "#4A61C0" }}
                >
                  Submit now
                </Button>
              </div>
            </form>

            {/* Help Icon */}
            <div className="fixed bottom-6 right-6">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10 bg-white border-gray-300 shadow-lg hover:shadow-xl"
                type="button"
              >
                <span className="text-gray-600 font-medium">?</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="text-center mt-8 space-x-6 text-sm text-gray-600">
          <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: "#4A61C0" }}>
            Form Guide
          </a>
          <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: "#4A61C0" }}>
            Privacy
          </a>
          <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: "#4A61C0" }}>
            Terms of use
          </a>
          <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: "#4A61C0" }}>
            Report vulnerability
          </a>
        </div>
      </div>
    </div>
  )
}
