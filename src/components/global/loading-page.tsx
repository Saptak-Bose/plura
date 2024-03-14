import Loading from "./loading";

type Props = {};

export default function LoadingPage({}: Props) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Loading />
    </div>
  );
}
