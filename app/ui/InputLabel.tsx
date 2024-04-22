import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface props {
    label: string,
}

export function InputWithLabel({ label }:props) {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor={label}>{label}</Label>
            <Input type={label} id={label} placeholder={label} required/>
        </div>
    )
}