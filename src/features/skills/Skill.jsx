import { useMemo, useState } from "react";
import AddSubSkillModal from "./AddSubSkillModal.jsx";
import SkillGroups from "./SkillGroups.jsx";

const initialSkills = [
  {
    id: 1,
    name: "UI/UX Design",
    level: 1,
    maxXp: 1000,
    accent: "from-navyblue via-normalblue to-lightpink",
    subSkills: [
      {
        id: "ui-grid",
        name: "Grid System",
        xp: 0,
        maxXp: 100,
        addPoints: 10,
        doneAt: 100,
      },
      {
        id: "ui-colors",
        name: "Color Logic",
        xp: 0,
        maxXp: 100,
        addPoints: 15,
        doneAt: 100,
      },
      {
        id: "ui-figma",
        name: "Figma Flow",
        xp: 0,
        maxXp: 100,
        addPoints: 10,
        doneAt: 100,
      },
    ],
  },
  {
    id: 2,
    name: "CLI Mastery",
    level: 1,
    maxXp: 100,
    accent: "from-darkblue via-normalblue to-hazyblue",
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
    level: 1,
    maxXp: 100,
    accent: "from-pinky via-lightpink to-screenblue",
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

const createNewSubSkill = (skill, payload = {}) => {
  const nextIndex = skill.subSkills.length + 1;

  return {
    id: `${skill.id}-custom-${nextIndex}`,
    name: payload.name?.trim() || `New Skill ${nextIndex}`,
    xp: 0,
    maxXp: 100,
    addPoints: Math.max(1, Number(payload.addPoints) || 10),
    doneAt: 100,
  };
};

export default function Skill() {
  const [skills, setSkills] = useState(initialSkills);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(null);

  const groupStats = useMemo(
    () =>
      skills.map((skill) => {
        const xp = skill.subSkills.reduce((sum, subSkill) => sum + subSkill.xp, 0);
        const percent = skill.maxXp === 0 ? 0 : Math.min(100, Math.round((xp / skill.maxXp) * 100));
        const displayLevel = skill.level + Math.floor(percent / 100);

        return {
          ...skill,
          xp,
          percent,
          displayLevel,
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

  const openAddSubSkillModal = (bigSkillId) => {
    setActiveGroupId(bigSkillId);
    setIsAddModalOpen(true);
  };

  const closeAddSubSkillModal = () => {
    setIsAddModalOpen(false);
    setActiveGroupId(null);
  };

  const addSubSkill = (bigSkillId, payload = {}) => {
    setSkills((prev) =>
      prev.map((skill) => {
        if (skill.id !== bigSkillId) return skill;

        return {
          ...skill,
          subSkills: [...skill.subSkills, createNewSubSkill(skill, payload)],
        };
      })
    );
  };

  const confirmAddSubSkill = ({ name, addPoints }) => {
    if (activeGroupId == null) return;
    addSubSkill(activeGroupId, { name, addPoints });
    closeAddSubSkillModal();
  };

  const restart = () => {
    setSkills(initialSkills);
    setCollapsedGroups({});
    closeAddSubSkillModal();
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

          <SkillGroups
            data={{ groupStats, collapsedGroups }}
            actions={{ toggleGroup, openAddSubSkillModal, addXPToSubSkill }}
          />

          <AddSubSkillModal
            open={isAddModalOpen}
            onClose={closeAddSubSkillModal}
            onConfirm={confirmAddSubSkill}
            groupName={
              groupStats.find((group) => group.id === activeGroupId)?.name ?? ""
            }
          />
        </div>
      </div>
    </div>
  );
}
