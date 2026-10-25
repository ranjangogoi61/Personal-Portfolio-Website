import { useEffect, useState } from "react";

export function useLowPowerDevice(): boolean {
  const [low, setLow] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isCoarsePointer = window.matchMedia?.(
      "(hover: none) and (pointer: coarse)",
    ).matches;
    const narrow = window.innerWidth < 768;
    const cores =
      typeof navigator !== "undefined" && "hardwareConcurrency" in navigator
        ? (navigator.hardwareConcurrency as number)
        : 8;
    const memory =
      typeof navigator !== "undefined" && "deviceMemory" in navigator
        ? (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8
        : 8;
    const saveData =
      typeof navigator !== "undefined" && "connection" in navigator
        ? (navigator as unknown as { connection?: { saveData?: boolean } })
            .connection?.saveData === true
        : false;

    const isLow =
      isCoarsePointer || narrow || cores <= 4 || memory <= 4 || saveData;
    setLow(isLow);
  }, []);

  return low;
}
