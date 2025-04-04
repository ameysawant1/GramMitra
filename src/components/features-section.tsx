import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Briefcase, Phone } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: "Complaint Registration",
      description: "Submit and track your complaints directly to the Grampanchayat",
    },
    {
      icon: Users,
      title: "Government Schemes",
      description: "Stay informed about the latest government schemes and benefits",
    },
    {
      icon: Briefcase,
      title: "Workers Directory",
      description: "Find skilled workers in your area for various services",
    },
    {
      icon: Phone,
      title: "Contact Directory",
      description: "Access contact information for key officials and departments",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our Services</h2>
            <p className="mx-auto max-w-2xl text-gray-600 md:text-xl">
              Connecting citizens with essential services and information
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {features.map((feature, index) => (
            <Card key={index} className="h-full flex flex-col items-center justify-center text-center p-8 shadow-md hover:shadow-xl transition-all">
              <CardHeader className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="mt-4 text-lg font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-500">{feature.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
