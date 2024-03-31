import { Role } from "@prisma/client";

type Props = {
  role: Role;
};

export default function EmailSend({ role }: Props) {
  return (
    <>
      <p>Hello,</p>
      <p>
        You have been invited to join Plura App as a{" "}
        {role === "AGENCY_ADMIN"
          ? "Agency Admin"
          : role === "SUBACCOUNT_GUEST"
          ? "Sub Account Guest"
          : "Sub Account User"}
        . Please sign up at <a href={process.env.NEXT_PUBLIC_URL}>Plura</a> to
        get started.
      </p>
      <p>
        Best regards,
        <br />
        Saptak Bose - Plura
      </p>
    </>
  );
}
