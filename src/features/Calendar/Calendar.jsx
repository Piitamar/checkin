import { useState } from 'react'
import useHeatmapData from './colorMap'
import { getMonthCalendar, currentMonth, currentYear } from './dayList'
import { formatDateKeyFromParts } from '../../utils/dateFormat'

export default function Calendar() {
  const { heatmapData } = useHeatmapData()
  const [month, setMonth] = useState(currentMonth)
  const [year, setYear] = useState(currentYear)

  const { dayList, date, weekDate } = getMonthCalendar(year, month)

  const shiftMonth = (offset) => {
    const nextDate = new Date(year, month - 1 + offset, 1)
    setMonth(nextDate.getMonth() + 1)
    setYear(nextDate.getFullYear())
  }

  return (
    <section className='mt-10 flex h-full min-h-screen w-full justify-center'>
      <div className='flex h-full w-170 flex-col items-center'>
        <div className='flex items-center gap-4'>
          <button
            type='button'
            onClick={() => shiftMonth(-1)}
            className='rounded-xl px-5 py-2 text-sm font-semibold text-darkblue transition hover:bg-white/50 hover:opacity-90'
          >
            Prev
          </button>
          <h1 className='text-base dark:text-lightwhite font-medium text-darkblue/80'>
            {weekDate}, ngày {date} tháng {month} năm {year}
          </h1>
          <button
            type='button'
            onClick={() => shiftMonth(1)}
            className='rounded-xl px-5 py-2 text-sm font-semibold text-darkblue transition hover:bg-white/50 hover:opacity-90'
          >
            Next
          </button>
        </div>

        <div className='calendar mt-10 grid w-130 grid-cols-7'>
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

            return (
              <div key={index}>
                <div className='mt-1 flex h-20 w-20 items-center justify-center gap-1'>
                  <p className={`date flex h-8 w-8 items-center justify-center rounded-sm ${color}`}>
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
