import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProp, deleteNode, setLiveValue } from "../store/playgroundSlice";

const getUnit = (key) => {
    if (["border", "rounded", "textSize", "padding", "margin", "minWidth", "minHeight", "gap"].includes(key)) {
        return "vw";
    }
    return "";
};

const propertySections = [
    {
        title: "Size",
        properties: [
            { key: "minWidth", label: "Min Width", type: "slider", min: 0.5, max: 32, step: 0.01 },
            { key: "minHeight", label: "Min Height", type: "slider", min: 0.5, max: 32, step: 0.01 },
        ],
    },
    {
        title: "Border",
        properties: [
            { key: "border", label: "Border Width", type: "slider", min: 0, max: 1, step: 0.01 },
            { key: "borderColor", label: "Border Color", type: "color" },
            { key: "rounded", label: "Roundedness", type: "slider", min: 0, max: 3, step: 0.01 },
        ],
    },
    {
        title: "Text",
        properties: [
            { key: "textSize", label: "Text Size", type: "slider", min: 0.5, max: 10, step: 0.01 },
            { key: "textColor", label: "Text Color", type: "color" },
            { key: "fontWeight", label: "Font Weight", type: "slider", min: 100, max: 900, step: 100 },
            { key: "leading", label: "Line Height", type: "slider", min: 0, max: 3, step: 0.1 },
            { key: "textAlign", label: "Text Align", type: "select", options: ["left", "center", "right"] },
        ],
    },
    {
        title: "Spacing",
        properties: [
            { key: "padding", label: "Padding", type: "slider", min: -1, max: 4, step: 0.01 },
            { key: "margin", label: "Margin", type: "slider", min: -1, max: 4, step: 0.01 },
            { key: "gap", label: "Gap", type: "slider", min: 0, max: 4, step: 0.01 },
        ],
    },
    {
        title: "Layout",
        properties: [
            { key: "display", label: "Display", type: "select", options: ["none", "flex", "grid"] },
            {
                key: "flexDirection",
                label: "Direction",
                type: "select",
                options: ["row", "col"],
                showIf: (props) => props.display === "flex",
            },
            {
                key: "items",
                label: "Items",
                type: "select",
                options: ["start", "center", "end", "stretch"],
                showIf: (props) => props.display === "flex",
            },
            {
                key: "justify",
                label: "Justify",
                type: "select",
                options: ["start", "center", "end", "between", "around", "evenly"],
                showIf: (props) => props.display === "flex",
            },
            {
                key: "grow",
                label: "Grow",
                type: "toggle",
                showIf: (props) => props.display === "flex",
            },
            {
                key: "gridCols",
                label: "Grid Columns",
                type: "select",
                options: ["1", "2", "3", "4", "5", "6"],
                showIf: (props) => props.display === "grid",
            },
            {
                key: "gridRows",
                label: "Grid Rows",
                type: "select",
                options: ["1", "2", "3", "4", "5", "6"],
                showIf: (props) => props.display === "grid",
            },
            {
                key: "gridGap",
                label: "Grid Gap",
                type: "slider",
                min: 0,
                max: 4,
                step: 0.1,
                showIf: (props) => props.display === "grid",
            },
        ],
    },
    {
        title: "Colors",
        properties: [{ key: "bgColor", label: "Background Color", type: "color" }],
    },
    {
        title: "Other",
        properties: [
            {
                key: "overflow",
                label: "Overflow",
                type: "select",
                options: ["visible", "hidden", "scroll", "auto"],
            },
            {
                key: "whitespace",
                label: "Whitespace",
                type: "select",
                options: ["normal", "nowrap", "pre", "pre-line", "pre-wrap"],
            },
            { key: "scroll", label: "Scroll", type: "toggle" },
        ],
    },
];

export default function Tweak() {
    const dispatch = useDispatch();
    const selectedId = useSelector((state) => state.playground.selectedId);
    const tree = useSelector((state) => state.playground.tree);
    const [expanded, setExpanded] = useState({});
    const dragState = useRef({});

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

    const handleInputMouseDown = (e, prop, propDef) => {
        e.preventDefault();
        const startY = e.clientY;
        const startValue = Number(node.props[prop]);
        dragState.current = { dragging: true, startY, startValue, prop, propDef };

        const range = propDef.max - propDef.min;
        const sensitivity = range / 100;

        const handleMouseMove = (moveEvent) => {
            if (!dragState.current.dragging) return;
            const delta = startY - moveEvent.clientY;
            let newValue = startValue + delta * sensitivity;
            newValue = Math.max(propDef.min, Math.min(propDef.max, newValue));
            dispatch(setLiveValue({
                prop,
                value: Number(newValue.toFixed(2)),
                label: propDef.label,
                unit: getUnit(prop),
            }));
            dispatch(updateProp({
                id: node.id,
                prop,
                value: Number(newValue.toFixed(2))
            }));
        };

        const handleMouseUp = () => {
            dragState.current = {};
            dispatch(setLiveValue(null));
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    if (!node) {
        return (
            <div className="flex flex-col px-[1vw] py-[1vw] gap-[0.4vw]">
                <div className="text-[#a1a1a1] text-[0.9vw] font-semibold"># Tweak</div>
                <div className="text-[0.9vw] text-gray-400">
                    Select an element to tweak its properties.
                </div>
            </div>
        );
    }

    return (
        <div className="grow flex flex-col px-[1vw] py-[1vw] gap-[0.8vw] overflow-y-scroll">
            <div className="text-[#a1a1a1] text-[0.9vw] font-semibold"># Tweak</div>
            <button
                className="mb-2 px-3 py-1 rounded bg-red-500 text-white text-[0.9vw] w-fit"
                onClick={() => dispatch(deleteNode(node.id))}
            >
                Delete
            </button>
            {propertySections.map((section) => (
                <div key={section.title} className="mb-2">
                    <div className="font-semibold text-[0.95vw] text-[#444] mb-1 mt-2">
                        {section.title}
                    </div>
                    {section.properties.map((prop) => {
                        if (prop.showIf && !prop.showIf(node.props)) return null;

                        const isExpanded = expanded[prop.key];
                        const isSlider = prop.type === "slider";
                        return (
                            <div key={prop.key}>
                                <div
                                    className="flex items-center justify-between gap-2 mb-1 cursor-pointer hover:bg-[#23272d] px-1 py-1 rounded"
                                    onClick={() =>
                                        isSlider &&
                                        setExpanded((prev) => ({
                                            ...prev,
                                            [prop.key]: !prev[prop.key],
                                        }))
                                    }
                                >
                                    <label className="text-[0.9vw] font-medium select-none">
                                        {prop.label}
                                    </label>
                                    <div className="flex items-center gap-1">
                                        {isSlider ? (
                                            <input
                                                type="number"
                                                min={prop.min}
                                                max={prop.max}
                                                step={prop.step}
                                                value={
                                                    node.props[prop.key] !== undefined &&
                                                    node.props[prop.key] !== null
                                                        ? Number(node.props[prop.key]).toFixed(2)
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    dispatch(
                                                        updateProp({
                                                            id: node.id,
                                                            prop: prop.key,
                                                            value: Number(e.target.value),
                                                        })
                                                    );
                                                    dispatch(
                                                        setLiveValue({
                                                            prop: prop.key,
                                                            value: Number(e.target.value),
                                                            label: prop.label,
                                                            unit: getUnit(prop.key),
                                                        })
                                                    );
                                                }}
                                                className="w-16 border px-1 text-[0.9vw] cursor-ns-resize"
                                                onMouseDown={(e) =>
                                                    handleInputMouseDown(e, prop.key, prop)
                                                }
                                                onClick={(e) => e.stopPropagation()}
                                                onBlur={() => dispatch(setLiveValue(null))}
                                            />
                                        ) : prop.type === "color" ? (
                                            <input
                                                type="color"
                                                value={node.props[prop.key] ?? "#212121"}
                                                onChange={(e) =>
                                                    dispatch(
                                                        updateProp({
                                                            id: node.id,
                                                            prop: prop.key,
                                                            value: e.target.value,
                                                        })
                                                    )
                                                }
                                                className="w-8 h-8 rounded-full"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : prop.type === "toggle" ? (
                                            <input
                                                type="checkbox"
                                                checked={!!node.props[prop.key]}
                                                onChange={(e) =>
                                                    dispatch(
                                                        updateProp({
                                                            id: node.id,
                                                            prop: prop.key,
                                                            value: e.target.checked,
                                                        })
                                                    )
                                                }
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : prop.type === "select" ? (
                                            <select
                                                value={node.props[prop.key] ?? prop.options[0]}
                                                onChange={(e) =>
                                                    dispatch(
                                                        updateProp({
                                                            id: node.id,
                                                            prop: prop.key,
                                                            value: e.target.value,
                                                        })
                                                    )
                                                }
                                                className="border px-1 text-[0.9vw] bg-white text-black"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {prop.options.map((opt) => (
                                                    <option key={opt} value={opt}>
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : null}
                                        {isSlider && (
                                            <span className="text-[0.8vw] text-gray-400 ml-1 select-none">
                                                {getUnit(prop.key)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {isSlider && isExpanded && (
                                    <div className="w-full flex items-center px-1 mb-2">
                                        <input
                                            type="range"
                                            min={prop.min}
                                            max={prop.max}
                                            step={prop.step}
                                            value={node.props[prop.key] ?? ""}
                                            onChange={(e) => {
                                                dispatch(
                                                    updateProp({
                                                        id: node.id,
                                                        prop: prop.key,
                                                        value: Number(e.target.value),
                                                    })
                                                );
                                                dispatch(
                                                    setLiveValue({
                                                        prop: prop.key,
                                                        value: Number(e.target.value),
                                                        label: prop.label,
                                                        unit: getUnit(prop.key),
                                                    })
                                                );
                                            }}
                                            className="w-full"
                                            style={{ accentColor: "#2563eb" }}
                                            onClick={(e) => e.stopPropagation()}
                                            onBlur={() => dispatch(setLiveValue(null))}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
