import { useDispatch } from "react-redux";
import { addDiv } from "../store/playgroundSlice";

export default function Create() {
    const dispatch = useDispatch();
    return (
        <div className="sticky top-0 flex flex-col px-[1vw] py-[1vw] gap-[0.5vw]">
            <div className="text-[#696969] text-[0.9vw] font-light"># Create</div>
            <div className="flex gap-[1vw] min-h-[5vw]">
                <button
                    onClick={() => dispatch(addDiv())}
                    className="px-[1vw] py-[0.1vw] rounded-full text-[1vw] h-fit border-[0.15vw] border-b-[0.2vw] hover:border-b-[0.3vw] hover:translate-y-[-0.15vw] active:translate-y-[0.15] border-white duration-150 transition-all"
                >
                    + div
                </button>
            </div>
        </div>
    );
}
