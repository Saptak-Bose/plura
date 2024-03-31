import BlurPage from "@/components/global/blur-page";
import Infobar from "@/components/global/infobar";
import Sidebar from "@/components/sidebar";
import Unauthorized from "@/components/unauthorized";
import {
  getAuthUsetDetails,
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function SubAccountIdLayout({
  children,
  params,
}: {
  children: Readonly<React.ReactNode>;
  params: { subAccountId: string };
}) {
  const agencyId = await verifyAndAcceptInvitation();

  if (!agencyId) return <Unauthorized />;

  const user = await currentUser();

  if (!user) redirect("/");

  let notifications: any = [];

  if (!user.privateMetadata.role) return <Unauthorized />;
  else {
    const allPermissions = await getAuthUsetDetails();
    const hasPermission = allPermissions?.Permissions.find(
      (p) => p.access === true && p.subAccountId === params.subAccountId
    );

    if (!hasPermission) return <Unauthorized />;

    const allNotifications = await getNotificationAndUser(agencyId);

    if (
      user.privateMetadata.role === "AGENCY_ADMIN" ||
      user.privateMetadata.role === "AGENCY_OWNER"
    ) {
      notifications = allNotifications;
    } else {
      const filteredNoti = allNotifications?.filter(
        (item) => item.subAccountId === params.subAccountId
      );

      if (filteredNoti) notifications = filteredNoti;
    }
  }

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar id={params.subAccountId} type="subaccount" />

      <div className="md:pl-[300px]">
        <Infobar
          notifications={notifications}
          role={user.privateMetadata.role as Role}
          subAccountId={params.subAccountId as string}
        />
        <div className="relative">
          <BlurPage>{children}</BlurPage>
        </div>
      </div>
    </div>
  );
}
