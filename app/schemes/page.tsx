"use client"
import SchemeList from "@/components/scheme-list"

export default function SchemesPage() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold mb-6">Government Schemes</h1>
        <p className="text-muted-foreground mb-8 mx-auto md:mx-0 max-w-3xl">
          Explore various government schemes available for citizens. These schemes are designed to provide benefits and
          support to eligible individuals and families.
        </p>
      </div>

      <SchemeList />
    </div>
  )
}