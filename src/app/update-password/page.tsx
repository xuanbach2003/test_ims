import { Suspense } from "react";
import UpdatePasswordForm from "../update-password/UpdatePasswordForm";

export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePasswordForm />
    </Suspense>
  );
}
