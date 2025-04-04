import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MapPin } from "lucide-react"

type Worker = {
  id: string
  name: string
  job_role: string
  phone: string
  location: string
}

export default function WorkerCard({ worker }: { worker: Worker }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg">{worker.name}</h3>
            <p className="text-sm text-muted-foreground">{worker.job_role}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{worker.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${worker.phone}`} className="text-sm hover:underline">
                {worker.phone}
              </a>
            </div>
          </div>

          <Button asChild className="w-full" variant="outline">
            <a href={`tel:${worker.phone}`}>
              <Phone className="mr-2 h-4 w-4" />
              Call Worker
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

