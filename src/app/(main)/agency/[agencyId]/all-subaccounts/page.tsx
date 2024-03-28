import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getAuthUsetDetails } from "@/lib/queries";
import { SubAccount } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./_components/delete-button";
import CreateSubAccountButton from "./_components/create-subaccount-btn";

type Props = {
  params: { agencyId: string };
};

export default async function AllSubAccountsPage({ params }: Props) {
  const user = await getAuthUsetDetails();

  if (!user) return;

  return (
    <AlertDialog>
      <div className="flex flex-col">
        <CreateSubAccountButton
          user={user}
          id={params.agencyId}
          className="w-[200px] self-end m-6"
        />
        <Command className="rounded-lg bg-transparent">
          <CommandInput placeholder="Search Accounts..." />
          <CommandList>
            {!!user.Agency?.SubAccount.length ? (
              <CommandEmpty>No results found...</CommandEmpty>
            ) : null}
            <CommandGroup heading="Sub Accounts">
              {!!user.Agency?.SubAccount.length ? (
                user.Agency.SubAccount.map((subaccount: SubAccount) => (
                  <CommandItem
                    key={subaccount.id}
                    className="h-32 !bg-background my-2 text-primary border border-border p-4 rounded-lg hover:!bg-background cursor-pointer transition-all"
                  >
                    <Link
                      href={`/subaccount/${subaccount.id}`}
                      className="flex gap-4 w-full h-full"
                    >
                      <div className="relative w-32">
                        <Image
                          className="rounded-md object-contain bg-muted/50 p-4"
                          src={subaccount.subAccountLogo}
                          fill
                          alt="subaccount-logo"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-col">
                          {subaccount.name}
                          <span className="text-muted-foreground text-xs">
                            {subaccount.address}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="text-destructive-foreground w-20 hover:bg-red-600 hover:text-white transform transition-all ease-in-out"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-left">
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-left">
                          This action {"can't"} be undone. This will permanently
                          delete the Sub Account and all the data related to it.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex items-center">
                        <AlertDialogCancel className="mr-2">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive hover:bg-destructive">
                          <DeleteButton subAccountId={subaccount.id} />
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </CommandItem>
                ))
              ) : (
                <div className="text-muted-foreground text-center p-4">
                  No sub accounts present...
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </AlertDialog>
  );
}
