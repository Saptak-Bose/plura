import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  searchParams: {
    state: string;
    code: string;
  };
  params: { subAccountId: string };
};

export default async function LaunchPadPage({ params, searchParams }: Props) {
  const subAccountDetails = await db.subAccount.findUnique({
    where: {
      id: params.subAccountId,
    },
  });

  if (!subAccountDetails) return;

  const allDetailsExist =
    subAccountDetails.address &&
    subAccountDetails.subAccountLogo &&
    subAccountDetails.city &&
    subAccountDetails.companyEmail &&
    subAccountDetails.companyPhone &&
    subAccountDetails.country &&
    subAccountDetails.name &&
    subAccountDetails.state &&
    subAccountDetails.zipCode;

  // WIP: Wire up stripe

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
        <Card className="border-none ">
          <CardHeader>
            <CardTitle>{"Let's Get Started!"}</CardTitle>
            <CardDescription>
              Follow the steps below to get your account set up...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg ">
              <div className="flex items-center gap-4">
                <Image
                  className="rounded-md object-contain"
                  src="/appstore.png"
                  height={80}
                  width={80}
                  alt="app-logo"
                />
                <p>Save the website as a shortcut on your mobile device.</p>
              </div>
              <Button>Add or Install</Button>
            </div>
            <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <Image
                  className="rounded-md object-contain "
                  src="/stripelogo.png"
                  height={80}
                  width={80}
                  alt="stripe-logo"
                />
                <p>
                  Connect your stripe account to accept payments. Stripe is used
                  to run payouts.
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center w-full h-20 border p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <Image
                  src={subAccountDetails.subAccountLogo}
                  alt="App logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain p-4"
                />
                <p>Fill in all your business details.</p>
              </div>
              {allDetailsExist ? (
                <CheckCircleIcon
                  size={50}
                  className=" text-primary p-2 flex-shrink-0"
                />
              ) : (
                <Link
                  className="bg-primary py-2 px-4 rounded-md text-white"
                  href={`/subaccount/${subAccountDetails.id}/settings`}
                >
                  Start
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
