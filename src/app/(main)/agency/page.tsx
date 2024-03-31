import AgencyDetails from "@/components/forms/agency-details";
import Unauthorized from "@/components/unauthorized";
import { getAuthUsetDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { Plan } from "@prisma/client";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    plan: Plan;
    state: string;
    code: string;
  };
};

export default async function AgencyPage({ searchParams }: Props) {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await getAuthUsetDetails();

  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER")
      redirect("/subaccount");
    else if (user?.role === "AGENCY_ADMIN" || user?.role === "AGENCY_OWNER") {
      if (searchParams.plan)
        redirect(`/agency${agencyId}/billing?plan=${searchParams.plan}`);

      if (searchParams.state) {
        const statePath = searchParams.state.split("___")[0];
        const stateAgencyId = searchParams.state.split("___")[1];

        if (!stateAgencyId) return <Unauthorized />;

        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
        );
      } else redirect(`/agency/${agencyId}`);
    } else return <Unauthorized />;
  }

  const authUser = await currentUser();

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[850px] border p-4 rounded-xl">
        <h1 className="text-4xl mb-2">Create an Agency</h1>
        <AgencyDetails
          data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
        />
      </div>
    </div>
  );
}
