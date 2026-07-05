

export default function useSkills() {
  
 async function fetchSkills() {
    const result = await window.api.fetchSkill()
    if (Array.isArray(result)) 
      return result

    console.error(result)
    return []
  }

  async function fetchSubskills() {
    const result = await window.api.fetchSubskill()
    if (Array.isArray(result)) 
      return result

    console.error(result)
    return []
  }

  async function addXPToSubskill(groupId, subSkillId) {
    const result = await window.api.addXPToSubskill(groupId, subSkillId)
    if (result?.success) {
      return result.data
    }

    console.error(result)
    return null
  }

  async function decreaseXPToSubskill(groupId, subSkillId) {
    const result = await window.api.decreaseXPToSubskill(groupId, subSkillId)
    if (result?.success) {
      return result.data
    }

    console.error(result)
    return null
  }

  async function addSkill(payload) {
    const result = await window.api.addSkill(payload)
    if (result?.success) {
      return result.data
    }

    console.error(result)
    return null
  }

  async function addSubskill(groupId, payload) {
    const result = await window.api.addSubskill(groupId, payload)
    if (result?.success) {
      return result.data
    }

    console.error(result)
    return null
  }

  async function deleteSubskill(groupId, subSkillId) {
    const result = await window.api.deleteSubskill(groupId, subSkillId)
    if (result?.success) {
      return result.data
    }

    console.error(result)
    return null
  }

  async function deleteSkill(skillId) {
    const result = await window.api.deleteSkill(skillId)
    if (result?.success) {
      return result.data
    }

    console.error(result)
    return null
  }

return { fetchSkills, fetchSubskills, addSkill, deleteSkill, addSubskill, deleteSubskill, addXPToSubskill, decreaseXPToSubskill }
}
