import { useEffect, useState } from 'react'
import useGroup from '../todos/useGroup'
import useTodos from '../todos/useTodos'

export default function useHeatmapData() {
  const [todos, setTodos] = useState([])
  const { loadAllTodos } = useTodos()

  useEffect(() => {
    async function loadData() {
      setTodos(await loadAllTodos())
    }

    loadData()
  }, [loadAllTodos])

  const groupData = useGroup({ todos })

  const heatmapData = {}
  for (const [rawDate, items] of Object.entries(groupData || {})) {
    const count = items.filter(item => {
      return item?.markdone && !item.track_only
    }).length
    heatmapData[rawDate] = {
      count,
      color: count === 0
        ? 'bg-hazyblue'
        : count === 1
          ? 'bg-[#EDD8DC]'
          : count === 2
            ? 'bg-[#FECBCB]'
            : count === 3
              ? 'bg-[#F1B3B8]'
              : count === 4
                ? 'bg-[#f49399]'
                : 'bg-white'
    }
  }

  return {
    todos,
    groupData,
    heatmapData,
  }
}

