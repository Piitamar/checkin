

export default function Group({todos}) {
    let group = {}; 

    todos.forEach((item) => {
        const date = new Date(item.created_at).toLocaleDateString('vi-VN');
        if (!group[date]) group[date] = [];
        group[date].push(item);
    });
    
    return group;
}