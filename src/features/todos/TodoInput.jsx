export default function TodoInput( {text, setText, onAdd, toast}) {
    return (
        <form className="m-20 mb-10 flex h-40 min-h-40 min-w-140 max-w-200 flex-col justify-between rounded-2xl border-[1px] border-white/70 bg-pastel p-10 pb-5 opacity-80 shadow-[5px_10px_20px_#d0b1b850] backdrop-blur-2xl">
        <input
          placeholder="Hôm nay bạn muốn làm gì?"
          value={text}
          toast={toast}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          className="text-xl text-white focus:outline-none"
        />
        {toast && (
          <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded">
            {toast}
          </div>
        )}

        <div id="Khungedit" className="mt-2 h-12">
          <div id="khungeditnho" className="flex h-12 justify-between transition-all duration-300 ease-in-out">
            <button type="button" className="w-10 text-white transition-all duration-300 ease-in-out hover:text-xl">
              Edit
            </button>
            <button
              type="button"
              onClick={onAdd}
              className="w-20 rounded-2xl border-white/70 bg-lightwhite/80 text-xl text-[#d67382] drop-shadow-sm transition-all duration-200 ease-in-out hover:scale-105 active:scale-115 active:text-white"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    )
}