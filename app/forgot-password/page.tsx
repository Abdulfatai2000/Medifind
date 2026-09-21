import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <PageWrapper className="justify-center items-center py-10 md:py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Reset password</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <Input id="email" type="email" placeholder="name@example.com" required />
            </div>
            
            <Button className="w-full" type="button">
              Send Reset Link
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-500 border-t pt-4 w-full">
            Remembered your password?{" "}
            <Link href="/login" className="font-semibold text-emerald-600 hover:underline">
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </PageWrapper>
  );
}
