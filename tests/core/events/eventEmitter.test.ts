import { describe, it, expect, vi } from "vitest";
import { EventEmitter } from "@/core";

describe("EventEmitter", () => {
  it("should remove listener with off()", () => {
    const emitter = new EventEmitter<{ test: string }>();

    const mock = vi.fn();

    emitter.on("test", mock);
    emitter.off("test", mock);

    emitter.emit("test", "hello");

    expect(mock).not.toHaveBeenCalled();
  });
});
