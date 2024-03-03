
export default function PlayGame({modalData}) {

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-20 backdrop-blur-sm">
            <div className="w-11/12 max-w-[350px] rounded-lg border border-black-400 bg-zinc-900 p-6">
                <p className="text-2xl font-semibold text-red-500">
                    {modalData?.text1}
                </p>
                <p className="mt-3 mb-5 leading-6 text-gray-400">
                    {modalData?.text2}
                </p>
                <div className="flex items-center gap-x-4">
                    <button
                        className="cursor-pointer rounded-md bg-yellow-500 py-[8px] px-[20px] font-semibold text-black"
                        onClick={modalData?.btn1Handler}
                        >
                        {modalData?.btn1Text}
                    </button>
                    <button
                        className="cursor-pointer rounded-md bg-black py-[8px] px-[20px] font-semibold text-white"
                        onClick={modalData?.btn2Handler}
                    >
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}