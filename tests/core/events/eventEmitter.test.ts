import { describe, it, expect, vi } from "vitest";
import { EventEmitter } from "@/core";

describe("EventEmitter", () => {
  it("should emit event to listener", () => {
    const emitter = new EventEmitter<{ test: string }>();
    const mock = vi.fn();

    emitter.on("test", mock);
    emitter.emit("test", "hello");

    expect(mock).toHaveBeenCalledWith("hello");
  });

  it("should support multiple listeners", () => {
    const emitter = new EventEmitter<{ test: string }>();
    const mock1 = vi.fn();
    const mock2 = vi.fn();

    emitter.on("test", mock1);
    emitter.on("test", mock2);

    emitter.emit("test", "hello");

    expect(mock1).toHaveBeenCalled();
    expect(mock2).toHaveBeenCalled();
  });

  it("should remove listener with off()", () => {
    const emitter = new EventEmitter<{ test: string }>();
    const mock = vi.fn();

    emitter.on("test", mock);
    emitter.off("test", mock);

    emitter.emit("test", "hello");

    expect(mock).not.toHaveBeenCalled();
  });
});
