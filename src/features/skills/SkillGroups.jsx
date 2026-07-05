import SubSkillCard from "./SubSkillCard.jsx";

export default function SkillGroups({ data, actions }) {
  const { skills, subSkill, collapsedGroups } = data;
  const { toggleGroup, openAddSubSkillModal, addXPToSubSkill, decreaseXPToSubSkill, deleteSkillGroup, deleteSubSkill } = actions;
  
  return (
    <div className="grid gap-5">
      {skills.map((group) => {
        const isCollapsed = collapsedGroups[group.id] ?? false;
        const currentSubSkills = subSkill.filter(sub => sub.skill_id === group.id);
        const percent = Math.min((group.exp / group.maxhp) * 100, 100);

        return (
          <section
            key={group.id}
            className={`relative rounded-4xl border p-5 shadow-[0_18px_50px_rgba(73,89,119,0.12)] transition-colors duration-300 sm:p-6 ${
              isCollapsed
                ? "border-darkblue/10 bg-lightwhite/60"
                : "border-white/70 bg-lightwhite/72"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleGroup(group.id)}
              className="w-full text-left pr-24 sm:pr-28"
            >
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {group.name}
              </h2>

              <div className="mt-5">
                <div className="h-4 overflow-hidden rounded-full bg-white/75 ring-1 ring-white/70">
                  <div
                    className={'h-full rounded-full bg-linear-to-r bg-soft transition-[width] duration-500 ease-out'}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-darkblue/55">
                  <p>
                    {group.exp} / {group.maxhp} XP
                  </p>
                  <span>
                    {isCollapsed ? "Click to show details" : "Click to hide details"}
                  </span>
                </div>
              </div>
            </button>

            <div className="absolute right-5 top-5 flex items-center gap-2 sm:right-6 sm:top-6">
              <span className="rounded-full bg-darkblue px-3 py-1 text-xs font-semibold text-lightwhite">
                Lv {group.level}
              </span>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  if (window.confirm(`Delete skill "${group.name}" and all of its subskills?`)) {
                    deleteSkillGroup(group.id);
                  }
                }}
                className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-darkblue transition hover:bg-rose-50"
              >
                delete
              </button>
            </div>

            <div
              className={`grid transition-all duration-300 ease-out ${
                isCollapsed
                  ? "mt-0 max-h-0 overflow-hidden opacity-0 translate-y-2 pointer-events-none"
                  : "mt-6 max-h-[2200px] opacity-100 translate-y-0"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2.5">
                {currentSubSkills.map((subSkill) => (
                  <span
                    key={subSkill.id}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-darkblue/70 ring-1 ring-darkblue/10"
                  >
                    {subSkill.name}
                  </span>
                ))}
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    openAddSubSkillModal(group.id);
                  }}
                  className="rounded-full border border-dashed border-darkblue/20 bg-navyblue/10 px-3 py-1 text-xs font-semibold text-darkblue transition hover:bg-navyblue/20"
                >
                  +
                </button>
              </div>
                  
              <div className="mt-5 grid grid-cols-2 gap-4 xl:grid-cols-3">
                {currentSubSkills.map((item) => {
                  return (
                  <SubSkillCard
                    key={item.id}
                    subSkill={item}
                    onAddXP={(subSkillId) => addXPToSubSkill(group.id, subSkillId)}
                    onDecreaseXP={(subSkillId) => decreaseXPToSubSkill(group.id, subSkillId)
                    }
                    onDelete={(subSkillId) => deleteSubSkill(group.id, subSkillId)}
                  />
                  )
                })}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
