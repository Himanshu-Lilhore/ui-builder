import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../../../store/playgroundSlice";
import Playground, { Node } from "../Playground";
import TailwindCode from "../TailwindCode";
import { generateTailwindTree } from "../../../utils/tailwindUtils";

export default function WorkspaceSection() {
    const pgRef = useRef();
    const dispatch = useDispatch();
    const tree = useSelector((state) => state.playground.tree);
    const selectedId = useSelector((state) => state.playground.selectedId);
    const [view, setView] = useState("playground");
    const tailwindCode = generateTailwindTree(tree);

    const renderNode = (node) => (
        <Node
            key={node.id}
            node={node}
            selectedId={selectedId}
            onSelect={(e) => {
                e.stopPropagation();
                dispatch(setSelected(node.id));
            }}
        >
            {node.children && node.children.length > 0 && node.children.map(renderNode)}
        </Node>
    );

    return (
        <div className="flex-1 flex flex-col">
            <div className="flex items-center p-[0.3vw]">
                <div className="relative flex bg-gray-200 mx-[1.1vw] my-[0.5vw] border rounded-lg overflow-hidden">
                    {/* Sliding highlight */}
                    <div
                        className={`${view === "playground" ? "translate-x-0 w-[65%]" : "translate-x-[155%] w-[40%]"} absolute top-0 bottom-0 bg-[#212121] rounded-md transition-all duration-300 ease-in-out`}
                    />

                    <button
                        className={`relative z-10 px-[0.5vw] py-[0.35vw] text-[0.8vw] font-semibold transition-colors ${
                            view === "playground"
                                ? "text-white"
                                : "text-gray-600 hover:text-gray-800"
                        }`}
                        onClick={() => setView("playground")}
                    >
                        Playground
                    </button>

                    <button
                        className={`relative z-10 px-[0.5vw] py-[0.35vw] text-[0.8vw] font-semibold transition-colors ${
                            view === "code" ? "text-white" : "text-gray-600 hover:text-gray-800"
                        }`}
                        onClick={() => setView("code")}
                    >
                        Code
                    </button>
                </div>
            </div>

            <div className="flex-1 relative">
                <Playground ref={pgRef}>{tree.map(renderNode)}</Playground>
                <TailwindCode code={tailwindCode} visible={view === "code"} />
            </div>
        </div>
    );
}
