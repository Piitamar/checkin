import { useState } from "react";
import CreateSkillModal from "./CreateSkillModal.jsx";
import AddSubSkillModal from "./AddSubSkillModal.jsx";
import SkillGroups from "./SkillGroups.jsx";
import useSkill from "./useSkill.jsx";
import useSubskill from "./useSubskill.jsx";
import useSkills from "./useSkills.jsx";

export default function Skill() {
  const { skills, setSkills } = useSkill();
  const { subSkill, setSubskill } = useSubskill();
  const { addSkill, deleteSkill, addSubskill, deleteSubskill, addXPToSubskill, decreaseXPToSubskill } = useSkills();
  
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [isCreateSkillModalOpen, setIsCreateSkillModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(null);

  const addXPToSubSkill = async (groupId, subSkillId) => {
    //thêm xp vào db
    const data = await addXPToSubskill(groupId, subSkillId);
    if (!data) return;

    //update state
    setSubskill((prev) =>
      prev.map((item) => (item.id === data.subSkill.id ? data.subSkill : item))
    );

    setSkills((prev) =>
      prev.map((item) => (item.id === data.skill.id ? data.skill : item))
    );
  };

  const decreaseXPToSubSkill = async (groupId, subSkillId) => {
    const data = await decreaseXPToSubskill(groupId, subSkillId);
    if (!data) return;

    setSubskill((prev) =>
      prev.map((item) => (item.id === data.subSkill.id ? data.subSkill : item))
    );

    setSkills((prev) =>
      prev.map((item) => (item.id === data.skill.id ? data.skill : item))
    );
  };
    
  const toggleGroup = (bigSkillId) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [bigSkillId]: !prev[bigSkillId],
    }));
  };

  const addSubSkill = async (groupId, payload) => {
    const newSubSkill = await addSubskill(groupId, payload);
    if (!newSubSkill) return false;

    setSubskill((prev) => [...prev, newSubSkill]);
    return true;
  };

  const deleteSubSkill = async (groupId, subSkillId) => {
    const deleted = await deleteSubskill(groupId, subSkillId);
    if (!deleted) return false;

    setSubskill((prev) => prev.filter((item) => item.id !== deleted.subSkill.id));

    setSkills((prev) =>
      prev.map((item) => (item.id === deleted.skill.id ? deleted.skill : item))
    );

    return true;
  };

  const createNewSkill = async (payload) => {
    const newSkill = await addSkill(payload);
    if (!newSkill) return false;

    setSkills((prev) => [...prev, newSkill]);
    return true;
  };

  const deleteSkillGroup = async (skillId) => {
    const deleted = await deleteSkill(skillId);
    if (!deleted) return false;

    setSkills((prev) => prev.filter((item) => item.id !== deleted.skill.id));
    setSubskill((prev) => prev.filter((item) => item.skill_id !== deleted.skill.id));

    if (activeGroupId === deleted.skill.id) {
      closeAddSubSkillModal();
    }

    return true;
  };

  const openAddSubSkillModal = (bigSkillId) => {
    setActiveGroupId(bigSkillId);
    setIsAddModalOpen(true);
  };

  const openCreateSkillModal = () => {
    setIsCreateSkillModalOpen(true);
  };

  const closeAddSubSkillModal = () => {
    setIsAddModalOpen(false);
    setActiveGroupId(null);
  };

  const closeCreateSkillModal = () => {
    setIsCreateSkillModalOpen(false);
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
              onClick={openCreateSkillModal}
              className="rounded-full bg-darkblue px-4 py-2 text-sm font-semibold text-lightwhite transition hover:bg-navyblue"
            >
              Create new skill
            </button>
          </div>

          <SkillGroups
            data={{ skills, subSkill, collapsedGroups }}
            actions={{
              toggleGroup,
              openAddSubSkillModal,
              addXPToSubSkill,
              decreaseXPToSubSkill,
              deleteSkillGroup,
              deleteSubSkill,
            }}
          />

          <AddSubSkillModal
            open={isAddModalOpen}
            onClose={closeAddSubSkillModal}
            onConfirm={async (payload) => {
              if (activeGroupId == null) return;
              const created = await addSubSkill(activeGroupId, payload);
              if (created) {
                closeAddSubSkillModal();
              }
            }}
            groupName={
              skills.find((group) => group.id === activeGroupId)?.name ?? ""
            }
          />

          <CreateSkillModal
            open={isCreateSkillModalOpen}
            onClose={closeCreateSkillModal}
            onConfirm={async (payload) => {
              const created = await createNewSkill(payload);
              if (created) {
                closeCreateSkillModal();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
