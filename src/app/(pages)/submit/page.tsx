"use client"

// import { Header } from "@/components/header"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
import { PlusCircle, Send, Upload, MapPin, AlertTriangle } from "lucide-react"
import { useState } from "react"

export default function SubmitPage() {
  const [selectedTab, setSelectedTab] = useState("complaint")

  return (
    <div className="min-h-screen bg-green-50">
      {/* <Header /> */}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-800 mb-4">Submit to HearUs!</h1>
            <p className="text-gray-600">
              Help improve our community gardens by submitting complaints or registering new gardens.
            </p>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="complaint" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Submit Complaint
              </TabsTrigger>
              <TabsTrigger value="garden" className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                Register Garden
              </TabsTrigger>
            </TabsList>

            <TabsContent value="complaint">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Submit a Complaint
                  </CardTitle>
                  <p className="text-gray-600">
                    Report issues, problems, or concerns about community gardens in your area.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="complaint-title">Complaint Title *</Label>
                        <Input
                          id="complaint-title"
                          placeholder="Brief description of the issue"
                          className="border-green-200 focus:border-green-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="complaint-category">Category *</Label>
                        <Select required>
                          <SelectTrigger className="border-green-200 focus:border-green-500">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="infrastructure">Infrastructure</SelectItem>
                            <SelectItem value="pest-control">Pest Control</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="environmental">Environmental</SelectItem>
                            <SelectItem value="waste-management">Waste Management</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="complaint-garden">Affected Garden *</Label>
                        <Select required>
                          <SelectTrigger className="border-green-200 focus:border-green-500">
                            <SelectValue placeholder="Select garden" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sunrise">Sunrise Community Garden</SelectItem>
                            <SelectItem value="heritage">Heritage Herb Garden</SelectItem>
                            <SelectItem value="rainbow">Rainbow Flower Garden</SelectItem>
                            <SelectItem value="green-thumb">Green Thumb Collective</SelectItem>
                            <SelectItem value="butterfly">Butterfly Haven Garden</SelectItem>
                            <SelectItem value="urban-oasis">Urban Oasis Garden</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="complaint-priority">Priority Level *</Label>
                        <Select required>
                          <SelectTrigger className="border-green-200 focus:border-green-500">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-green-100 text-green-800">Low</Badge>
                                <span>Non-urgent issue</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="medium">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                                <span>Moderate concern</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="high">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-red-100 text-red-800">High</Badge>
                                <span>Urgent attention needed</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="complaint-description">Detailed Description *</Label>
                      <Textarea
                        id="complaint-description"
                        placeholder="Please provide a detailed description of the issue, including when it occurred, affected areas, and any other relevant information..."
                        className="border-green-200 focus:border-green-500 min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="complaint-name">Your Name *</Label>
                        <Input
                          id="complaint-name"
                          placeholder="Full name"
                          className="border-green-200 focus:border-green-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="complaint-email">Email Address *</Label>
                        <Input
                          id="complaint-email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="border-green-200 focus:border-green-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="complaint-phone">Phone Number (Optional)</Label>
                      <Input
                        id="complaint-phone"
                        type="tel"
                        placeholder="+65 9123 4567"
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Attach Photos (Optional)</Label>
                      <div className="border-2 border-dashed border-green-200 rounded-lg p-6 text-center hover:border-green-300 transition-colors">
                        <Upload className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white flex-1">
                        <Send className="w-4 h-4 mr-2" />
                        Submit Complaint
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50"
                      >
                        Save Draft
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="garden">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <PlusCircle className="w-5 h-5" />
                    Register a New Garden
                  </CardTitle>
                  <p className="text-gray-600">
                    Add a new community garden to our platform and help others discover it.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="garden-name">Garden Name *</Label>
                        <Input
                          id="garden-name"
                          placeholder="e.g., Sunset Community Garden"
                          className="border-green-200 focus:border-green-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="garden-type">Garden Type *</Label>
                        <Select required>
                          <SelectTrigger className="border-green-200 focus:border-green-500">
                            <SelectValue placeholder="Select garden type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vegetables">Organic Vegetables</SelectItem>
                            <SelectItem value="herbs">Medicinal Herbs</SelectItem>
                            <SelectItem value="flowers">Native Flowers</SelectItem>
                            <SelectItem value="mixed">Mixed Cultivation</SelectItem>
                            <SelectItem value="pollinator">Pollinator Plants</SelectItem>
                            <SelectItem value="rooftop">Rooftop Garden</SelectItem>
                            <SelectItem value="community">Community Garden</SelectItem>
                            <SelectItem value="educational">Educational Garden</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="garden-address">Garden Address *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="garden-address"
                          placeholder="Full address including postal code"
                          className="pl-10 border-green-200 focus:border-green-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="garden-district">District *</Label>
                        <Select required>
                          <SelectTrigger className="border-green-200 focus:border-green-500">
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="east">East District</SelectItem>
                            <SelectItem value="west">West District</SelectItem>
                            <SelectItem value="north">North District</SelectItem>
                            <SelectItem value="south">South District</SelectItem>
                            <SelectItem value="central">Central District</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="garden-plots">Number of Plots</Label>
                        <Input
                          id="garden-plots"
                          type="number"
                          placeholder="e.g., 25"
                          className="border-green-200 focus:border-green-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="garden-description">Garden Description *</Label>
                      <Textarea
                        id="garden-description"
                        placeholder="Describe the garden's purpose, features, activities, and what makes it special..."
                        className="border-green-200 focus:border-green-500 min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="coordinator-name">Coordinator Name *</Label>
                        <Input
                          id="coordinator-name"
                          placeholder="Garden coordinator's full name"
                          className="border-green-200 focus:border-green-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="coordinator-email">Coordinator Email *</Label>
                        <Input
                          id="coordinator-email"
                          type="email"
                          placeholder="coordinator@example.com"
                          className="border-green-200 focus:border-green-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="coordinator-phone">Coordinator Phone</Label>
                        <Input
                          id="coordinator-phone"
                          type="tel"
                          placeholder="+65 9123 4567"
                          className="border-green-200 focus:border-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="garden-established">Year Established</Label>
                        <Input
                          id="garden-established"
                          type="number"
                          placeholder="e.g., 2020"
                          min="1900"
                          max="2024"
                          className="border-green-200 focus:border-green-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Garden Photos</Label>
                      <div className="border-2 border-dashed border-green-200 rounded-lg p-6 text-center hover:border-green-300 transition-colors">
                        <Upload className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Upload photos of your garden</p>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each (max 5 photos)</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="submitter-name">Your Name *</Label>
                      <Input
                        id="submitter-name"
                        placeholder="Your full name"
                        className="border-green-200 focus:border-green-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="submitter-email">Your Email *</Label>
                      <Input
                        id="submitter-email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="border-green-200 focus:border-green-500"
                        required
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white flex-1">
                        <Send className="w-4 h-4 mr-2" />
                        Submit Garden Registration
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50"
                      >
                        Save Draft
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Information Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 text-lg">Submission Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p>• Provide accurate and detailed information</p>
                <p>• Include photos when possible to help with assessment</p>
                <p>• For urgent issues, also contact the garden coordinator directly</p>
                <p>• All submissions are reviewed within 2-3 business days</p>
                <p>• You'll receive email updates on the status of your submission</p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p>• Check our FAQ section for common questions</p>
                <p>• Contact us at support@hearus.org</p>
                <p>• Call our helpline: +65 6123 4567</p>
                <p>• Visit our community forum for discussions</p>
                <p>• Follow us on social media for updates</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
