import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { desktopDataDir, isAutonomyBuild } from "./autonomy-build.mjs";

test("only a packaged fork marker selects the autonomy identity", () => {
  const dir = mkdtempSync(join(tmpdir(), "omb-fork-marker-"));
  const app = { getAppPath: () => dir };
  try {
    assert.equal(isAutonomyBuild(app), false);
    assert.throws(() => isAutonomyBuild({ ...app, isPackaged: true }), /Cannot read packaged application metadata/);
    writeFileSync(join(dir, "package.json"), JSON.stringify({ openmausbotForkBuild: true }));
    assert.equal(isAutonomyBuild(app), true);
    writeFileSync(join(dir, "package.json"), JSON.stringify({ openmausbotForkBuild: "true" }));
    assert.equal(isAutonomyBuild(app), false);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("fork defaults to separate data, while explicit data directories win", () => {
  assert.equal(desktopDataDir({ home: "/home/test", autonomy: true }), "/home/test/.openmausbot-autonomy");
  assert.equal(desktopDataDir({ home: "/home/test", autonomy: false }), "/home/test/.openmausbot");
  assert.equal(desktopDataDir({ home: "/home/test", autonomy: true, dataDir: "/isolated" }), "/isolated");
  assert.equal(desktopDataDir({ home: "/home/test", autonomy: true, dataDir: "" }), "/home/test/.openmausbot-autonomy");
});

test("fork builder configuration excludes official updates and protocol registration", async () => {
  const { createRequire } = await import("node:module");
  const { dirname } = await import("node:path");
  const require = createRequire(import.meta.url);
  const configModule = require.resolve("app-builder-lib/out/util/config/config", { paths: [dirname(require.resolve("electron-builder"))] });
  const { getConfig } = require(configModule);
  const config = await getConfig(process.cwd(), "electron-builder.autonomy.cjs");
  assert.equal(config.appId, "com.openmausbot.autonomy");
  assert.equal(config.extraMetadata.openmausbotForkBuild, true);
  assert.equal(config.extraMetadata.productName, "OpenMausBot Autonomy");
  assert.equal(config.publish, undefined);
  assert.equal(config.protocols, undefined);
});
