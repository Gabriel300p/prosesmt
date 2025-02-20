"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import states from "@/data/StateList";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "./schema";

export function NewItem() {
  const [submittedData, setSubmittedData] = useState<null | object>(null);

  // Inicializa o formulário com os valores padrão e o resolver do zod
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      state: "",
      cases: 0,
      confirmed: 0,
      deaths: 0,
      refuses: 0,
      date: "",
    },
  });

  // Como não tem uma rota para adição de dados, faço apenas uma console.log e coloco os dados em um state para exibição no fim do formulário
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Dados enviados:", data);
    setSubmittedData(data);
  }

  return (
    <div>
      {/* Formulário de cadastro */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3 mt-3"
        >
          <Controller
            control={form.control}
            name="state"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((estado) => (
                        <SelectItem key={estado.value} value={estado.value}>
                          {estado.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {error ? <FormMessage>{error.message}</FormMessage> : null}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cases"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Casos</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmados</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deaths"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mortos</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="refuses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recuperados</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-end w-full col-span-2 mt-4">
            <div className="flex-1" />
            <Button type="submit" className=" ">
              Confirmar dados
            </Button>
          </div>
        </form>
      </Form>

      {/* Exibição dos dados enviados */}
      {submittedData && (
        <div className="mt-6 p-4 border rounded-md bg-gray-100">
          <h3 className="text-md font-semibold">Dados enviados:</h3>
          <pre className="text-sm">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
