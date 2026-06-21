
export const now = new Date();

export const year = now.getFullYear();
export const month = now.getMonth() + 1;
export const date = now.getDate();

const weekday = new Date(year, month - 1, 1).getDay();
const daysInMonth = new Date(year, month, 0).getDate();

export const weekDate = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"][now.getDay()];

//push ngày vào lịch
export const dayList = [];
for (let i = 0; i < weekday; i++) {
    dayList.push(null);
}
for (let d = 1; d <= daysInMonth; d++) {
    dayList.push(d);
}

