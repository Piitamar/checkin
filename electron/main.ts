import { app, BrowserWindow, ipcMain, Notification } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import pg from 'pg'

const { Pool } = pg
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TEST',
  password: '010902',
  port: 5432,
})

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

//Cổng post todo
ipcMain.handle('add-todo', async (_event, todoData) => {
  const todo  = todoData
  //Chặn null value
  if (!todo || todo.trim() == '') {
     return {success: false, error: 'Please insert your note'}
  }
  //Lưu vào db
  try {
    const res = await pool.query(
      'INSERT INTO checkin (todo) VALUES ($1) RETURNING *',
      [todo],
    )
    return { success: true, data: res.rows[0] }
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message }
  }
})

//Cổng get
ipcMain.handle('get-todo', async () => {
  try {
    const res = await pool.query(
      'SELECT * FROM checkin ORDER BY created_at DESC'
    )
    return res.rows 
  } catch (err: unknown) {
    return {success: false, error: (err as Error).message}
  }
})

//Cổng xóa
ipcMain.handle('delete-todo', async (_event, id) => {
  try {
    const res = await pool.query(
      'DELETE FROM checkin WHERE id = $1 RETURNING *',
      [id]
    )
    return { success: true, data: res.rows[0] }
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message }
  }
})

//Cổng markdone 
ipcMain.handle('markDone-todo', async (_event, state, id) => {
  try {
    const res = await pool.query(
      'UPDATE checkin SET markdone = $1 WHERE id = $2 RETURNING *', [state, id]
    )
    return { success: true, data: res.rows[0] }
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message }
  }
})

//Cổng fetch skill
ipcMain.handle('get-skill', async () => {
  try {
    const res = await pool.query(
      'SELECT * FROM skill ORDER BY id ASC'
    )
    return res.rows
  } catch (err:unknown) {
    return {success: false, error: (err as Error).message}
  }
})

//Cổng fetch subskill
//Cổng thêm skill mới
ipcMain.handle('add-skill', async (_event, payload) => {
  try {
    const name = typeof payload?.name === 'string' ? payload.name.trim() : ''
    const addPoints = Math.max(1, Number(payload?.addPoints) || 1)

    if (!name) {
      return { success: false, error: 'Skill name is required' }
    }

    const {
      rows: [newSkill],
    } = await pool.query(
      `INSERT INTO skill (name, level, exp, maxhp, xpperclick)
       VALUES ($1, 1, 0, 1000, $2)
       RETURNING *`,
      [name, addPoints],
    )

    return { success: true, data: newSkill }
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message }
  }
})

ipcMain.handle('delete-skill', async (_event, skillId) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const {
      rows: [skill],
    } = await client.query('SELECT * FROM skill WHERE id = $1', [skillId])

    if (!skill) {
      await client.query('ROLLBACK')
      return { success: false, error: 'Skill not found' }
    }

    const { rows: deletedSubSkills } = await client.query(
      'DELETE FROM subskill WHERE skill_id = $1 RETURNING *',
      [skillId],
    )

    const {
      rows: [deletedSkill],
    } = await client.query('DELETE FROM skill WHERE id = $1 RETURNING *', [skillId])

    await client.query('COMMIT')

    return {
      success: true,
      data: {
        skill: deletedSkill,
        subSkills: deletedSubSkills,
      },
    }
  } catch (err: unknown) {
    await client.query('ROLLBACK')
    return { success: false, error: (err as Error).message }
  } finally {
    client.release()
  }
})

ipcMain.handle('get-subskill', async () => {
  try {
    const res = await pool.query(
      'SELECT * FROM subskill'
    )
    return res.rows
  } catch (err: unknown) {
    return {success: false, error: (err as Error).message}
  }
})

//Cổng thêm subskill
ipcMain.handle('add-subskill', async (_, groupId, payload) => {
  try {
    if (!payload.name) {
      return { success: false, error: 'Subskill name is required' }
    }

    const {
      rows: [newSubSkill],
    } = await pool.query(
      `INSERT INTO subskill (skill_id, name, xp, max_xp, add_points)
       VALUES ($1, $2, 0, 1000, $3)
       RETURNING *`,
      [groupId, payload.name, payload.addPoints],
    )

    return {
      success: true,
      data: newSubSkill,
    }
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message }
  }
})

//Cổng xóa subskill
ipcMain.handle('delete-subskill', async (_, groupId, subSkillId) => {
  try {
    const {
      rows: [subSkill],
    } = await pool.query(
      'SELECT * FROM subskill WHERE id = $1 AND skill_id = $2',
      [subSkillId, groupId],
    )

    if (!subSkill) {
      return { success: false, error: 'Subskill not found' }
    }

    const {
      rows: [deletedSubSkill],
    } = await pool.query(
      'DELETE FROM subskill WHERE id = $1 RETURNING *',
      [subSkillId],
    )

    const {
      rows: [updatedSkill],
    } = await pool.query(
      `UPDATE skill
       SET exp = GREATEST(0, exp - $1)
       WHERE id = $2
       RETURNING *`,
      [subSkill.xp, groupId],
    )

    return {
      success: true,
      data: {
        skill: updatedSkill,
        subSkill: deletedSubSkill,
      },
    }
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message }
  }
})

//cổng tang XP cho subskill và skill group
ipcMain.handle('add-xp-to-subskill', async (_,groupId, subSkillId) => {
  try {
    const {
      rows: [subSkill],
    } = await pool.query(
      'SELECT * FROM subskill WHERE id = $1 AND skill_id = $2',
      [subSkillId, groupId],
    )

    if (!subSkill) {
      return { success: false, error: 'Subskill not found' }
    }

    const gainedXp = Math.min(
      subSkill.add_points,
      subSkill.max_xp - subSkill.xp,
    )

    const {
      rows: [updatedSubSkill],
    } = await pool.query(
      'UPDATE subskill SET xp = $1 WHERE id = $2 RETURNING *',
      [subSkill.xp + gainedXp, subSkillId],
    )

    const {
      rows: [updatedSkill],
    } = await pool.query(
      `UPDATE skill
       SET exp = LEAST(maxhp, exp + $1)
       WHERE id = $2
       RETURNING *`,
      [gainedXp, groupId],
    )

    return {
      success: true,
      data: {
        skill: updatedSkill,
        subSkill: updatedSubSkill,
      },
    }
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message }
  }
})

//Cổng giảm XP cho subskill và skill group
ipcMain.handle('decrease-xp-to-subskill', async (_, groupId, subSkillId) => {
  try {
    const {
      rows: [subSkill],
    } = await pool.query(
      'SELECT * FROM subskill WHERE id = $1 AND skill_id = $2',
      [subSkillId, groupId],
    )

    if (!subSkill) {
      return { success: false, error: 'Subskill not found' }
    }

    const reduceXp = Math.min(subSkill.add_points, subSkill.xp)

    const {
      rows: [updatedSubSkill],
    } = await pool.query(
      'UPDATE subskill SET xp = GREATEST(0, xp - $1) WHERE id = $2 RETURNING *',
      [reduceXp, subSkillId],
    )

    const {
      rows: [updatedSkill],
    } = await pool.query(
      `UPDATE skill
       SET exp = GREATEST(0, exp - $1)
       WHERE id = $2
       RETURNING *`,
      [reduceXp, groupId],
    )

    return {
      success: true,
      data: {
        skill: updatedSkill,
        subSkill: updatedSubSkill,
      },
    }
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message }
  }
})

//cổng notification
ipcMain.handle("show-notification", (_, payload) => {
  if (Notification.isSupported()) {
    new Notification({
      title: payload.title,
      body: payload.body
    }).show();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
      createWindow();
})

let popupWindow: BrowserWindow | null = null;

function createPopup() {
  popupWindow = new BrowserWindow({
    width: 300,
    height: 300,

    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    maximizable:false,
    minimizable:false,
    roundedCorners: true,

    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
    },
  });

  if (VITE_DEV_SERVER_URL) {
    popupWindow.loadURL(`${VITE_DEV_SERVER_URL}?popup=true`);
  } else {
    popupWindow.loadFile(
      path.join(RENDERER_DIST, "index.html"),
      {
        search: "?popup=true",
      }
    );
  }

  setTimeout(() => {
    popupWindow?.close();
    popupWindow = null;
  }, 7000);
}

ipcMain.handle("popup",()=>{

    createPopup()

})
