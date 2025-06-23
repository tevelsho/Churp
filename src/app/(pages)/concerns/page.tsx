// import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, AlertTriangle, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

// Mock data for complaints
const complaints = [
  {
    id: 1,
    title: "Water System Malfunction in East Garden",
    category: "Infrastructure",
    status: "In Progress",
    priority: "High",
    submittedBy: "John Doe",
    submittedDate: "2024-01-10",
    description: "The main irrigation system has been malfunctioning for 3 days, affecting multiple plots.",
    garden: "Sunrise Community Garden",
  },
  {
    id: 2,
    title: "Pest Infestation in Herb Section",
    category: "Pest Control",
    status: "Resolved",
    priority: "Medium",
    submittedBy: "Maria Santos",
    submittedDate: "2024-01-08",
    description: "Aphid infestation detected in the medicinal herb section requiring immediate attention.",
    garden: "Heritage Herb Garden",
  },
  {
    id: 3,
    title: "Vandalism of Garden Tools",
    category: "Security",
    status: "Under Review",
    priority: "High",
    submittedBy: "David Kim",
    submittedDate: "2024-01-12",
    description: "Several garden tools were damaged overnight. Security measures need to be reviewed.",
    garden: "Green Thumb Collective",
  },
  {
    id: 4,
    title: "Soil Quality Concerns",
    category: "Environmental",
    status: "Open",
    priority: "Low",
    submittedBy: "Emily Johnson",
    submittedDate: "2024-01-05",
    description: "pH levels in section B are not optimal for flower growth. Soil testing recommended.",
    garden: "Rainbow Flower Garden",
  },
  {
    id: 5,
    title: "Composting Area Overflow",
    category: "Waste Management",
    status: "In Progress",
    priority: "Medium",
    submittedBy: "Lisa Thompson",
    submittedDate: "2024-01-11",
    description: "Composting bins are overflowing and need immediate attention to prevent odor issues.",
    garden: "Butterfly Haven Garden",
  },
  {
    id: 6,
    title: "Pathway Maintenance Required",
    category: "Infrastructure",
    status: "Open",
    priority: "Low",
    submittedBy: "James Wilson",
    submittedDate: "2024-01-09",
    description: "Garden pathways have developed cracks and potholes that need repair.",
    garden: "Urban Oasis Garden",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Resolved":
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case "In Progress":
      return <Clock className="w-4 h-4 text-yellow-500" />
    case "Under Review":
      return <AlertTriangle className="w-4 h-4 text-orange-500" />
    case "Open":
      return <XCircle className="w-4 h-4 text-red-500" />
    default:
      return <Clock className="w-4 h-4 text-gray-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Resolved":
      return "bg-green-100 text-green-800"
    case "In Progress":
      return "bg-yellow-100 text-yellow-800"
    case "Under Review":
      return "bg-orange-100 text-orange-800"
    case "Open":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800"
    case "Medium":
      return "bg-yellow-100 text-yellow-800"
    case "Low":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function KnowTheComplaintsPage() {
  return (
    <div className="min-h-screen bg-green-50">
      {/* <Header /> */}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-4">Know the Complaints</h1>
          <p className="text-gray-600 mb-6">
            Track and monitor community garden complaints, issues, and their resolution status.
          </p>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200 mb-8">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search complaints..." className="pl-10 border-green-200 focus:border-green-500" />
              </div>
              <Select>
                <SelectTrigger className="border-green-200 focus:border-green-500">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="pest">Pest Control</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="waste">Waste Management</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="border-green-200 focus:border-green-500">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="under-review">Under Review</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="border-green-200 focus:border-green-500">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <Card key={complaint.id} className="border-green-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(complaint.status)}
                      <h3 className="font-semibold text-green-800 text-lg">{complaint.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{complaint.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>
                        Submitted by: <strong>{complaint.submittedBy}</strong>
                      </span>
                      <span>Date: {new Date(complaint.submittedDate).toLocaleDateString()}</span>
                      <span>
                        Garden: <strong>{complaint.garden}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Badge className={getStatusColor(complaint.status)}>{complaint.status}</Badge>
                    <Badge className={getPriorityColor(complaint.priority)}>{complaint.priority} Priority</Badge>
                    <Badge variant="outline" className="border-green-200 text-green-700">
                      {complaint.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    <Link href={`/complaints/${complaint.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit New Complaint Button */}
        <div className="mt-8 text-center">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
          <Link href={`/submit`}>Submit New Complaint</Link>
            </Button>
        </div>
      </div>
    </div>
  )
}
