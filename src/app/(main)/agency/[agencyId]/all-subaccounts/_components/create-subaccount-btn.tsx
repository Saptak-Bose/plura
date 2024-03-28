"use client";

import { useModal } from "@/app/providers/modal-provider";
import SubAccountDetails from "@/components/forms/subaccount-details";
import CustomModal from "@/components/global/custom-modal";
import { Button } from "@/components/ui/button";
import { Agency, AgencySidebarOption, SubAccount, User } from "@prisma/client";
import { PlusCircleIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

type Props = {
  user: User & {
    Agency:
      | (
          | Agency
          | (null & {
              SubAccount: SubAccount[];
              SidebarOption: AgencySidebarOption[];
            })
        )
      | null;
  };
  id: string;
  className: string;
};

export default function CreateSubAccountButton({ className, id, user }: Props) {
  const { setOpen } = useModal();
  const agencyDetails = user.Agency;

  if (!agencyDetails) return;

  return (
    <Button
      className={twMerge("w-full flex gap-4", className)}
      onClick={() => {
        setOpen(
          <CustomModal
            title="Create a Sub Account"
            subHeading="You can switch between your agency account and the sub accounts from the sidebar."
          >
            <SubAccountDetails
              agencyDetails={agencyDetails}
              userId={user.id}
              userName={user.name}
            />
          </CustomModal>
        );
      }}
    >
        <PlusCircleIcon size={15} />
        Create Sub Account
    </Button>
  );
}
