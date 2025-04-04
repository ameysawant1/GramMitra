"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Loader2, Search } from "lucide-react"
import WorkerCard from "@/components/worker-card"

type Worker = {
  id: string
  name: string
  job_role: string
  phone: string
  location: string
}

export default function WorkersPage() {
  const [workers, setWorkers] = useState<Worker[]>([])
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [jobRoles, setJobRoles] = useState<string[]>([])

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "workers"))
        const workersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Worker[]

        setWorkers(workersData)
        setFilteredWorkers(workersData)

        // Extract unique job roles
        const roles = [...new Set(workersData.map((worker) => worker.job_role))]
        setJobRoles(roles)
      } catch (error) {
        console.error("Error fetching workers:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWorkers()
  }, [])

  useEffect(() => {
    let result = workers

    // Filter by search term
    if (searchTerm) {
      result = result.filter((worker) => worker.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by job role
    if (selectedRole) {
      result = result.filter((worker) => worker.job_role === selectedRole)
    }

    setFilteredWorkers(result)
  }, [searchTerm, selectedRole, workers])

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Workers Directory</h1>
  
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Find Workers</CardTitle>
          <CardDescription>Search for skilled workers in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search by Name</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search workers..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="role">Filter by Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  {jobRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
  
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : filteredWorkers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-2">No workers found matching your criteria</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

