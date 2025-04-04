"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { collection, getDocs, query, where, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [complaints, setComplaints] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchUserComplaints = async () => {
      if (!user) return

      try {
        const q = query(
          collection(db, "complaints"),
          where("userId", "==", user.uid),
          limit(5)
        )

        const querySnapshot = await getDocs(q)
        const complaintsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setComplaints(complaintsData)
      } catch (error) {
        console.error("Error fetching complaints:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchUserComplaints()
    }
  }, [user])

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-12 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">My Complaints</CardTitle>
            <CardDescription>Track your submitted complaints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">{complaints.length}</div>
            <Link href="/complaints" passHref>
              <Button className="w-full" size="lg">
                View All Complaints
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Workers Directory</CardTitle>
            <CardDescription>Find skilled workers in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/workers" passHref>
              <Button className="w-full" size="lg">
                Browse Workers
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Government Schemes</CardTitle>
            <CardDescription>Explore available schemes</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/schemes" passHref>
              <Button className="w-full" size="lg">
                View Schemes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="complaints" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="complaints">Recent Complaints</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="complaints">
          <Card>
            <CardHeader>
              <CardTitle>Your Recent Complaints</CardTitle>
              <CardDescription>Track the status of your recently submitted complaints</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : complaints.length > 0 ? (
                <div className="space-y-4">
                  {complaints.map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{complaint.subject}</h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            complaint.status === "Resolved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {complaint.status || "Pending"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(complaint.createdAt?.toDate()).toLocaleDateString()}
                      </p>
                      <p className="text-sm line-clamp-2">{complaint.details}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't submitted any complaints yet</p>
                  <Link href="/complaints" passHref>
                    <Button>Submit a Complaint</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent activity on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">No recent activity to display</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
