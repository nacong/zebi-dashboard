'use client';
import { login } from "@/app/lib/actions";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import ZebiLogo from "../ui/zebi-logo";

export default function Page() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(login, undefined);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-8">
      
      <ZebiLogo />

      <h1 className="text-2xl">제비 대시보드</h1>

      <form action={formAction} className="flex flex-col gap-y-4">
        <input 
          name="code" 
          placeholder="단과대 코드"
          required 
          maxLength={6}
          className="w-[300px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700" />

        {errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}

        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button aria-disabled={isPending} className="w-[300px]">로그인</Button>
      </form>
    </div>
  );
}