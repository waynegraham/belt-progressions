import type { BeltMove } from "@/lib/belt-data";

interface VideoModalProps {
  activeMove: BeltMove | null;
  activeEmbedUrl: string | null;
  onClose: () => void;
  dialogRef: React.RefObject<HTMLDivElement | null>;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export default function VideoModal({
  activeMove,
  activeEmbedUrl,
  onClose,
  dialogRef,
  closeButtonRef,
}: VideoModalProps) {
  if (!activeMove) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 p-0 md:p-6" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${activeMove.name} video`}
        onClick={(event) => event.stopPropagation()}
        className="mx-auto flex h-full w-full flex-col bg-black md:h-auto md:max-w-5xl md:rounded-xl"
      >
        <div className="flex items-center justify-between px-4 py-3 text-white">
          <p className="truncate pr-4 text-sm font-semibold md:text-base">{activeMove.name}</p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded border border-white/40 px-3 py-1 text-sm hover:bg-white/10"
          >
            Close
          </button>
        </div>
        <div className="flex-1">
          {activeEmbedUrl ? (
            <iframe
              src={activeEmbedUrl}
              title={activeMove.name}
              className="h-full w-full md:aspect-video md:h-auto"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-white md:min-h-[360px]">
              <div>
                <p>Unable to embed this video.</p>
                <a href={activeMove.youtubeUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  Open on YouTube
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
