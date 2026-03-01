"use client";

import { useTransition } from "react";
import { useIsPresentationTool } from "next-sanity/hooks";

export function DisableDraftMode() {
  const [pending, startTransition] = useTransition();
  const isPresentationTool = useIsPresentationTool();

  if (isPresentationTool || isPresentationTool === null) {
    return null;
  }

  const disable = () =>
    startTransition(() => {
      window.location.href = "/api/draft-mode/disable";
    });

  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-4 px-4 py-3 bg-white/95 text-black text-xs leading-normal rounded-lg shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-200 backdrop-blur-sm hover:bg-white z-[9999]">
      <span>
        {pending ? "Disabling draft mode..." : "Sanity draft mode is enabled"}
      </span>
      <button
        type="button"
        onClick={disable}
        className="bg-black text-white px-3 py-1.5 text-xs leading-normal rounded-sm"
      >
        Disable
      </button>
    </div>
  );
}
