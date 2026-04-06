import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams, useNavigate } from "react-router-dom";

export const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");

  if (!email) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Invalid access. Please register again.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Verify your Email
          </CardTitle>
          <CardDescription className="text-center">
            We have sent a verification link to your email address
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 text-center">
          <p className="text-sm font-medium">{email}</p>

          <CardDescription>
            Please check your inbox and click the verification link to activate
            your account.
          </CardDescription>

          <CardDescription>Didn't receive an email?</CardDescription>

          <Button className="w-full">Send again</Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => navigate("/authentication")}
          >
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
