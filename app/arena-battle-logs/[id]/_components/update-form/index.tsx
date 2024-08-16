"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getArenaBattleLogRow } from "@/sqlc/query_sql";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { save } from "./_actions/save";

const schema = z.object({
  point: z.string().pipe(z.coerce.number().min(1)),
  power: z.string().pipe(z.coerce.number().min(1)),
  opponentPoint: z.string().pipe(z.coerce.number().min(1)),
  opponentPower: z.string().pipe(z.coerce.number().min(1)),
  resultPoint: z.string().pipe(z.coerce.number().min(1)),
});

type FieldInputs = z.input<typeof schema>;
type FieldOutputs = z.output<typeof schema>;

const numberFormat = new Intl.NumberFormat();

export function UpdateForm({
  arenaBattleLog,
}: {
  arenaBattleLog: getArenaBattleLogRow;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [isBusy, setIsBusy] = useState(false);

  const [resultPointPlaceholder, setResultPointPlaceholder] = useState("");

  const form = useForm<FieldInputs, unknown, FieldOutputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      point: `${arenaBattleLog.point}`,
      power: `${arenaBattleLog.power}`,
      opponentPoint: `${arenaBattleLog.opponentPoint}`,
      opponentPower: `${arenaBattleLog.opponentPower}`,
      resultPoint: `${arenaBattleLog.resultPoint}`,
    },
  });

  const submit = useCallback(async (values: FieldOutputs) => {
    try {
      setIsBusy(true);

      await save(arenaBattleLog.id, values);

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
  }, [arenaBattleLog.id, router, toast]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-y-4">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="point"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Point</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

          <FormField
            control={form.control}
            name="power"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Power</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
        </div>

        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="opponentPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opponent Point</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

          <FormField
            control={form.control}
            name="opponentPower"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opponent Power</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
        </div>

        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="resultPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Result Point</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric"
                    placeholder={resultPointPlaceholder} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
        </div>

        <hr className="my-4" />

        <div className="flex justify-start">
          <Button variant="default" disabled={isBusy}>
            保存
          </Button>
        </div>
      </form>
    </Form>
  );
}
