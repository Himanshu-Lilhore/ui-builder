import { useDispatch } from "react-redux";
import { addDiv } from "../store/playgroundSlice";

export default function Create() {
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col px-[1vw] py-[1vw] gap-[0.4vw]">
            <div className="text-[#696969] text-[0.9vw] font-light"># Create</div>
            <div className="flex gap-[1vw] min-h-[5vw]">
                <button
                    onClick={() => dispatch(addDiv())}
                    className="px-[1vw] py-[0.2vw] rounded-full text-[1vw] h-fit"
                >
                    Add div
                </button>
            </div>
        </div>
    );
}
