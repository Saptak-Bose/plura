import BlurPage from "@/components/global/blur-page";
import Infobar from "@/components/global/infobar";
import Sidebar from "@/components/sidebar";
import Unauthorized from "@/components/unauthorized";
import {
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function AgencyIdLayout({
  children,
  params,
}: {
  children: Readonly<React.ReactNode>;
  params: { agencyId: string };
}) {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await currentUser();

  if (!user) redirect("/");
  if (!agencyId) redirect("/agency");
  if (
    user.privateMetadata.role !== "AGENCY_OWNER" &&
    user.privateMetadata.role !== "AGENCY_ADMIN"
  )
    return <Unauthorized />;

  let allNoti: any = [];
  const notifications = await getNotificationAndUser(agencyId);

  if (notifications) allNoti = notifications;

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar id={params.agencyId} type="agency" />
      <div className="md:pl-[300px]">
        <Infobar notifications={allNoti} />
        <div className="relative">
          <BlurPage>{children}</BlurPage>
        </div>
      </div>
    </div>
  );
}
