"use client";

import { useEffect, useRef, useState } from "react";
import { useIsPresentationTool } from "next-sanity/hooks";
import { entranceOverlay } from "@/app/project/utils/entranceOverlayConstants";
import toast, { Toaster } from "react-hot-toast";

const toastBaseStyle = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(4px)",
  color: "#000",
  borderRadius: "0.5rem",
  boxShadow:
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  border: "1px solid #e5e5e5",
  cursor: "default",
};

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();
  const hasShownDraftToast = useRef(false);
  const [overlayDismissed, setOverlayDismissed] = useState(false);

  useEffect(() => {
    const check = () => {
      const hasEntered = sessionStorage.getItem(
        entranceOverlay.storage.hasEnteredKey
      );
      setOverlayDismissed(!!hasEntered);
    };
    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isPresentationTool || isPresentationTool === null) return;

    if (overlayDismissed) {
      toast(
        () => (
          <div className="flex items-center gap-4 text-xs leading-normal">
            <span>Entrance overlay</span>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem(
                  entranceOverlay.storage.hasEnteredKey
                );
                window.location.reload();
              }}
              className="bg-black text-white px-3 py-1.5 text-xs leading-normal rounded-sm whitespace-nowrap cursor-pointer"
            >
              Show
            </button>
          </div>
        ),
        { id: "entrance-overlay", duration: Infinity, style: toastBaseStyle }
      );
    } else {
      toast.dismiss("entrance-overlay");
    }

    if (!hasShownDraftToast.current) {
      hasShownDraftToast.current = true;
      toast(
        () => (
          <div className="flex items-center gap-4 text-xs leading-normal">
            <span>Sanity draft mode is enabled</span>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/api/draft-mode/disable";
              }}
              className="bg-black text-white px-3 py-1.5 text-xs leading-normal rounded-sm whitespace-nowrap cursor-pointer"
            >
              Disable
            </button>
          </div>
        ),
        { id: "draft-mode", duration: Infinity, style: toastBaseStyle }
      );
    }
  }, [isPresentationTool, overlayDismissed]);

  if (isPresentationTool || isPresentationTool === null) {
    return null;
  }

  return <Toaster position="bottom-right" />;
}
