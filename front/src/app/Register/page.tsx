"use client"
import dynamic from "next/dynamic"
import withAuth from "@/components/utils/withAuth"

const RegisterForm = dynamic(() => import ("@/components/utils/registerForm"), {ssr: false});

export default withAuth(RegisterForm, true) // true = solo admin
