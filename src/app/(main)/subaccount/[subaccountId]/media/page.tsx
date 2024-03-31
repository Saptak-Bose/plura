import Media from "@/components/media";
import { getMedia } from "@/lib/queries";

type Props = {
  params: { subAccountId: string };
};

export default async function MediaPage({ params }: Props) {
  const data = await getMedia(params.subAccountId);

  return <Media data={data} subAccountId={params.subAccountId} />
}
