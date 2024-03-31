"use client";

import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveActivityLogsNotification, sendInvitation } from "@/lib/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import Loading from "../global/loading";
import { useState } from "react";
import Link from "next/link";

type Props = {
  agencyId: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
};

const UserDataSchema = z.object({
  email: z.string().email(),
  role: z.enum(["AGENCY_ADMIN", "SUBACCOUNT_USER", "SUBACCOUNT_GUEST"]),
});

export default function SendInvitation({
  agencyId,
  userEmail,
  userFirstName,
  userLastName,
}: Props) {
  const { toast } = useToast();
  const [emailButton, setEmailButton] = useState(false);
  const [formEmailValue, setFormEmailValue] = useState("");
  const [formRoleValue, setFormRoleValue] = useState("");

  const form = useForm<z.infer<typeof UserDataSchema>>({
    resolver: zodResolver(UserDataSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      role: "SUBACCOUNT_USER",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserDataSchema>) => {
    try {
      const res = await sendInvitation(values.role, values.email, agencyId);
      await saveActivityLogsNotification({
        agencyId: agencyId,
        description: `Invited ${res.email}`,
        subAccountId: undefined,
      });
      toast({
        title: "Success",
        description:
          "Created an invitation. Please type your email and send to the respective user.",
      });
      setEmailButton(true);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Opps!",
        description: "Could not send invitation.",
      });
    }
  };

  return (
    <Card>
      {!emailButton ? (
        <>
          <CardHeader>
            <CardTitle>Invitation</CardTitle>
            <CardDescription>
              An invitation will be sent to the user. Users who already have an
              invitation sent out to their email, will not receive another
              invitation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <FormField
                  disabled={form.formState.isSubmitting}
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    setFormEmailValue(field.value);
                    return (
                      <FormItem className="flex-1">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  disabled={form.formState.isSubmitting}
                  control={form.control}
                  name="role"
                  render={({ field }) => {
                    setFormRoleValue(field.value);
                    return (
                      <FormItem className="flex-1">
                        <FormLabel>User role</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select user role..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="AGENCY_ADMIN">
                              Agency Admin
                            </SelectItem>
                            <SelectItem value="SUBACCOUNT_USER">
                              Sub Account User
                            </SelectItem>
                            <SelectItem value="SUBACCOUNT_GUEST">
                              Sub Account Guest
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <Button disabled={form.formState.isSubmitting} type="submit">
                  {form.formState.isSubmitting ? (
                    <Loading />
                  ) : (
                    "Send Invitation"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Send the Email</CardTitle>
            <CardDescription>
              Click on the link below to send your email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex my-2 items-center justify-center">
              <Link
                target="_blank"
                href={`https://mail.google.com/mail/u/${userEmail}/?view=cm&to=${formEmailValue}&su=Invitation+to+join+Plura+as+${formRoleValue}&body=This+is+an+invitation+sent+to+Mr.+or+Ms.+with+email+${formEmailValue}+to+join+Plura+as+${formRoleValue}+under+agency+owner+${userFirstName}+${userLastName}.+Sign+up+at+${
                  process.env.NEXT_PUBLIC_URL as string
                }+to+join.`}
              >
                <Button>Compose</Button>
              </Link>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
