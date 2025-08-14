export interface BuildMap {
  srcToDist: BuildMapSrcToDist;
}

export type BuildMapSrcToDist = (src: string) => string;
