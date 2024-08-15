"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form as UIForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getLastArenaBattleLogRow } from "@/sqlc/query_sql";
import { zodResolver } from "@hookform/resolvers/zod";
import BigNumber from "bignumber.js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getApproximateResultPoint } from "./_actions/get-approximate-result-point";
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

export function Form({
  lastArenaBattleLog,
}: {
  lastArenaBattleLog: getLastArenaBattleLogRow | null;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [isBusy, setIsBusy] = useState(false);

  const [resultPointPlaceholder, setResultPointPlaceholder] = useState("");

  const setResultPointPlaceholderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const form = useForm<FieldInputs, unknown, FieldOutputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      point: lastArenaBattleLog
        ? BigNumber(lastArenaBattleLog.point)
          .plus(lastArenaBattleLog.resultPoint)
          .toString()
        : "",
      power: lastArenaBattleLog
        ? BigNumber(lastArenaBattleLog.power).toString()
        : "",
      opponentPoint: "",
      opponentPower: "",
      resultPoint: "",
    },
  });

  const submit = useCallback(async (values: FieldOutputs) => {
    try {
      setIsBusy(true);

      await save(values);

      toast({
        title: "保存しました",
      });

      router.push("/arena-battle-logs");
      router.refresh();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "保存できませんでした",
      });
    } finally {
      setIsBusy(false);
    }
  }, [router, toast]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "opponentPower") {
        if (setResultPointPlaceholderTimeoutRef.current) {
          clearTimeout(setResultPointPlaceholderTimeoutRef.current);
        }

        const parsedOpponentPower = z.coerce.number().safeParse(value.opponentPower);

        setResultPointPlaceholderTimeoutRef.current = setTimeout(async () => {
          const approximateResultPoint = await getApproximateResultPoint(parsedOpponentPower.data || 0);

          setResultPointPlaceholder(([
            numberFormat.format(approximateResultPoint.min),
            numberFormat.format(approximateResultPoint.max),
          ]).join(" - "));

          setResultPointPlaceholderTimeoutRef.current = null;
        }, 500);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [form]);

  return (
    <UIForm {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-y-4">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="point"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Point</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
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
                  <Input {...field} />
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
                  <Input {...field} />
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
    </UIForm>
  );
}
