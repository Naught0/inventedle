"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Stack } from "@/components/ui/stack";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useForm, useStore } from "@tanstack/react-form";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { CgSpinner } from "react-icons/cg";
import { SectionHeading } from "./section-heading";
import { CopyInput } from "@/components/ui/copy-input";
import { updateUser } from "@/actions/server-actions";

function FormField({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <Stack className={cn("gap-1", className)}>{children}</Stack>;
}

const defaultValues = {
  isPublic: false,
  name: "",
  image: "",
  id: "",
};

export function UserSettingsForm() {
  const { data: session, refetch, isRefetching } = useSession();
  const form = useForm({
    asyncDebounceMs: 1000,
    defaultValues: session?.user ?? defaultValues,
    onSubmit: async ({ value: { isPublic, name, image, id } }) => {
      await updateUser({
        id,
        name,
        image,
        isPublic,
      });
      refetch({ query: { disableCookieCache: true } });
    },
  });
  useEffect(
    function hydrateForm() {
      if (!session?.user) return;
      const user = session.user;

      form.reset(
        {
          id: user.id,
          image: user.image ?? "",
          name: user.name,
          isPublic: user.isPublic,
        },
        { keepDefaultValues: true },
      );
    },
    [session?.user, form],
  );

  const imageUrl = useStore(form.store, (state) => state.values.image);
  const lastImageUrl = useRef(
    typeof window !== "undefined"
      ? (sessionStorage.getItem("userImageUrl") ?? "")
      : "",
  );

  useEffect(
    function syncLastImage() {
      if (imageUrl) {
        lastImageUrl.current = imageUrl;
        sessionStorage.setItem("userImageUrl", imageUrl);
      }
    },
    [imageUrl],
  );
  if (!session) return null;

  return (
    <form action={form.handleSubmit} className="w-full">
      <Stack className="w-full gap-3">
        <Stack>
          <SectionHeading>Privacy</SectionHeading>
          <form.Field name={"isPublic"}>
            {(field) => {
              return (
                <Stack>
                  <Stack className="bg-accent relative rounded-lg p-3">
                    {isRefetching && (
                      <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center rounded-lg bg-black/30">
                        <CgSpinner className="animate-spin text-4xl" />
                      </div>
                    )}
                    <Label className="inline-flex items-center justify-start gap-2">
                      <Checkbox
                        checked={field.state.value}
                        onCheckedChange={(e) => {
                          field.handleChange(e === true);
                          form.handleSubmit();
                        }}
                        name={field.name}
                        id={field.name}
                      />
                      <Stack className="gap-0">
                        <span>Public profile</span>
                        <span className="text-muted-foreground text-sm font-normal">
                          Your profile is visible to{" "}
                          <span className="underline underline-offset-4">
                            {session.user.isPublic
                              ? "everyone"
                              : "friends only"}
                          </span>
                        </span>
                      </Stack>
                    </Label>
                  </Stack>
                  <Stack className="gap-1">
                    <p>Stats link</p>
                    <p className="text-muted-foreground text-sm">
                      Share your win ratio, average guesses, and more
                    </p>
                    <CopyInput
                      value={
                        typeof window !== "undefined"
                          ? `${window.location.origin}/stats/${session.user.id}`
                          : ""
                      }
                    />
                  </Stack>
                </Stack>
              );
            }}
          </form.Field>
          <SectionHeading>Profile</SectionHeading>
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length > 50
                  ? "Too long"
                  : value.length < 2
                    ? "Too short"
                    : undefined,
            }}
          >
            {(field) => {
              return (
                <FormField>
                  <Label>Name</Label>
                  <Input
                    autoComplete="off"
                    className={field.state.meta.isValid ? "" : "border-red-300"}
                    name={field.name}
                    id={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value ?? ""}
                  />
                  {!field.state.meta.isValid ? (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : (
                    <p className="text-muted-foreground align-middle text-xs">
                      (2-50 chars)
                    </p>
                  )}
                </FormField>
              );
            }}
          </form.Field>

          <form.Field name="image">
            {(field) => {
              return (
                <FormField className="flex items-center rounded-lg">
                  {field.state.value && (
                    <Image
                      src={field.state.value}
                      className="w-36 rounded-full shadow shadow-black"
                      alt="profile picture"
                      width={144}
                      height={144}
                    />
                  )}
                  <Stack horizontal>
                    {!field.state.value && (
                      <Button
                        variant={"link"}
                        onClick={() => field.handleChange(lastImageUrl.current)}
                        size="sm"
                        type="button"
                      >
                        restore image
                      </Button>
                    )}
                    {!!field.state.value && (
                      <Button
                        type="button"
                        variant={"link"}
                        onClick={() => field.handleChange("")}
                        size="sm"
                      >
                        remove image
                      </Button>
                    )}
                  </Stack>
                  <Stack className="w-full gap-1">
                    <Label>Image url</Label>
                    <Input
                      className="text-xs lg:text-sm"
                      name={field.name}
                      id={field.name}
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Stack>
                </FormField>
              );
            }}
          </form.Field>
          <form.Subscribe
            selector={({ canSubmit, isSubmitting, isDirty }) => [
              canSubmit,
              isSubmitting,
              isDirty,
            ]}
          >
            {([canSubmit, isSubmitting, isDirty]) => {
              return (
                <FormField>
                  <Stack className="flex-wrap" horizontal>
                    <Button
                      size="lg"
                      type="submit"
                      disabled={!canSubmit || !isDirty}
                      isLoading={isSubmitting}
                    >
                      Save
                    </Button>
                    <Button
                      size="lg"
                      type="reset"
                      variant="outline"
                      onClick={() =>
                        form.reset(undefined, { keepDefaultValues: true })
                      }
                      disabled={!isDirty}
                    >
                      Reset
                    </Button>
                  </Stack>
                </FormField>
              );
            }}
          </form.Subscribe>
        </Stack>
        <Stack className="mt-12">
          <SectionHeading>Data</SectionHeading>
          <FormField className="gap-2">
            <Label>Permanently Delete Account</Label>
            <Button
              className="w-fit"
              variant="destructive"
              type="button"
              onClick={() => window.alert("Doesn't work yet")}
            >
              Delete
            </Button>
          </FormField>
        </Stack>
      </Stack>
    </form>
  );
}
