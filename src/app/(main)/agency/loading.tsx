import Loading from "@/components/global/loading";

type Props = {};

export default function LoadingAgencyPage({}: Props) {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Loading />
    </div>
  );
}
