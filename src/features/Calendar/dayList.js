const weekDays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

export function getMonthCalendar(year, month) {
  const now = new Date()
  const weekday = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const dayList = []

  for (let i = 0; i < weekday; i += 1) {
    dayList.push(null)
  }

  for (let d = 1; d <= daysInMonth; d += 1) {
    dayList.push(d)
  }

  return {
    dayList,
    date: now.getDate(),
    weekDate: weekDays[now.getDay()],
  }
}

export const currentDate = new Date()
export const currentYear = currentDate.getFullYear()
export const currentMonth = currentDate.getMonth() + 1
