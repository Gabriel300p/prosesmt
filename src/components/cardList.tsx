import StateData from "@/types/State";
import { FC } from "react";

const CardList: FC<StateData> = ({
  state,
  cases,
  deaths,
  suspects,
  datetime,
  updated_at,
}) => {
  const date = new Date(datetime ?? updated_at ?? 0);

  return (
    <div className="px-4 py-3 border border-gray-200 w-full flex flex-col md:flex-row items-center justify-between gap-4 rounded-sm">
      <div className="flex flex-row items-center md:items-start md:flex-col gap-1.5 w-full md:w-fit">
        <h2 className="text-base font-semibold text-gray-700">{state}</h2>
        <span className="block md:hidden">-</span>
        {/* Exibe a data de atualização */}
        <span className="text-sm text-gray-800 font-normal">
          {date instanceof Date && !isNaN(date.getTime())
            ? `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`
            : "Data indisponível"}
        </span>
      </div>
      <div className="flex gap-4 md:gap-8 justify-around">
        {cases !== null && (
          <>
            <div className="flex flex-col items-center">
              <span className="text-base text-gray-600 font-bold">{cases}</span>
              <span className="text-sm text-gray-600 font-normal">Casos</span>
            </div>
            <div className="w-px min-h-10 h-full bg-gray-200" />
          </>
        )}
        {deaths !== null && (
          <>
            <div className="flex flex-col items-center">
              <span className="text-base text-gray-600 font-bold">
                {deaths}
              </span>
              <span className="text-sm text-gray-600 font-normal">Mortes</span>
            </div>
          </>
        )}
        {suspects !== null && suspects !== undefined && (
          <>
            <div className="w-px min-h-10 h-full bg-gray-200" />
            <div className="flex flex-col items-center">
              <span className="text-base text-gray-600 font-bold">
                {suspects}
              </span>
              <span className="text-sm text-gray-600 font-normal">
                Suspeitas
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardList;
