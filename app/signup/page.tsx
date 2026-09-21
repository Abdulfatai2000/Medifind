import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <PageWrapper className="justify-center items-center py-10 md:py-16">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>
            Join MediFind to easily locate and reserve medicines.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="firstName">
                  First Name
                </label>
                <Input id="firstName" type="text" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="lastName">
                  Last Name
                </label>
                <Input id="lastName" type="text" placeholder="Doe" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <Input id="email" type="email" placeholder="name@example.com" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="phone">
                Phone Number
              </label>
              <Input id="phone" type="tel" placeholder="+234 800 000 0000" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <Input id="password" type="password" required />
              <p className="text-xs text-gray-500">Must be at least 8 characters long.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <Input id="confirmPassword" type="password" required />
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" 
                required
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 leading-tight"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-emerald-600 hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            <Button className="w-full" type="button">
              Create Account
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-500 border-t pt-4 w-full">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-emerald-600 hover:underline">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </PageWrapper>
  );
}
