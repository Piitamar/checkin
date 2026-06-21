import { dayList, date, month, year, weekDate } from './dayList'
import useHeatmapData from './colorMap'
import { formatDateKeyFromParts } from '../../utils/dateFormat'

export default function Calendar() {
  const { heatmapData } = useHeatmapData()

  return (
    <section className='h-full w-full min-h-screen mt-10 flex justify-center'>
      <div className='h-full w-170 flex flex-col items-center'>
        <h1>{weekDate}, ngày {date} tháng {month} năm {year}</h1>

        <div className='calendar w-130 grid grid-cols-7 mt-10'>
          <h2>Thứ Hai</h2>
          <h2>Thứ Ba</h2>
          <h2>Thứ Tư</h2>
          <h2>Thứ Năm</h2>
          <h2>Thứ Sáu</h2>
          <h2>Thứ Bảy</h2>
          <h2>Chủ Nhật</h2>

          {dayList.map((day, index) => {
            if (!day) return <div key={index} />

            const dayKey = formatDateKeyFromParts(year, month, day)
            const dayInfo = heatmapData[dayKey]
            const color = dayInfo?.color || 'bg-hazyblue-soft'
            console.log(dayInfo)

            return (
              <div key={index}>
                <div className='w-20 h-20 gap-1 mt-1 flex items-center justify-center'>
                  <p className={`date w-8 h-8 flex items-center justify-center rounded-sm ${color}`}>
                    {day}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}