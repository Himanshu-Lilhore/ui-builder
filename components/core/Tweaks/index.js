import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDragInputs } from "../../../hooks/useDragInputs";
import { propertySections } from "../../../config/properties";
import { PropertyControl } from "./PropertyControl";
import { PropertySlider } from "./PropertySlider";
import { updateProp, deleteNode } from "../../../store/playgroundSlice";

export default function Tweak() {
    const dispatch = useDispatch();
    const selectedId = useSelector((state) => state.playground.selectedId);
    const tree = useSelector((state) => state.playground.tree);
    const [expanded, setExpanded] = useState({});

    const findNode = (nodes, id) => {
        for (let node of nodes) {
            if (node.id === id) return node;
            if (node.children) {
                const found = findNode(node.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    const node = selectedId ? findNode(tree, selectedId) : null;
    const { handleInputMouseDown } = useDragInputs(node);

    if (!node) {
        return (
            <div className="flex flex-col px-[1vw] py-[1vw] gap-[0.4vw] text-gray-500">
                Select an element to edit its properties
            </div>
        );
    }

    return (
        <div className="flex flex-col px-[1vw] py-[1vw] gap-[0.8vw] overflow-y-scroll">
            <div className="flex justify-between items-center">
                <div className="text-[#696969] text-[0.9vw] font-light"># Properties</div>
                <button
                    onClick={() => dispatch(deleteNode(node.id))}
                    className="px-2 py-1 rounded bg-red-500 text-white text-[0.8vw] hover:bg-red-600 transition-colors"
                >
                    Delete
                </button>
            </div>

            {propertySections.map((section) => {
                const visibleProperties = section.properties.filter(
                    (prop) => !prop.showIf || prop.showIf(node.props)
                );

                if (visibleProperties.length === 0) return null;

                return (
                    <div key={section.title} className="border rounded-lg overflow-hidden">
                        <button
                            className="w-full px-3 py-2 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                            onClick={() => setExpanded({ ...expanded, [section.title]: !expanded[section.title] })}
                        >
                            <span className="text-[0.9vw] font-medium">{section.title}</span>
                            <span className={`transform transition-transform ${expanded[section.title] ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </button>

                        {expanded[section.title] && (
                            <div className="p-3 space-y-3">
                                {visibleProperties.map((prop) => (
                                    <div key={prop.key} className="flex flex-col gap-1">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[0.8vw] text-gray-600">
                                                {prop.label}
                                            </label>
                                            <PropertyControl
                                                prop={prop}
                                                node={node}
                                                handleInputMouseDown={handleInputMouseDown}
                                            />
                                        </div>
                                        {prop.type === "slider" && (
                                            <PropertySlider prop={prop} node={node} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
