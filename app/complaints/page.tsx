"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import ComplaintForm from "@/components/complaint-form"

export default function ComplaintsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    details: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push("/login")
      return
    }

    setIsSubmitting(true)

    try {
      await addDoc(collection(db, "complaints"), {
        ...formData,
        userId: user.uid,
        status: "Pending",
        createdAt: serverTimestamp(),
      })

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        details: "",
      })
    } catch (error) {
      console.error("Error submitting complaint:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Register a Complaint</h1>
  
        <Card>
          <CardHeader>
            <CardTitle>Complaint Form</CardTitle>
            <CardDescription>Fill out the form below to register your complaint with the Grampanchayat</CardDescription>
          </CardHeader>
          <CardContent>
            <ComplaintForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
