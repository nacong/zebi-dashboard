'use client';

import { Suspense } from "react";
import LoginForm from "../ui/login/login-form";

export default function Page() {

  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}