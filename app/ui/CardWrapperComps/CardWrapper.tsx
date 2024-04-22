import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import BackButton from "./BackButton"

interface CardWrapperProps {
  children: React.ReactNode,
  label: string
}

const CardWrapper = ({
  children,
  label,
}: CardWrapperProps) => {
  return (
    <Card className="w-[600px] px-12 shadow-md">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <BackButton/>
      </CardFooter>
    </Card>
  )
}

export default CardWrapper