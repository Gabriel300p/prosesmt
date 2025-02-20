// Componente de loading para o CardList

const LoadingCardList = ({}) => {
  return (
    <div className="px-4 py-3 border border-gray-200 w-full flex items-center justify-between gap-3 rounded-sm">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-base font-semibold bg-gray-300 h-4 w-12 rounded-sm"></h2>
        <span className="text-sm bg-gray-200 font-normal h-2 w-20 rounded-sm"></span>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-1 items-center justify-center min-w-20">
          <span className="text-base bg-gray-300 font-bold h-4 w-8 rounded-sm"></span>
          <span className="text-sm bg-gray-200 font-normal h-2 w-6 rounded-sm"></span>
        </div>
        <div className="w-px min-h-10 h-full bg-gray-200" />
        <div className="flex flex-col gap-1 items-center justify-center min-w-20">
          <span className="text-base bg-gray-300 font-bold h-4 w-8 rounded-sm"></span>
          <span className="text-sm bg-gray-200 font-normal h-2 w-6 rounded-sm"></span>
        </div>
        <div className="w-px min-h-10 h-full bg-gray-200" />
        <div className="flex flex-col gap-1 items-center justify-center min-w-20">
          <span className="text-base bg-gray-300 font-bold h-4 w-8 rounded-sm"></span>
          <span className="text-sm bg-gray-200 font-normal h-2 w-6 rounded-sm"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingCardList;
