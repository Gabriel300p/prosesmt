// Tipagem para os dados dos estados

type StateData = {
  state?: string;
  country?: string;
  cases: number;
  deaths: number;
  suspects: number;
  datetime?: Date;
  updated_at?: Date;
};

export default StateData;
