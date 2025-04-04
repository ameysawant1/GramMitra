"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Loader2 } from "lucide-react"

const pmgsy: Scheme = {
  id: "1",
  title: "Pradhan Mantri Gram Sadak Yojana",
  description: "A centrally sponsored scheme launched on August 15, 2000, to provide road connectivity to unconnected rural villages.",
  eligibility: "Villages with a population of 500 or more (250 or more for tribal areas) are eligible.",
  benefits: "Provides all-weather road connectivity to rural areas, improving transportation and accessibility.",
};


export default function SchemeList({ limit }: { limit?: number }) {
  const [schemes, setSchemes] = useState<Scheme[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "schemes"))
        const schemesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Scheme[]

        setSchemes(limit ? schemesData.slice(0, limit) : schemesData)
      } catch (error) {
        console.error("Error fetching schemes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSchemes()
  }, [limit])

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (schemes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No schemes available at the moment</p>
      </div>
    )
  }

  return (
    <div className="mx-auto px-6 max-w-6xl">  {/* Added container with padding and max-width */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map((scheme) => (
          <Card key={scheme.id}>
            <CardHeader>
              <CardTitle>{scheme.title}</CardTitle>
              <CardDescription>{scheme.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Eligibility</h4>
                <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Benefits</h4>
                <p className="text-sm text-muted-foreground">{scheme.benefits}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

