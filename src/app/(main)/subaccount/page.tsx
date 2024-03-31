import Unauthorized from "@/components/unauthorized";
import { getAuthUsetDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { state: string; code: string };
};

export default async function SubAccountPage({ searchParams }: Props) {
  const agencyId = await verifyAndAcceptInvitation();

  if (!agencyId) return <Unauthorized />;

  const user = await getAuthUsetDetails();

  if (!user) return;

  const getFirstSubAccountWithAccess = user.Permissions.find(
    (permission) => permission.access === true
  );

  if (searchParams.state) {
    const statePath = searchParams.state.split("___")[0];
    const stateSubaccountId = searchParams.state.split("___")[1];

    if (!stateSubaccountId) return <Unauthorized />;

    return redirect(
      `/subaccount/${stateSubaccountId}/${statePath}?code=${searchParams.code}`
    );
  }

  if (getFirstSubAccountWithAccess)
    redirect(`/subaccount/${getFirstSubAccountWithAccess.subAccountId}`);

  return <Unauthorized />;
}
