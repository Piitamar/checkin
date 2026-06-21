import CheckinCard from "./Checkincard";

export default function TodoList({ group, onDelete, onMarkDone }) {
  return (
    <div className='flex flex-col w-100 gap-4 items-center justify-center'>
        {Object.keys(group).length > 0 ? (
          Object.entries(group).map(([date, items]) => (
            <div key={date} className="mb-10 pb-2 bg-zinc-200/68 rounded-2xl flex flex-col">
              <h2 className="text-darkblue text-s m-2 pl-90">{date}</h2>
              <div className="flex gap-2 justify-center flex-wrap">
                {items.map((item) => (
                  <CheckinCard key={item.id} item={item} onDelete={onDelete} onMarkDone={onMarkDone} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-white/50 text-center">Chưa có ghi chú nào nè...</p>
        )}
    </div>
  )
}
