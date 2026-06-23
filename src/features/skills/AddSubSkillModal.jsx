import { useEffect, useState } from "react";

export default function AddSubSkillModal({ open, onClose, onConfirm, groupName }) {
  const [name, setName] = useState("");
  const [addPoints, setAddPoints] = useState(10);

  useEffect(() => {
    if (!open) return;
    setName("");
    setAddPoints(10);
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    if (open) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const submit = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    onConfirm({
      name: trimmedName,
      addPoints: Math.max(1, Number(addPoints) || 1),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-darkblue/30 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-[1.5rem] border border-white/70 bg-lightwhite p-5 shadow-[0_24px_80px_rgba(73,89,119,0.22)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-darkblue/45">
              Add subskill
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {groupName}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-darkblue/70 ring-1 ring-darkblue/10"
          >
            Close
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-darkblue">
              Skill name
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Layout Review"
              className="w-full rounded-2xl border border-darkblue/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-darkblue/30"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-darkblue">
              XP mỗi lần click
            </span>
            <input
              type="number"
              min="1"
              value={addPoints}
              onChange={(event) => setAddPoints(event.target.value)}
              className="w-full rounded-2xl border border-darkblue/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-darkblue/30"
            />
          </label>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-darkblue/70 ring-1 ring-darkblue/10 transition hover:bg-hazyblue-soft/60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            className="rounded-full bg-darkblue px-5 py-2 text-sm font-semibold text-lightwhite transition hover:bg-navyblue"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
