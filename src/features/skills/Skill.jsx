import { useMemo, useState } from "react";

const initialSkills = [
  {
    id: 1,
    name: "UI/UX Design",
    level: 3,
    maxXp: 100,
    accent: "from-navyblue via-normalblue to-lightpink",
    spawnAddPoints: 12,
    subSkills: [
      {
        id: "ui-grid",
        name: "Grid System",
        xp: 30,
        maxXp: 100,
        addPoints: 10,
        doneAt: 100,
      },
      {
        id: "ui-colors",
        name: "Color Logic",
        xp: 70,
        maxXp: 100,
        addPoints: 15,
        doneAt: 100,
      },
      {
        id: "ui-figma",
        name: "Figma Flow",
        xp: 90,
        maxXp: 100,
        addPoints: 10,
        doneAt: 100,
      },
    ],
  },
  {
    id: 2,
    name: "CLI Mastery",
    level: 2,
    maxXp: 100,
    accent: "from-darkblue via-normalblue to-hazyblue",
    spawnAddPoints: 10,
    subSkills: [
      {
        id: "cli-git",
        name: "Git Flow",
        xp: 45,
        maxXp: 100,
        addPoints: 12,
        doneAt: 100,
      },
      {
        id: "cli-pnpm",
        name: "PNPM Speed",
        xp: 20,
        maxXp: 100,
        addPoints: 8,
        doneAt: 100,
      },
      {
        id: "cli-scripts",
        name: "Scripts",
        xp: 80,
        maxXp: 100,
        addPoints: 20,
        doneAt: 100,
      },
    ],
  },
  {
    id: 3,
    name: "Drawing",
    level: 6,
    maxXp: 100,
    accent: "from-pinky via-lightpink to-screenblue",
    spawnAddPoints: 15,
    subSkills: [
      {
        id: "draw-lines",
        name: "Line Control",
        xp: 95,
        maxXp: 100,
        addPoints: 5,
        doneAt: 100,
      },
      {
        id: "draw-shade",
        name: "Shading",
        xp: 50,
        maxXp: 100,
        addPoints: 10,
        doneAt: 100,
      },
      {
        id: "draw-color",
        name: "Color Study",
        xp: 75,
        maxXp: 100,
        addPoints: 15,
        doneAt: 100,
      },
    ],
  },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const createNewSubSkill = (skill) => {
  const nextIndex = skill.subSkills.length + 1;

  return {
    id: `${skill.id}-custom-${nextIndex}`,
    name: `New Skill ${nextIndex}`,
    xp: 0,
    maxXp: 100,
    addPoints: skill.spawnAddPoints,
    doneAt: 100,
  };
};

export default function Skill() {
  const [skills, setSkills] = useState(initialSkills);
  const [collapsedGroups, setCollapsedGroups] = useState({});

  const groupStats = useMemo(
    () =>
      skills.map((skill) => {
        const xp = skill.subSkills.reduce((sum, subSkill) => sum + subSkill.xp, 0);
        const maxTotal = skill.subSkills.length * skill.maxXp;
        const percent = maxTotal === 0 ? 0 : Math.min(100, Math.round((xp / maxTotal) * 100));
        const displayLevel = skill.level + Math.floor(percent / 100);

        return {
          ...skill,
          xp,
          percent,
          displayLevel,
          maxTotal,
        };
      }),
    [skills]
  );

  const addXPToSubSkill = (bigSkillId, subSkillId) => {
    setSkills((prev) =>
      prev.map((skill) => {
        if (skill.id !== bigSkillId) return skill;

        return {
          ...skill,
          subSkills: skill.subSkills.map((subSkill) => {
            if (subSkill.id !== subSkillId) return subSkill;

            return {
              ...subSkill,
              xp: clamp(subSkill.xp + subSkill.addPoints, 0, subSkill.maxXp),
            };
          }),
        };
      })
    );
  };

  const toggleGroup = (bigSkillId) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [bigSkillId]: !prev[bigSkillId],
    }));
  };

  const addSubSkill = (bigSkillId) => {
    setSkills((prev) =>
      prev.map((skill) => {
        if (skill.id !== bigSkillId) return skill;

        return {
          ...skill,
          subSkills: [...skill.subSkills, createNewSubSkill(skill)],
        };
      })
    );
  };

  const restart = () => {
    setSkills(initialSkills);
    setCollapsedGroups({});
  };

  return (
    <div className="w-full h-full flex justify-center">
    <div className="w-4xl min-h-[calc(100vh-64px)] px-5 py-8 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        
        <div className="flex items-center justify-between gap-4 px-1">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Skill progress
          </h1>
          <button
            onClick={restart}
            className="rounded-full bg-darkblue px-4 py-2 text-sm font-semibold text-lightwhite transition hover:bg-navyblue"
          >
            Reset demo
          </button>
        </div>

        <div className="grid gap-5">
          {groupStats.map((skill) => {
            const isCollapsed = collapsedGroups[skill.id] ?? false;

            return (
            <section
              key={skill.id}
              className={`rounded-4xl border p-5 shadow-[0_18px_50px_rgba(73,89,119,0.12)] transition-colors duration-300 sm:p-6 ${
                isCollapsed
                  ? "border-darkblue/10 bg-lightwhite/60"
                  : "border-white/70 bg-lightwhite/72"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleGroup(skill.id)}
                className="flex w-full gap-5 text-left lg:flex-row lg:items-end lg:justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                      {skill.name}
                    </h2>
                    <span className="rounded-full bg-darkblue px-3 py-1 text-xs font-semibold text-lightwhite">
                      Lv {skill.displayLevel}
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="h-4 overflow-hidden rounded-full bg-white/75 ring-1 ring-white/70">
                      <div
                        className={`h-full rounded-full bg-linear-to-r ${skill.accent} transition-[width] duration-500 ease-out`}
                        style={{ width: `${skill.percent}%` }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-darkblue/55">
                      <p>
                        {skill.xp} / {skill.maxTotal} XP
                      </p>
                      <span>{isCollapsed ? "Click to show details" : "Click to hide details"}</span>
                    </div>
                  </div>
                </div>
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  isCollapsed
                    ? "mt-0 max-h-0 overflow-hidden opacity-0 translate-y-2 pointer-events-none"
                    : "mt-6 max-h-[2200px] opacity-100 translate-y-0"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  {skill.subSkills.map((subSkill) => (
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
                      addSubSkill(skill.id);
                    }}
                    className="rounded-full border border-dashed border-darkblue/20 bg-navyblue/10 px-3 py-1 text-xs font-semibold text-darkblue transition hover:bg-navyblue/20"
                  >
                    + {skill.spawnAddPoints}
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 xl:grid-cols-3">
                  {skill.subSkills.map((subSkill) => {
                    const percent = Math.min(
                      100,
                      Math.round((subSkill.xp / subSkill.maxXp) * 100)
                    );
                    const isDone = percent >= subSkill.doneAt;

                    return (
                      <div
                        key={subSkill.id}
                        className="rounded-[1.2rem] border border-white/80 bg-white/60 p-3.5 shadow-[0_10px_24px_rgba(73,89,119,0.08)]"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-darkblue">
                            {subSkill.name}
                          </p>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                              isDone
                                ? "bg-darkblue text-lightwhite"
                                : "bg-navyblue/15 text-darkblue"
                            }`}
                          >
                            {isDone ? "Done" : `${percent}%`}
                          </span>
                        </div>

                        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-hazyblue-soft/80">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${skill.accent} transition-[width] duration-500 ease-out`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-2">
                          <p className="text-[11px] text-darkblue/55">
                            {subSkill.xp} / {subSkill.maxXp}
                          </p>
                          <button
                            type="button"
                            disabled={isDone}
                            onClick={(event) => {
                              event.stopPropagation();
                              addXPToSubSkill(skill.id, subSkill.id);
                            }}
                            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                              isDone
                                ? "cursor-not-allowed bg-skin text-darkblue/55"
                                : "bg-darkblue text-lightwhite hover:bg-navyblue"
                            }`}
                          >
                            {isDone ? "Done" : `Add +${subSkill.addPoints}`}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}
