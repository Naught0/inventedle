"use client";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { updateInvention } from "@/db/actions";

export default function InventionUpdateInput(
  props: TextareaProps & { inventionId: number },
) {
  return (
    <Textarea
      onBlur={async (e) => {
        await updateInvention({
          id: props.inventionId,
          name: e.target.textContent ?? "",
        });
      }}
      {...props}
    />
  );
}
