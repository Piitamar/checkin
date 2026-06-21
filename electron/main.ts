import { app, BrowserWindow, ipcMain } from 'electron'
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
  } catch (err: any) {
    return { success: false, error: err.message }
  }
})

//Cổng get
ipcMain.handle('get-todo', async () => {
  try {
    const res = await pool.query(
      'SELECT * FROM checkin ORDER BY created_at DESC'
    )
    return res.rows 
  } catch (err:any) {
    return {success: false, error: err.message}
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
  } catch (err: any) {
    return { success: false, error: err.message }
  }
})

//Cổng markdone 
ipcMain.handle('markDone-todo', async (_event, state, id) => {
  try {
    const res = await pool.query(
      'UPDATE checkin SET markdone = $1 WHERE id = $2 RETURNING *', [state, id]
    )
    return { success: true, data: res.rows[0] }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
})

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

app.whenReady().then(createWindow)
