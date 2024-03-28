"use client";

import {
  deleteSubAccount,
  getSubAccountDetails,
  saveActivityLogsNotification,
} from "@/lib/queries";
import { useRouter } from "next/navigation";

type Props = {
  subAccountId: string;
};

export default function DeleteButton({ subAccountId }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={async () => {
        const response = await getSubAccountDetails(subAccountId);

        await saveActivityLogsNotification({
          agencyId: undefined,
          description: `Deleted a sub account | ${response?.name}`,
          subAccountId,
        });

        await deleteSubAccount(subAccountId);

        router.refresh();
      }}
    >
      Delete Sub Account
    </div>
  );
}
