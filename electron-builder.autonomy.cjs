const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { parse } = require("yaml");

const base = parse(readFileSync(join(__dirname, "electron-builder.yml"), "utf8"));
delete base.protocols;
delete base.publish;

module.exports = {
  ...base,
  appId: "com.openmausbot.autonomy",
  productName: "OpenMausBot Autonomy",
  artifactName: "OpenMausBot-Autonomy-${version}-${arch}.${ext}",
  extraMetadata: { openmausbotForkBuild: true, productName: "OpenMausBot Autonomy", desktopName: "com.openmausbot.autonomy.desktop" },
  dmg: { ...base.dmg, artifactName: "OpenMausBot-Autonomy-${version}-${arch}.dmg" },
  nsis: { ...base.nsis, shortcutName: "OpenMausBot Autonomy", artifactName: "OpenMausBot-Autonomy-${version}-setup.${ext}" },
  linux: { ...base.linux, executableName: "openmausbot-autonomy", desktop: { ...base.linux.desktop, entry: { ...base.linux.desktop.entry, Name: "OpenMausBot Autonomy" } } },
};
