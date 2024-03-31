"use client";

import { useModal } from "@/app/providers/modal-provider";
import { Button } from "../ui/button";
import CustomModal from "../global/custom-modal";
import { UploadCloudIcon } from "lucide-react";
import UploadMediaForm from "../forms/upload-media-form";

type Props = {
  subAccountId: string;
};

export default function MediaUploadButton({ subAccountId }: Props) {
  const { isOpen, setOpen, setClose } = useModal();

  return (
    <Button
      className="gap-1"
      onClick={() => {
        setOpen(
          <CustomModal
            title="Upload Media"
            subHeading="Upload a file to your media bucket."
          >
            <UploadMediaForm subAccountId={subAccountId} />
          </CustomModal>
        );
      }}
    >
      <UploadCloudIcon className="h-4 w-4" />
      Upload
    </Button>
  );
}
