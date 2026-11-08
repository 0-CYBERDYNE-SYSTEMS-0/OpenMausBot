import { readFileSync } from "node:fs";
import { join } from "node:path";

export function forkBuildMarker(app) {
  try {
    return JSON.parse(readFileSync(join(app.getAppPath(), "package.json"), "utf8")).openmausbotForkBuild === true;
  } catch {
    return null;
  }
}

export function isAutonomyBuild(app) {
  const marker = forkBuildMarker(app);
  if (marker === null && app.isPackaged) throw new Error("Cannot read packaged application metadata");
  return marker === true;
}

export function desktopDataDir({ home, dataDir, autonomy }) {
  return dataDir || join(home, autonomy ? ".openmausbot-autonomy" : ".openmausbot");
}
