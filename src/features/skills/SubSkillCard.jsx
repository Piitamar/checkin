export default function SubSkillCard({ subSkill, onAddXP, onDecreaseXP, onDelete }) {
  const percent = Math.min(100, Math.round((subSkill.xp / subSkill.max_xp) * 100));
  const isDone = percent >= 100;

  return (
    <div className="rounded-[1.2rem] border border-white/80 bg-white/60 p-3.5 shadow-[0_10px_24px_rgba(73,89,119,0.08)]">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-darkblue">{subSkill.name}</p>

        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
            isDone ? "bg-darkblue text-lightwhite" : "bg-navyblue/15 text-darkblue"
          }`}
        >
          {isDone ? "Done" : `${percent}%`}
        </span>
      </div>

      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-hazyblue-soft/80">
        <div
          className="h-full rounded-full bg-linear-to-r bg-soft transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <p className="text-[11px] text-darkblue/55">
          {subSkill.xp} / {subSkill.max_xp} XP
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              if (window.confirm(`Delete subskill "${subSkill.name}"?`)) {
                onDelete(subSkill.id);
              }
            }}
            className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold transition hover:bg-rose-50"
          >
            delete
          </button>
          <button
            type="button"
            disabled={subSkill.xp <= 0}
            onClick={(event) => {
              event.stopPropagation();
              onDecreaseXP(subSkill.id);
            }}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
              subSkill.xp <= 0
                ? "cursor-not-allowed bg-skin text-darkblue/55"
                : "bg-white text-darkblue ring-1 ring-darkblue/15 hover:bg-darkblue hover:text-lightwhite"
            }`}
          >
            undo
          </button>
          <button
            type="button"
            disabled={isDone}
            onClick={(event) => {
              event.stopPropagation();
              onAddXP(subSkill.id);
            }}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
              isDone
                ? "cursor-not-allowed bg-skin text-darkblue/55"
                : "bg-darkblue text-lightwhite hover:bg-navyblue"
            }`}
          >
            {isDone ? "Done" : `Add +${subSkill.add_points}`}
          </button>
        </div>
      </div>
    </div>
  );
}
