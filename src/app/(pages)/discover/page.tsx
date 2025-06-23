// import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Users, Leaf } from "lucide-react"
import Link from "next/link"

// Mock data for gardens
const gardens = [
  {
    id: 1,
    name: "Sunrise Community Garden",
    area: "East District",
    coordinator: "Sarah Chen",
    type: "Organic Vegetables",
    image: "/placeholder.svg?height=200&width=300",
    plots: 45,
    established: "2019",
  },
  {
    id: 2,
    name: "Heritage Herb Garden",
    area: "Central District",
    coordinator: "Michael Rodriguez",
    type: "Medicinal Herbs",
    image: "/placeholder.svg?height=200&width=300",
    plots: 32,
    established: "2020",
  },
  {
    id: 3,
    name: "Rainbow Flower Garden",
    area: "West District",
    coordinator: "Emily Johnson",
    type: "Native Flowers",
    image: "/placeholder.svg?height=200&width=300",
    plots: 28,
    established: "2021",
  },
  {
    id: 4,
    name: "Green Thumb Collective",
    area: "North District",
    coordinator: "David Kim",
    type: "Mixed Cultivation",
    image: "/placeholder.svg?height=200&width=300",
    plots: 52,
    established: "2018",
  },
  {
    id: 5,
    name: "Butterfly Haven Garden",
    area: "South District",
    coordinator: "Lisa Thompson",
    type: "Pollinator Plants",
    image: "/placeholder.svg?height=200&width=300",
    plots: 38,
    established: "2022",
  },
  {
    id: 6,
    name: "Urban Oasis Garden",
    area: "Central District",
    coordinator: "James Wilson",
    type: "Rooftop Garden",
    image: "/placeholder.svg?height=200&width=300",
    plots: 24,
    established: "2023",
  },
]

export default function KnowYourGardenPage() {
  return (
    <div className="min-h-screen bg-green-50">
      {/* <Header /> */}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-4">Know Your Garden</h1>
          <p className="text-gray-600 mb-6">
            Discover community gardens in your area and learn about their coordinators, specialties, and activities.
          </p>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search gardens..." className="pl-10 border-green-200 focus:border-green-500" />
              </div>
              <Select>
                <SelectTrigger className="border-green-200 focus:border-green-500">
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  <SelectItem value="east">East District</SelectItem>
                  <SelectItem value="west">West District</SelectItem>
                  <SelectItem value="north">North District</SelectItem>
                  <SelectItem value="south">South District</SelectItem>
                  <SelectItem value="central">Central District</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="border-green-200 focus:border-green-500">
                  <SelectValue placeholder="Garden Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="vegetables">Organic Vegetables</SelectItem>
                  <SelectItem value="herbs">Medicinal Herbs</SelectItem>
                  <SelectItem value="flowers">Native Flowers</SelectItem>
                  <SelectItem value="mixed">Mixed Cultivation</SelectItem>
                  <SelectItem value="pollinator">Pollinator Plants</SelectItem>
                  <SelectItem value="rooftop">Rooftop Garden</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Gardens Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gardens.map((garden) => (
            <Card key={garden.id} className="border-green-200 hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-video bg-green-100 relative">
                <img
                  src={garden.image || "/placeholder.svg"}
                  alt={garden.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
                  {garden.type}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-green-800 mb-2">{garden.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-green-500" />
                    {garden.area}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-green-500" />
                    Coordinator: {garden.coordinator}
                  </div>
                  <div className="flex items-center">
                    <Leaf className="w-4 h-4 mr-2 text-green-500" />
                    {garden.plots} plots • Est. {garden.established}
                  </div>
                </div>
                <Button asChild className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                  <Link href={`/garden/${garden.id}`}>View Garden Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
