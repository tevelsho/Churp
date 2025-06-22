// import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar, Leaf, Mail, Phone, Award } from "lucide-react"
import Link from "next/link"

// Mock data for individual garden
const gardenData = {
  1: {
    id: 1,
    name: "Sunrise Community Garden",
    area: "East District",
    coordinator: "Sarah Chen",
    type: "Organic Vegetables",
    image: "/placeholder.svg?height=400&width=600",
    plots: 45,
    established: "2019",
    description:
      "A thriving organic vegetable garden focused on sustainable farming practices and community education. We grow seasonal vegetables and herbs while promoting environmental stewardship.",
    contact: {
      email: "sarah.chen@gardenscope.org",
      phone: "+65 9123 4567",
    },
    activities: [
      {
        date: "2024-01-15",
        title: "Winter Planting Workshop",
        description: "Learn about cold-season vegetables and proper planting techniques for winter crops.",
      },
      {
        date: "2024-01-08",
        title: "Composting 101 Session",
        description: "Introduction to home composting methods and sustainable waste management practices.",
      },
      {
        date: "2023-12-20",
        title: "Harvest Festival Celebration",
        description: "Community gathering to celebrate the year's harvest and share gardening experiences.",
      },
    ],
    stats: {
      totalHarvest: "2,450 kg",
      activeMembers: 38,
      weeklyHours: 120,
      sustainabilityScore: 95,
    },
  },
}

export default function GardenDetailPage({ params }: { params: { id: string } }) {
  const garden = gardenData[Number.parseInt(params.id) as keyof typeof gardenData] || gardenData[1]

  return (
    <div className="min-h-screen bg-green-50">
      {/* <Header /> */}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/discover" className="text-green-600 hover:text-green-700">
            ← Back to Gardens
          </Link>
        </div>

        {/* Garden Header */}
        <div className="bg-white rounded-lg shadow-sm border border-green-200 overflow-hidden mb-8">
          <div className="aspect-video bg-green-100 relative">
            <img src={garden.image || "/placeholder.svg"} alt={garden.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
              <h1 className="text-2xl font-bold text-green-800 mb-2">{garden.name}</h1>
              <div className="flex items-center text-gray-600 mb-1">
                <MapPin className="w-4 h-4 mr-2" />
                {garden.area}
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{garden.type}</Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">About This Garden</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{garden.description}</p>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {garden.activities.map((activity, index) => (
                  <div key={index} className="border-l-4 border-green-200 pl-4 py-2">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(activity.date).toLocaleDateString()}
                    </div>
                    <h4 className="font-semibold text-green-800 mb-1">{activity.title}</h4>
                    <p className="text-gray-600 text-sm">{activity.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Garden Statistics */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Garden Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{garden.stats.totalHarvest}</div>
                    <div className="text-sm text-gray-600">Total Harvest</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{garden.stats.activeMembers}</div>
                    <div className="text-sm text-gray-600">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{garden.stats.weeklyHours}</div>
                    <div className="text-sm text-gray-600">Weekly Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{garden.stats.sustainabilityScore}%</div>
                    <div className="text-sm text-gray-600">Sustainability</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Coordinator Info */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Garden Coordinator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-green-800">{garden.coordinator}</div>
                    <div className="text-sm text-gray-600">Lead Coordinator</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {garden.contact.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {garden.contact.phone}
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Contact Coordinator</Button>
              </CardContent>
            </Card>

            {/* Garden Details */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Garden Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Established</span>
                  <span className="font-semibold">{garden.established}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Plots</span>
                  <span className="font-semibold">{garden.plots}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Garden Type</span>
                  <Badge className="bg-green-100 text-green-800">{garden.type}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">District</span>
                  <span className="font-semibold">{garden.area}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Schedule
                </Button>
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  <Leaf className="w-4 h-4 mr-2" />
                  Join Garden
                </Button>
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  <Award className="w-4 h-4 mr-2" />
                  View Achievements
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
