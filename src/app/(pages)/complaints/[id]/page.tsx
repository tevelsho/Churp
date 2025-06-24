// import { Header } from "@/components/header"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Separator } from "../../../components/ui/separator"
import { AlertTriangle, Clock, CheckCircle, XCircle, User, Calendar, MapPin, MessageSquare } from "lucide-react"
import Link from "next/link"

// Mock data for individual complaint
const complaintData = {
  1: {
    id: 1,
    title: "Water System Malfunction in East Garden",
    category: "Infrastructure",
    status: "In Progress",
    priority: "High",
    submittedBy: "John Doe",
    submittedDate: "2024-01-10",
    lastUpdated: "2024-01-12",
    description:
      "The main irrigation system has been malfunctioning for 3 days, affecting multiple plots. Water pressure is extremely low and some sections are not receiving any water at all. This is affecting the growth of vegetables and herbs in approximately 15 plots.",
    garden: "Sunrise Community Garden",
    gardenId: 1,
    assignedTo: "Sarah Chen",
    estimatedResolution: "2024-01-15",
    updates: [
      {
        date: "2024-01-12",
        author: "Sarah Chen",
        message: "Maintenance team has been contacted. Parts have been ordered and should arrive by January 14th.",
      },
      {
        date: "2024-01-11",
        author: "John Doe",
        message: "Issue is getting worse. Now affecting 20+ plots. Urgent attention needed.",
      },
      {
        date: "2024-01-10",
        author: "System",
        message: "Complaint submitted and assigned to garden coordinator.",
      },
    ],
    affectedAreas: ["Section A", "Section B", "Section C"],
    relatedComplaints: [
      { id: 5, title: "Composting Area Overflow" },
      { id: 6, title: "Pathway Maintenance Required" },
    ],
  },
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Resolved":
      return <CheckCircle className="w-5 h-5 text-green-500" />
    case "In Progress":
      return <Clock className="w-5 h-5 text-yellow-500" />
    case "Under Review":
      return <AlertTriangle className="w-5 h-5 text-orange-500" />
    case "Open":
      return <XCircle className="w-5 h-5 text-red-500" />
    default:
      return <Clock className="w-5 h-5 text-gray-500" />
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

export default function ComplaintDetailPage({ params }: { params: { id: string } }) {
  const complaint = complaintData[Number.parseInt(params.id) as keyof typeof complaintData] || complaintData[1]

  return (
    <div className="min-h-screen bg-green-50">
      {/* <Header /> */}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/concerns" className="text-green-600 hover:text-green-700">
            ← Back to Complaints
          </Link>
        </div>

        {/* Complaint Header */}
        <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {getStatusIcon(complaint.status)}
              <h1 className="text-2xl font-bold text-green-800">{complaint.title}</h1>
            </div>
            <div className="flex gap-2">
              <Badge className={getStatusColor(complaint.status)}>{complaint.status}</Badge>
              <Badge className={getPriorityColor(complaint.priority)}>{complaint.priority} Priority</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <User className="w-4 h-4 mr-2" />
              Submitted by: <strong className="ml-1">{complaint.submittedBy}</strong>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              Date: <strong className="ml-1">{new Date(complaint.submittedDate).toLocaleDateString()}</strong>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              Garden:{" "}
              <Link
                href={`/garden/${complaint.gardenId}`}
                className="font-semibold text-green-600 hover:text-green-700 ml-1"
              >
                {complaint.garden}
              </Link>
            </div>
            <div className="flex items-center text-gray-600">
              <Badge variant="outline" className="border-green-200 text-green-700">
                {complaint.category}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Complaint Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{complaint.description}</p>
              </CardContent>
            </Card>

            {/* Updates Timeline */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Updates & Comments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {complaint.updates.map((update, index) => (
                  <div key={index} className="border-l-4 border-green-200 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-green-800">{update.author}</div>
                      <div className="text-sm text-gray-500">{new Date(update.date).toLocaleDateString()}</div>
                    </div>
                    <p className="text-gray-600">{update.message}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Affected Areas */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Affected Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {complaint.affectedAreas.map((area, index) => (
                    <Badge key={index} variant="outline" className="border-green-200 text-green-700">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignment Info */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Assignment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Assigned To</div>
                  <div className="font-semibold text-green-800">{complaint.assignedTo}</div>
                  <div className="text-sm text-gray-500">Garden Coordinator</div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm text-gray-600 mb-1">Last Updated</div>
                  <div className="font-semibold">{new Date(complaint.lastUpdated).toLocaleDateString()}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Estimated Resolution</div>
                  <div className="font-semibold">{new Date(complaint.estimatedResolution).toLocaleDateString()}</div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Contact Assignee</Button>
              </CardContent>
            </Card>

            {/* Related Complaints */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Related Complaints</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {complaint.relatedComplaints.map((related) => (
                  <Link
                    key={related.id}
                    href={`/complaints/${related.id}`}
                    className="block p-3 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <div className="text-sm font-medium text-green-800">{related.title}</div>
                    <div className="text-xs text-gray-500">Complaint #{related.id}</div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Add Comment
                </Button>
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Subscribe to Updates
                </Button>
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Print Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
