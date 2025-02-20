"use client";

import CardList from "@/components/cardList";
import LoadingCardList from "@/components/loadingCardList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import StateData from "@/types/State";
import { useCallback, useEffect, useState } from "react";

export default function Global() {
  // State para armazenar os dados dos países
  const [countries, setCountries] = useState<StateData[]>([]);
  // State para armazenar o status de carregamento da API
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCountry, setSelectedCountry] = useState<string>("todos");

  // Função para buscar os dados e memorizá-los com useCallback
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/countries`
      );
      const jsonData = await response.json();

      // Ordena os países por casos (maior → menor)
      const sortedCountries = jsonData.data.sort(
        (a: StateData, b: StateData) => b.cases - a.cases
      );

      console.log("sortedCountries:", sortedCountries);

      setCountries(sortedCountries);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Busca os dados ao montar o componente
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Função para filtrar os países
  const filteredCountries =
    selectedCountry === "todos"
      ? countries
      : countries.filter((country) => country.country === selectedCountry);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center ">
        <h1 className="text-black text-base md:text-lg font-semibold leading-tight">
          Lista de países por casos <br className="block md:hidden" /> (maior →
          menor)
        </h1>
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor="state" className="text-xs font-medium text-gray-800">
          Filtrar por país
        </label>
        <Select onValueChange={(value) => setSelectedCountry(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por país" />
          </SelectTrigger>
          <SelectContent>
            {/* Opção para voltar a mostrar todos os países */}
            <SelectItem value="todos">Todos os países</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country.country} value={country.country || ""}>
                {country.country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Exibição dos dados */}
      <div className="flex flex-col gap-3">
        {loading ? (
          <>
            <LoadingCardList />
            <LoadingCardList />
            <LoadingCardList />
          </>
        ) : countries.length === 0 ? (
          <div className="text-center font-medium text-gray-600 py-12">
            Nenhum dado encontrado
          </div>
        ) : (
          filteredCountries.map((country) => (
            <CardList
              key={country.country}
              state={country.country}
              cases={country.cases}
              deaths={country.deaths}
              suspects={country.suspects}
              updated_at={
                country.updated_at ? new Date(country.updated_at) : undefined
              }
              datetime={
                country.datetime ? new Date(country.datetime) : undefined
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
