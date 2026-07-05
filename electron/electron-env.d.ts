/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import('electron').IpcRenderer
  api: {
    addTodo: (data: { todo: string }) => Promise<any>
    getTodo: () => Promise<any>
    deleteTodo: (id: number) => Promise<any>
    markDoneTodo: (state: boolean, id: number) => Promise<any>
    fetchSkill: () => Promise<any>
    fetchSubskill: () => Promise<any>
    addSkill: (payload: { name: string; addPoints: number }) => Promise<any>
    deleteSkill: (skillId: number) => Promise<any>
    addSubskill: (groupId: number, payload: { name: string; addPoints: number }) => Promise<any>
    deleteSubskill: (groupId: number, subSkillId: number) => Promise<any>
    addXPToSubskill: (groupId: number, subSkillId: number) => Promise<any>
    decreaseXPToSubskill: (groupId: number, subSkillId: number) => Promise<any>
  }
}
