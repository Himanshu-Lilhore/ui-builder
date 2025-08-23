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
                <div className="flex bg-gray-200 mx-[1.1vw] my-[0.5vw] p-[0.3vw] border rounded-[0.5vw] overflow-hidden">
                    <button
                        className={`px-[0.5vw] py-[0.35vw] rounded-[0.3vw] text-[0.8vw] font-medium transition-colors ${
                            view === "playground"
                                ? "bg-white text-gray-800 shadow"
                                : "text-gray-600 hover:text-gray-800"
                        }`}
                        onClick={() => setView("playground")}
                    >
                        Playground
                    </button>
                    <button
                        className={`px-[0.5vw] py-[0.35vw] rounded-[0.3vw] text-[0.8vw] font-medium transition-colors ${
                            view === "code"
                                ? "bg-white text-gray-800 shadow"
                                : "text-gray-600 hover:text-gray-800"
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
