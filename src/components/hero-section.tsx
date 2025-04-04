import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-100 to-white text-gray-900">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center max-w-4xl">
        {/* Hero Text */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight whitespace-nowrap">
            Welcome to <span className="text-blue-600">GramMitra</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            A digital platform connecting citizens with local government services.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-6">
          <Button
            asChild
            size="lg"
            className="bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <Link href="/complaints">Register Complaint</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-blue-500 text-blue-600 shadow-lg bg-white/60 backdrop-blur-md hover:bg-blue-100 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <Link href="/workers">Find Workers</Link>
          </Button>
        </div>

    
      </div>
    </section>
  );
}
