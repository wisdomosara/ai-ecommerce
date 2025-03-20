import LoginPageComponent from "@/components/login/LoginPageComponent"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | StyleStore",
  description: "Login to your StyleStore account",
}

export default function LoginPage() {
  return <LoginPageComponent />
}

