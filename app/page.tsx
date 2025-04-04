import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import SchemeList from "@/components/scheme-list"
import ContactList from "@/components/contact-list"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />

        <section className="py-12 px-6 sm:px-8 lg:px-12 bg-gray-50">
          <div className="mx-auto max-w-4xl 2xl:max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Register Complaints</CardTitle>
                  <CardDescription>Submit your grievances directly to the Grampanchayat</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our complaint system ensures your issues are heard and resolved promptly by the appropriate
                    authorities.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/complaints" passHref>
                    <Button className="w-full">Register Complaint</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Government Schemes</CardTitle>
                  <CardDescription>Learn about beneficial government schemes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Stay informed about the latest government schemes and benefits available to you and your family.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/schemes" passHref>
                    <Button className="w-full">View Schemes</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Workers Directory</CardTitle>
                  <CardDescription>Find skilled workers in your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Connect with local electricians, plumbers, carpenters, and other skilled workers for your needs.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/workers" passHref>
                    <Button className="w-full">Find Workers</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl 2xl:max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-8">Latest Schemes</h2>
            <SchemeList limit={3} />
            <div className="text-center mt-8">
              <Link href="/schemes" passHref>
                <Button variant="outline">View All Schemes</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 px-6 sm:px-8 lg:px-12 bg-gray-50">
          <div className="mx-auto max-w-4xl 2xl:max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-8">Contact Directory</h2>
            <ContactList limit={4} />
            <div className="text-center mt-8">
              <Link href="/contacts" passHref>
                <Button variant="outline">View All Contacts</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}