# Enriched Studios

Site da Enriched Studios, produtora de vídeo, edição e marca pessoal para o setor imobiliário.
Next.js 14 (App Router), Tailwind CSS v4, bilingue PT/EN com SEO por idioma.

## Arrancar

```bash
npm install
npm run dev
```

Abrir http://localhost:3000. A raiz reencaminha para `/pt` ou `/en` conforme o idioma do browser.

## Estrutura

```
app/[locale]/            páginas (home, services, portfolio, contact)
app/api/contact/         endpoint do formulário de contacto
components/              componentes de UI
components/sections/     secções da página (serviços, processo, trabalhos, FAQ, CTA…)
content/site.ts          dados da empresa (email, telefone, redes, métricas)
content/dictionaries/    todo o texto do site: pt.ts e en.ts
lib/i18n.ts              idiomas e slugs traduzidos
lib/seo.tsx              metadata, hreflang e dados estruturados
middleware.ts            deteção de idioma e slugs traduzidos
```

### Onde editar o conteúdo

Praticamente todo o texto vive em `content/dictionaries/pt.ts` (português) e
`content/dictionaries/en.ts` (inglês). Os dois ficheiros têm exatamente a mesma
estrutura, por isso o TypeScript avisa se faltar alguma chave na versão inglesa.

Dados da empresa (email, telemóvel, Instagram, zonas, métricas) estão em `content/site.ts`.

## Idiomas e URLs

| Página    | Português          | English            |
|-----------|--------------------|--------------------|
| Início    | `/pt`              | `/en`              |
| Serviços  | `/pt/servicos`     | `/en/services`     |
| Trabalhos | `/pt/portfolio`    | `/en/portfolio`    |
| Contactos | `/pt/contactos`    | `/en/contact`      |
| Privacidade | `/pt/politica-de-privacidade` | `/en/privacy-policy` |
| Termos | `/pt/termos-e-condicoes` | `/en/terms-and-conditions` |
| Cookies | `/pt/politica-de-cookies` | `/en/cookie-policy` |

Cada página declara `canonical` e `hreflang` (pt-PT, en, x-default). O `sitemap.xml`
e o `robots.txt` são gerados automaticamente, tal como a imagem de partilha
(Open Graph) por idioma.

## Interações

Camada de interação em `components/ui/`, toda protegida por `(pointer: fine)` e
`prefers-reduced-motion`, ou seja, desliga-se sozinha em telemóvel e para quem
pede menos movimento:

- `cursor.tsx`: cursor personalizado que vira bolha com legenda sobre vídeos e carrosséis.
- `drag-carousel.tsx`: carrossel arrastável (Embla) com setas, teclado, barra de progresso e contador.
- `counter.tsx`: números que contam ao entrar no ecrã. Renderiza sempre o valor final no servidor,
  por isso nunca fica preso em zero se o `requestAnimationFrame` estiver travado.
- `magnetic.tsx`, `spotlight-card.tsx`, `hover-preview.tsx`: botões que seguem o rato,
  brilho que acompanha o ponteiro nos cartões e miniatura que segue o cursor nos serviços.
- `components/kinetic-strip.tsx`: faixa tipográfica que acelera com o scroll e pode ser arrastada.

## Formulário de contacto

`POST /api/contact` valida os campos e envia por email através do
[Resend](https://resend.com) quando `RESEND_API_KEY` estiver definida (ver `.env.example`).
Sem chave, o pedido é aceite e registado sem conteúdo, útil em desenvolvimento.

Protecções: campo escondido para robôs, limite de 5 pedidos por IP em cada 10 minutos,
teto de 12KB no corpo do pedido e limites por campo. O limite por IP vive em memória,
por isso em ambientes com várias instâncias serve para travar robôs simples, não substitui
um WAF à frente do site.

## Documentos legais

Os três documentos vivem em `content/legal/pt.ts` e `en.ts`, com a mesma estrutura
imposta por `content/legal/types.ts`. Os dados da empresa que eles usam (denominação,
NIPC, sede, registo, entidade de resolução de litígios) estão em `content/site.ts`,
no bloco `legal`.

Foram escritos com base no RGPD, no Decreto-Lei 7/2004 (comércio eletrónico),
no Decreto-Lei 24/2014 (contratos à distância), no Decreto-Lei 156/2005 (livro de
reclamações) e na Lei 144/2015 (resolução alternativa de litígios). **Não substituem
a revisão de um advogado antes de o site ir para o ar.**

## Por fazer (conteúdo real)

Estes pontos estão marcados no código com `PLACEHOLDER` ou `TODO (cliente)`:

1. **`content/site.ts`**: email, ano de fundação e as métricas (`+300 vídeos`,
   `+40 consultores`, `+2,5M visualizações`). No bloco `legal`, obrigatoriamente:
   denominação social completa, NIPC, sede e conservatória do registo.
2. **Vídeos**: largar os ficheiros em `public/work/` com os nomes indicados no
   `public/work/README.md`. O site lê a pasta no servidor (`lib/media-fs.ts`) e liga
   sozinho, sem alterações de código.
3. **Testemunhos**: `testimonials.items` nos dicionários tem textos genéricos à espera
   dos testemunhos reais e autorizados dos clientes.
4. **Logótipo em vetor**: os ficheiros de marca (`public/logo.png`, `public/logo-mark.png`,
   `app/icon.png`, `app/apple-icon.png`) foram extraídos do PNG oficial. Se existir versão
   em SVG, substituir para ficar nítido em qualquer tamanho.

## Deploy

Pensado para a Vercel: `npm run build` e definir as variáveis de `.env.example`
nas definições do projeto.
