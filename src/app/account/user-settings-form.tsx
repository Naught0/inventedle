"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Stack } from "@/components/ui/stack";
import { updateUser } from "@/db/server-actions";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useForm, useStore } from "@tanstack/react-form";
import { useEffect, useState } from "react";

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
  const { data: session, refetch } = useSession();
  const form = useForm({
    asyncDebounceMs: 1000,
    defaultValues,
    onSubmit: async ({ value: { isPublic, name, image, id } }) => {
      await updateUser({
        id,
        name,
        image,
        isPublic,
      });
      refetch();
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
  const [lastImageUrl, setLastImageUrl] = useState(
    typeof window !== "undefined" ? sessionStorage.getItem("userImageUrl") : "",
  );

  useEffect(
    function syncLastImage() {
      if (imageUrl) {
        setLastImageUrl(imageUrl);
        sessionStorage.setItem("userImageUrl", imageUrl);
      }
    },
    [imageUrl],
  );

  return (
    <form action={form.handleSubmit} className="w-full">
      <Stack className="w-full gap-3">
        <Stack>
          <SectionHeading>Profile</SectionHeading>
          <form.Field name={"isPublic"}>
            {(field) => {
              return (
                <Label className="inline-flex items-center justify-start gap-2">
                  <Checkbox
                    checked={field.state.value}
                    onCheckedChange={(e) => field.handleChange(e === true)}
                    name={field.name}
                    id={field.name}
                  />
                  Public profile
                </Label>
              );
            }}
          </form.Field>
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length > 50
                  ? "Too long (<50 chars)"
                  : value.length < 2
                    ? "Too short (>2 chars)"
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
                  {!field.state.meta.isValid && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
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
                    <img
                      src={field.state.value}
                      className="w-36 rounded-full shadow shadow-black"
                    />
                  )}
                  <Stack horizontal>
                    {!field.state.value && (
                      <Button
                        variant={"link"}
                        onClick={() => field.handleChange(lastImageUrl)}
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
                  <Stack horizontal>
                    <Button
                      size="lg"
                      className="w-fit"
                      type="submit"
                      disabled={!canSubmit || !isDirty}
                      isLoading={isSubmitting}
                    >
                      Save
                    </Button>
                    <Button
                      size="lg"
                      type="reset"
                      className="w-fit"
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 flex flex-grow flex-col items-start gap-3">
      <h3 className="text-2xl font-extralight">{children}</h3>
      <Separator className="bg-status-error-foreground/40" />
    </div>
  );
}
