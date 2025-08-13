import { dirname, join, relative, resolve } from "path";

export function flattenImportPath(
  relativeRoot: string,
  filePath: string,
  relImportPath: string,
): string {
  const importPath = join(dirname(filePath), relImportPath);

  const newFilePath = flattenPath(relativeRoot, filePath);
  const newFullImportPath = flattenPath(relativeRoot, importPath);

  // Determine the relative path between newFilePath and newFullImportPath
  const newImportPath = relative(dirname(newFilePath), newFullImportPath);

  return newImportPath.startsWith(".") ? newImportPath : "./" + newImportPath;
}

export function flattenPath(relativeRoot: string, oldPath: string) {
  const ignoreMove = [new RegExp(`^${relativeRoot}/index`)];

  if (ignoreMove.some((r) => r.test(oldPath))) return oldPath;
  return oldPath
    .replace(/([^/]+)\/index\.(.+)$/, "$1.$2")
    .replace(/([^/]+)\/index$/, "$1");
}
