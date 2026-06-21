import { IoTrashBin } from "react-icons/io5";
import { TiTickOutline, TiTick } from "react-icons/ti";

export default function CheckinCard({item, onDelete, onMarkDone}) {
   const clickDone = item.markdone;

   const onClickDone = (item) => {
    if (clickDone==false)
      {onMarkDone(true, item.id)}
    else if (clickDone==true)
      {onMarkDone(false, item.id)}
  }

  return (
    <section className="relative bg-hazy min-h-5 text-white ease-in-out transition-all duration-300 min-w-100 rounded-2xl flex flex-col p-1">
        <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
          clickDone ? "opacity-100 z-0 bg-soft" : "opacity-0 "
        }`}
      />

      <div className='relative flex gap-1 pb-2'>
        <h4 className='text-xs text-darkblue mt-4 ml-4'></h4>
        <p className= 'text-darkblue mt-3 w-65'> {item.todo}</p>
        <div className="flex ml-14">
          <button onClick={()=>onClickDone(item) }>
            {clickDone? <TiTick size={27}/>
                      : <TiTickOutline size={27}/>}
          </button>
          <button onClick={() => onDelete(item.id)}>
            <IoTrashBin size={20}/>
          </button>
        </div>
      </div>

        <div className='flex items-center justify-between'>
          <p className='text-sm'> {item.deadline? String(item.deadline) : '' }</p>
          <p className='text-xs mb-2 mr-2'> {item.created_at ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</p>
        </div>
    </section>
  )
}