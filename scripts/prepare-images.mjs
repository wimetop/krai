import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const source =
  "C:/Users/wimet/.codex/generated_images/01a090ee-b8e4-7ae3-a1d4-db9d8e49ae09";
const assets = {
  hero: "exec-e95e432f-d50a-40eb-bbf0-587fa1279b6d.png",
  observatory: "exec-f938d71c-602e-47da-8e55-0cd763f14eff.png",
  hut: "exec-f3030989-2312-4417-b39d-c4d56d8238f5.png",
  woodcut: "exec-ff35a546-cc4b-401a-a798-e8018a1a1f3d.png",
  meadow: "exec-cd9602a5-b11f-412d-a7b4-1ab00eaa3732.png",
  forest: "exec-2f64731d-7cb8-49a7-8f8e-b6735617b8dd.png",
  culture: "exec-c8912746-9cb0-46d3-8a36-1834ec10dd37.png",
};
await mkdir("public/images", { recursive: true });
for (const [name, file] of Object.entries(assets)) {
  const info = await sharp(path.join(source, file))
    .webp({ quality: 86 })
    .toFile(`public/images/${name}.webp`);
  console.log(
    `${name}: ${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB`,
  );
}
await writeFile(
  "public/images/provenance.json",
  JSON.stringify(
    {
      provider: "OpenAI built-in imagegen",
      date: "2026-09-11",
      purpose:
        "Original concept imagery inspired by the Ukrainian Carpathians; not documentary photographs.",
      assets,
    },
    null,
    2,
  ),
);
