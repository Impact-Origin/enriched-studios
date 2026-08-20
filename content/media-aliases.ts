/**
 * Um ficheiro pode servir mais do que um lugar do site.
 * A chave é o lugar, o valor é o nome do ficheiro que existe em public/work.
 * Se um dia largarem lá um ficheiro com o nome do lugar, esse ganha e o alias é ignorado.
 */
export const mediaAliases: Record<string, string> = {
  "service-filming": "w1", // interior com terraço, o imóvel filmado com calma
  "why-1": "w5", // apresentação de empreendimento, especialistas no setor
  "why-4": "w6", // formação em palco, consistência e presença
};
