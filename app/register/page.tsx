import RegisterPageComponent from "@/components/register/RegisterPageComponent"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register | StyleStore",
  description: "Create a new StyleStore account",
}

export default function RegisterPage() {
  return <RegisterPageComponent />
}

