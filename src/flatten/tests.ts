import { describe, it, expect } from "vitest";
import { flattenImportPath, flattenPath } from "./index.ts";

describe("flattenPath", () => {
  describe("moves files", () => {
    it("moves files", () => {
      expect(flattenPath("lib", "lib/addDays/index.js")).toBe("lib/addDays.js");
      expect(flattenPath("lib", "lib/fp/addDays/index.js")).toBe(
        "lib/fp/addDays.js",
      );
      expect(flattenPath("lib", "lib/locale/en-US/index.js")).toBe(
        "lib/locale/en-US.js",
      );
      expect(flattenPath("lib", "lib/transpose/index.js")).toBe(
        "lib/transpose.js",
      );
      expect(flattenPath("lib", "lib/fp/index.js")).toBe("lib/fp.js");
      expect(flattenPath("lib", "lib/locale/index.js")).toBe("lib/locale.js");
    });
  });

  it("ignores the root index file", () => {
    expect(flattenPath("lib", "lib/index.js")).toBe("lib/index.js");
  });

  it("ignores non-index files", () => {
    expect(flattenPath("lib", "lib/parse/_lib/Setter.js")).toBe(
      "lib/parse/_lib/Setter.js",
    );
  });

  it("handles non-normalized paths", () => {
    expect(flattenPath("lib", "./setWeek/index")).toBe("./setWeek");
    expect(flattenPath("lib", "./add/index.d.js")).toBe("./add.d.js");
  });
});

describe("flattenImportPath", () => {
  it("flattens import path", () => {
    expect(
      flattenImportPath("lib", "lib/addDays/index.js", "./_lib/utils.js"),
    ).toBe("./addDays/_lib/utils.js");
    expect(flattenImportPath("lib", "lib/index.js", "./add/index.js")).toBe(
      "./add.js",
    );
    expect(
      flattenImportPath("lib", "lib/index.js", "./locale/en-US/index.js"),
    ).toBe("./locale/en-US.js");
    expect(
      flattenImportPath("lib", "lib/locale/en-US/index.js", "../_lib/utils.js"),
    ).toBe("./_lib/utils.js");
    expect(
      flattenImportPath(
        "",
        "lib/parse/_lib/Setter.js",
        "../../transpose/index.js",
      ),
    ).toBe("../../transpose.js");
    expect(flattenImportPath("lib", "lib/add/index.d.js", "../types.js")).toBe(
      "./types.js",
    );
    expect(
      flattenImportPath(
        "",
        "lib/formatDistanceStrict/index.js",
        "../constants/index.js",
      ),
    ).toBe("./constants.js");
  });
});
