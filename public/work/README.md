# Vídeos e imagens do site

Largue aqui os ficheiros. O site lê esta pasta e liga sozinho: **não é preciso mexer
em código**. O nome do ficheiro é que manda.

## Carrossel do topo

As imagens do topo vivem noutra pasta: `public/hero/`. Cada ficheiro é um cartão do
carrossel e o nome define a ordem, por isso convém começar por `01-`, `02-` e assim
adiante. A etiqueta de cada um está em `content/hero-slides.ts`.

## Nomes que o site procura

| Ficheiro | Onde aparece |
|---|---|
| `service-filming.mp4` | serviço Gravação, na linha de tempo e na página de serviços |
| `service-editing.mp4` | serviço Edição |
| `service-branding.mp4` | serviço Marca pessoal |
| `why-1.mp4` a `why-4.mp4` | os quatro argumentos da secção "Porquê a Enriched" |
| `w1.mp4` a `w9.mp4` | os nove trabalhos do portfólio, pela ordem dos dicionários |

Formatos aceites: `.mp4`, `.webm`, `.mov` para vídeo, `.jpg`, `.png`, `.webp`, `.avif`
para imagem.

## Miniaturas

Opcionais. Se puser `w1.jpg` ao lado de `w1.mp4`, essa imagem é usada como capa.
Se não puser, o browser mostra o primeiro fotograma do vídeo.

## Um ficheiro em vários sítios

Alguns lugares são servidos por ficheiros do portfólio, para não duplicar vídeo em disco.
Essa correspondência está em `content/media-aliases.ts`. Hoje:

- `hero-reel` usa `w3`
- `service-filming` usa `w1`
- `why-1` usa `w5`, `why-4` usa `w6`

Se largar aqui um ficheiro com o nome do lugar, por exemplo `hero-reel.mp4`, esse ganha
e o alias deixa de contar.

## Enquanto não houver ficheiros

O lugar mostra o cartão desenhado com a marca, portanto pode ir enchendo aos poucos
sem nunca partir a página.

## Conselhos de exportação

- Vertical: 1080x1920. Horizontal: 1920x1080.
- H.264, entre 4 e 8 Mbps, som mono ou sem som. O site reproduz sempre sem som.
- Até 15 segundos por peça no topo e nas secções, para o site continuar leve.
  Os trabalhos do portfólio podem ser mais longos.
- Se tiver os ficheiros originais da montagem, use esses. Os que estão no Instagram
  já foram recomprimidos e perdem qualidade.

## Logótipos de parceiros

Ficam noutra pasta: `public/partners/`. O site lê-a sozinho e mostra os logótipos
a branco, com a cor original a aparecer ao passar o rato.

Para acrescentar um parceiro: largar o ficheiro lá (PNG com fundo transparente ou SVG)
e escrever o nome da marca em `content/partners.ts`, para o texto alternativo ficar correto.
