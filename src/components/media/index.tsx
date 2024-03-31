import { GetMediaFiles } from "@/lib/types";
import MediaUploadButton from "./upload-button";

type Props = {
  data: GetMediaFiles;
  subAccountId: string;
};

export default function Media({ data, subAccountId }: Props) {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Media Bucket</h1>
        <MediaUploadButton subAccountId={subAccountId} />
      </div>
    </div>
  );
}
