import { lazy } from "react";

/*
  Automatically find every:
  src/component/ComponentName/ComponentName.jsx
*/

const componentFiles = import.meta.glob(
  "./component/*/*.jsx"
);

const componentRegistry = Object.entries(componentFiles)
  .map(([filePath, loader]) => {
    const parts = filePath.split("/");

    // ./component/ScanPulse/ScanPulse.jsx
    const folderName = parts[2];

    return {
      name: folderName,
      path: `/${folderName.toLowerCase()}`,
      Component: lazy(loader),
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export default componentRegistry;