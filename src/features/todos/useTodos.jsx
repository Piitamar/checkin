export default function useTodos() {

  async function loadTodos() {
    const result = await window.api.getTodo()
    if (Array.isArray(result)) 
      return result

    console.error(result)
    return []
  }

  async function createTodo(text, trackOnly) {
    const result = await window.api.addTodo({ todo: text, trackOnly });
    if (result.success) {
      return result
    }
    return { success: false, error: result.error }
  }

  async function deleteTodo(id) {
    const result = await window.api.deleteTodo(id)
    if (result.success) {
      return result
    }
    return { success: false, error: result.error }
  }

  async function markDoneTodo(state, id) {
    const result = await window.api.markDoneTodo(state, id)
    if (result.success) {
      return result
    }
    return { success: false, error: result.error }
  }

  async function updateTrackOnly(state, id) {
    const result = await window.api.updateTrackOnly(state, id)
    if (result.success) {
      return result
    }
    return { success: false, error: result.error }
  }

  return {createTodo, loadTodos, deleteTodo, markDoneTodo, updateTrackOnly }
}
