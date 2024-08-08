"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getWeaponLogByNameRow } from "@/sqlc/query_sql";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { update } from "./_actions/update";

const schema = z.object({
  url: z.string(),
});

type FieldInputs = z.input<typeof schema>;
type FieldOutputs = z.output<typeof schema>;

export function UpdateForm({
  weaponLog,
}: {
  weaponLog: getWeaponLogByNameRow;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [isBusy, setIsBusy] = useState(false);

  const form = useForm<FieldInputs, unknown, FieldOutputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      url: weaponLog.url || "",
    },
  });

  const submit = useCallback(async (values: FieldOutputs) => {
    try {
      setIsBusy(true);

      await update(weaponLog, {
        url: values.url,
      });

      toast({
        title: "保存しました",
      });

      router.refresh();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "保存できませんでした",
      });
    } finally {
      setIsBusy(false);
    }
  }, [router, toast, weaponLog]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

        <hr className="my-4" />

        <div className="flex justify-start">
          <Button
            variant="default"
            disabled={isBusy}>
            保存
          </Button>
        </div>
      </form>
    </Form>
  );
}
