import useTodo from '../todos/useTodo'
import useGroup from '../todos/useGroup'

export default function useHeatmapData() {
  const { todos } = useTodo()
  const groupData = useGroup({ todos })

  const heatmapData = {}
  for (const [rawDate, items] of Object.entries(groupData || {})) {
    const count = items.filter(item => item?.markdone).length
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
                ?'bg-[#f49399]'
                    :'bg-white'
    }
  }

  return {
    todos,
    groupData,
    heatmapData,
  }
}

