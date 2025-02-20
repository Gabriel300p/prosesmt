"use client";

import CardList from "@/components/cardList";
import LoadingCardList from "@/components/loadingCardList";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StateData from "@/types/State";
import { useCallback, useEffect, useState } from "react";
import { NewItem } from "./form/NewItem";

export default function Brasil() {
  // State para armazenar os dados dos estados
  const [states, setStates] = useState<StateData[]>([]);
  // State para armazenar o status de carregamento da API
  const [loading, setLoading] = useState<boolean>(true);
  // State para armazenar o estado selecionado
  const [selectedState, setSelectedState] = useState<string>("todos");
  // State para armazenar a data selecionada
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Função para buscar os dados e memorizar os dados usando o useCallback
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Se uma data foi selecionada, converte "YYYY-MM-DD" para "YYYYMMDD" e usa a rota específica. Se nenhuma data for selecionada vai buscar com a rota padrão.
      const url =
        selectedDate.trim() !== ""
          ? `https://covid19-brazil-api.now.sh/api/report/v1/brazil/${selectedDate.replace(
              /-/g,
              ""
            )}`
          : "https://covid19-brazil-api.now.sh/api/report/v1";

      const response = await fetch(url);
      const jsonData = await response.json();

      // Ordena os estados por casos (maior → menor)
      const sortedStates = jsonData.data.sort(
        (a: StateData, b: StateData) => b.cases - a.cases
      );

      setStates(sortedStates);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setStates([]);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  // Busca os dados ao montar o componente
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Função para filtrar os estados
  const filteredStates =
    selectedState === "todos"
      ? states
      : states.filter((state) => state.state === selectedState);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-black text-lg font-semibold leading-tight">
          Lista de estados por casos (maior → menor)
        </h1>
        <Dialog>
          <DialogTrigger className={buttonVariants({ variant: "default" })}>
            Adicionar novo
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar novo item</DialogTitle>
            </DialogHeader>
            <NewItem />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros: Data e Estado */}
      <div className="flex  gap-3">
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="state" className="text-xs font-medium text-gray-800">
            Filtrar por estado
          </label>
          <Select onValueChange={(value) => setSelectedState(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              {/* Opção para voltar a mostrar todos os estados */}
              <SelectItem value="todos">Todos os estados</SelectItem>
              {states.map((state) => (
                <SelectItem key={state.state} value={state.state || ""}>
                  {state.state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="state" className="text-xs font-medium text-gray-800">
            Filtrar por data
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border rounded w-full text-sm text-semibold text-gray-800 h-full"
          />
        </div>
      </div>
      {/* Exibição dos dados */}
      <div className="flex flex-col gap-3">
        {/* Se nenhuma data foi selecionada, mostra o cabeçalho da tabela */}
        {loading ? (
          <>
            <LoadingCardList />
            <LoadingCardList />
            <LoadingCardList />
          </>
        ) : // Se a lista estive vazia, mostra a mensagem de "Nenhum dado encontrado"
        filteredStates.length === 0 ? (
          <div className="text-center font-medium text-gray-600 py-12">
            Nenhum dado encontrado
          </div>
        ) : (
          filteredStates.map((state) => (
            <CardList
              key={state.state}
              state={state.state}
              cases={state.cases}
              deaths={state.deaths}
              suspects={state.suspects}
              datetime={state.datetime ? new Date(state.datetime) : undefined} // Usar undefined se não houver data
            />
          ))
        )}
      </div>
    </div>
  );
}
