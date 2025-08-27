import { useDispatch } from "react-redux";
import { addDiv } from "../store/playgroundSlice";

export default function Create() {
    const dispatch = useDispatch();
    return (
        <div className="sticky top-0 flex flex-col px-[1vw] py-[1vw] gap-[0.5vw]">
            <div className="text-[#a1a1a1] text-[0.9vw] font-semibold"># Create</div>
            <div className="flex gap-[1vw] min-h-[5vw] tracking-widest">
                <button
                    onClick={() => dispatch(addDiv())}
                    className="group relative min-w-[5vw] h-[2vw] text-[1vw] text-white bg-black active:translate-y-[0.15] duration-200 transition-all"
                >
                    <div className="absolute top-0 left-0 w-[0.2vw] group-hover:w-[15%] h-full flex items-center justify-center overflow-hidden bg-green-400 group-hover:text-black text-green-400 ease-in-out duration-200 transition-all"></div>
                    div
                </button>
            </div>
        </div>
    );
}
