"use client"
import ContactList from "@/components/contact-list"

export default function ContactsPage() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold mb-6">Contact Directory</h1>
        <p className="text-muted-foreground mb-8 mx-auto md:mx-0 max-w-3xl">
          Find contact information for key officials and departments in the Grampanchayat.
        </p>
      </div>

      <ContactList />
    </div>
  )
}