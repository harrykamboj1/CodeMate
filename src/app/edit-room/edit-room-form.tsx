"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditRoomAction } from "./actions";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

const githubRepoRegex =
  /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;

const regex = /^[a-zA-Z0-9, ]*$/;

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(100),
  githubRepo: z.string().regex(githubRepoRegex, {
    message: "Invalid GitHub repository URL",
  }),
  tags: z.string().min(1).max(50).regex(regex, {
    message:
      "Invalid input: Only alphanumeric characters, commas, and spaces are allowed.",
  }),
});

export default function EditRoomForm({ room }: { room: any }) {
  const { toast } = useToast();
  const session = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: room.name,
      description: room.description,
      githubRepo: room.githubRepo,
      tags: room.tags,
    },
  });

  if (!session) {
    return;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await EditRoomAction(
      { id: room.id as string, ...values },
      session.data?.user.id!
    );
    toast({
      title: "Room updated",
      description: "Your room was successfully updated",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the name" {...field} />
              </FormControl>
              <FormDescription>This is your public room name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter the description" {...field} />
              </FormControl>
              <FormDescription>
                Please describe what you will be coding on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Repository</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/...." {...field} />
              </FormControl>
              <FormDescription>
                Please put a link to the project you are working on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="typescript, tailwind, java ..."
                />
              </FormControl>
              <FormDescription>
                List the programming languages, Frameworks, Libraries you are
                working on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size={"lg"} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
