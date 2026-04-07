import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useEmailVerifyConfirm } from "@/hooks/authHooks/use.email.confirm";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { AxiosError } from "axios";

export const EmailConfirmPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { mutate, isPending, isSuccess, isError, error } =
    useEmailVerifyConfirm();

  useEffect(() => {
    if (token) {
      mutate(token);
    }
  }, [token, mutate]);

  if (!token) {
    return (
      <>
        <p>Invalid verification link.</p>
        <Button onClick={() => navigate("/authentication")}>
          Back to Login
        </Button>
      </>
    );
  }

  return (
    <>
      {isPending && <p>Verifying your email...</p>}

      {isSuccess && <p>Email confirmed successfully.</p>}

      {isError && (
        <p>
          {(error as AxiosError<{ message: string }>)?.response?.data
            ?.message || "Verification failed"}
        </p>
      )}

      <Button
        variant="ghost"
        className="w-full"
        onClick={() => navigate("/authentication")}
        disabled={isPending}
      >
        Back to Login
      </Button>
    </>
  );
};
