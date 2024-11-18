import { buildExtension } from "./build.ts";
import type { BuildConfig } from "./types.ts";
let rebuildTimeout: number | undefined;

export async function watchFiles(watchPaths: string[], config?: BuildConfig) {
  const watcher = Deno.watchFs(watchPaths);

  console.log("Watching for changes...");

  for await (const event of watcher) {
    if (event.kind === "modify") {
      console.log("Changes detected:", event.paths);

      clearTimeout(rebuildTimeout);

      rebuildTimeout = setTimeout(async () => {
        console.log("Rebuilding...");

        await buildExtension(config);
        await triggerExtensionReload(event.paths);
      }, 100);
    }
  }
}

async function triggerExtensionReload(paths: string[]) {
  const reloadSignalFile = "./dist/reload-signal.js";
  const changedPaths = paths.join(",");

  console.log("Triggering extension reload with paths:", changedPaths);

  await Deno.writeTextFile(
    reloadSignalFile,
    `// ${Date.now()} [${changedPaths}]`,
  );
}
