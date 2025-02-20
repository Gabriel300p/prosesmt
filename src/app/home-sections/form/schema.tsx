import { z } from "zod";

const FormSchema = z.object({
  state: z.string().min(2, { message: "O estado é obrigatório." }),
  cases: z.preprocess(
    (a) => Number(a),
    z.number().min(1, { message: "O número de casos é obrigatório." })
  ),
  confirmed: z.preprocess(
    (a) => Number(a),
    z.number().min(1, { message: "O número de confirmados é obrigatório." })
  ),
  deaths: z.preprocess(
    (a) => Number(a),
    z.number().min(0, { message: "O número de mortos é obrigatório." })
  ),
  refuses: z.preprocess(
    (a) => Number(a),
    z.number().min(0, { message: "O número de recuperados é obrigatório." })
  ),
  date: z.string().min(1, { message: "A data é obrigatória." }),
});

export { FormSchema };
