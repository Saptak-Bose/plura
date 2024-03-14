type Props = {
  params: {
    agencyId: string;
  };
};

export default function AgencyIdPage({ params }: Props) {
  return <div>{params.agencyId}</div>;
}
