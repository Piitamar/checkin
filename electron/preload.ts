import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})

contextBridge.exposeInMainWorld('api', {
  addTodo: (data: { todo: string }) => ipcRenderer.invoke('add-todo', data),
  getTodo: () => ipcRenderer.invoke('get-todo'),
  deleteTodo: (id: number) => ipcRenderer.invoke('delete-todo', id),
  markDoneTodo: (state: boolean, id: number) => ipcRenderer.invoke('markDone-todo', state, id),
  fetchSkill: () => ipcRenderer.invoke('get-skill'),
  fetchSubskill: () => ipcRenderer.invoke('get-subskill'),
  addSkill: (payload: { name: string; addPoints: number }) =>
    ipcRenderer.invoke('add-skill', payload),
  deleteSkill: (skillId: number) => ipcRenderer.invoke('delete-skill', skillId),
  addSubskill: (groupId: number, payload: { name: string; addPoints: number }) =>
    ipcRenderer.invoke('add-subskill', groupId, payload),
  deleteSubskill: (groupId: number, subSkillId: number) =>
    ipcRenderer.invoke('delete-subskill', groupId, subSkillId),
  addXPToSubskill: (groupId: number, subSkillId: number) =>
    ipcRenderer.invoke('add-xp-to-subskill', groupId, subSkillId),
  decreaseXPToSubskill: (groupId: number, subSkillId: number) =>
    ipcRenderer.invoke('decrease-xp-to-subskill', groupId, subSkillId),
  showNotification: (payload: { title: string; body: string }) =>
    ipcRenderer.invoke('show-notification', payload),
})
