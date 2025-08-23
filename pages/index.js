// Helper to map node props to Tailwind classes
function nodePropsToTailwind(props) {
    const classes = [];
    if (props.border) classes.push(`border-[${props.border}vw]`);
    if (props.borderColor) classes.push(`border-[${props.borderColor}]`);
    if (props.rounded) classes.push(`rounded-[${props.rounded}vw]`);
    if (props.textSize) classes.push(`text-[${props.textSize}vw]`);
    if (props.textColor) classes.push(`text-[${props.textColor}]`);
    if (props.fontWeight) classes.push(`font-[${props.fontWeight}]`);
    if (props.leading) classes.push(`leading-[${props.leading}]`);
    if (props.padding) classes.push(`p-[${props.padding}vw]`);
    if (props.margin) classes.push(`m-[${props.margin}vw]`);
    if (props.minWidth) classes.push(`min-w-[${props.minWidth}vw]`);
    if (props.minHeight) classes.push(`min-h-[${props.minHeight}vw]`);
    if (props.display === "flex") {
        classes.push("flex");
        if (props.flexDirection === "col") classes.push("flex-col");
        else classes.push("flex-row");
        if (props.gap) classes.push(`gap-[${props.gap}vw]`);
        if (props.items) classes.push(`items-${props.items}`);
        if (props.justify) classes.push(`justify-${props.justify}`);
        if (props.grow) classes.push("grow");
    } else if (props.display === "grid") {
        classes.push("grid");
        classes.push(`grid-cols-${props.gridCols}`);
        classes.push(`grid-rows-${props.gridRows}`);
        if (props.gridGap) classes.push(`gap-[${props.gridGap}vw]`);
    }
    if (props.textAlign) classes.push(`text-${props.textAlign}`);
    if (props.overflow) classes.push(`overflow-${props.overflow}`);
    if (props.whitespace) classes.push(`whitespace-${props.whitespace}`);
    if (props.scroll) classes.push("overflow-auto");
    if (props.bgColor) classes.push(`bg-[${props.bgColor}]`);
    classes.push("box-border");
    // Always ensure a minimum size for usability
    if (!props.minWidth) classes.push("min-w-[2vw]");
    if (!props.minHeight) classes.push("min-h-[2vw]");
    return classes.join(" ");
}

// Recursive function to generate JSX string with Tailwind classes
function generateTailwindTree(nodes, indent = 0) {
    if (!nodes || !nodes.length) return "";
    return nodes
        .map((node) => {
            const pad = "  ".repeat(indent);
            const children = generateTailwindTree(node.children, indent + 1);
            return `${pad}<div className=\"${nodePropsToTailwind(node.props)}\">${
                children ? "\n" + children + "\n" + pad : ""
            }</div>`;
        })
        .join("\n");
}

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Panel from "../components/Panel";
import { setPlaygroundRef, setSelected } from "../store/playgroundSlice";
import Playground, { Node } from "../components/core/Playground";

export default function Home() {
    const pgRef = useRef();
    const dispatch = useDispatch();
    const tree = useSelector((state) => state.playground.tree);
    const selectedId = useSelector((state) => state.playground.selectedId);

    useEffect(() => {
        dispatch(setPlaygroundRef(pgRef));
    }, [dispatch]);

    const nodePropsToStyle = (props) => ({
        borderWidth: props.border + "vw",
        borderColor: props.borderColor,
        borderStyle: props.border ? "solid" : undefined,
        borderRadius: props.rounded + "vw",
        fontSize: props.textSize + "vw",
        color: props.textColor,
        fontWeight: props.fontWeight,
        lineHeight: props.leading,
        padding: props.padding + "vw",
        margin: props.margin + "vw",
        minWidth: (props.minWidth ?? 2) + "vw",
        minHeight: (props.minHeight ?? 2) + "vw",
        display: props.display === "none" ? undefined : props.display,
        // Flex properties
        flexDirection:
            props.display === "flex"
                ? props.flexDirection === "col"
                    ? "column"
                    : "row"
                : undefined,
        gap: props.display === "flex" ? props.gap + "vw" : undefined,
        alignItems: props.display === "flex" ? props.items : undefined,
        justifyContent: props.display === "flex" ? props.justify : undefined,
        flexGrow: props.display === "flex" && props.grow ? 1 : undefined,
        // Grid properties
        gridTemplateColumns:
            props.display === "grid" ? `repeat(${props.gridCols}, 1fr)` : undefined,
        gridTemplateRows: props.display === "grid" ? `repeat(${props.gridRows}, 1fr)` : undefined,
        gap:
            props.display === "grid"
                ? props.gridGap + "vw"
                : props.display === "flex"
                ? props.gap + "vw"
                : undefined,
        textAlign: props.textAlign,
        overflow: props.overflow,
        whiteSpace: props.whitespace,
        overflowX: props.scroll ? "auto" : undefined,
        overflowY: props.scroll ? "auto" : undefined,
        boxSizing: "border-box",
        background: props.bgColor,
    });
    // Delete selected node on Delete key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Delete" && selectedId) {
                dispatch({ type: "playground/deleteNode", payload: selectedId });
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [dispatch, selectedId]);

    const renderNode = (node) => (
        <div
            key={node.id}
            style={{
                ...nodePropsToStyle(node.props),
                ...(selectedId === node.id
                    ? { outline: "0.15vw dotted #2563eb", outlineOffset: "0.3vw", zIndex: 99 }
                    : {}),
            }}
            className={"m-2 cursor-pointer group relative"}
            onClick={(e) => {
                e.stopPropagation();
                dispatch(setSelected(node.id));
            }}
        >
            {/* ID label at top right outside the element */}
            <div
                style={{
                    position: "absolute",
                    top: "0vw",
                    left: "0vw",
                    transform: "translateY(-100%)",
                    fontSize: "0.85vw",
                    fontWeight: 300,
                    color: "#727272ff",
                    borderRadius: "0.4vw",
                    pointerEvents: "none",
                    zIndex: 10,
                }}
            >
                {node.id}
            </div>
            {/* Red outline on hover */}
            <div
                className="absolute inset-0 pointer-events-none rounded"
                style={{
                    border: "2px solid transparent",
                    zIndex: 9,
                }}
            />
            <style>{`
                    .group:hover > .absolute.inset-0 {
                        border-color: #ef4444 !important;
                        box-shadow: 0 0 0 1px #ef4444;
                        z-index: 999;
                    }
                `}</style>
            {/* Children */}
            {node.children && node.children.length > 0 && (
                <div className="w-full h-full">{node.children.map(renderNode)}</div>
            )}
        </div>
    );

    const [showTailwind, setShowTailwind] = useState(false);
    const [copied, setCopied] = useState(false);
    const tailwindCode = generateTailwindTree(tree);

    return (
        <div className="h-screen flex">
            <Panel />
            <div className="flex-1 relative">
                <button
                    className="absolute top-2 right-2 z-[1000] px-3 py-1 bg-blue-600 text-white rounded text-[0.9vw] shadow"
                    onClick={() => setShowTailwind((v) => !v)}
                >
                    {showTailwind ? "Hide Tailwind Code" : "Show Tailwind Code"}
                </button>
                {showTailwind && (
                    <div className="absolute top-10 right-2 z-[1000] bg-white text-black p-4 rounded shadow max-w-[40vw] max-h-[60vh] overflow-auto text-xs font-mono">
                        <pre>{tailwindCode}</pre>
                        <button
                            className="mt-2 px-2 py-1 bg-green-600 text-white rounded"
                            onClick={() => {
                                navigator.clipboard.writeText(tailwindCode);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 1200);
                            }}
                        >
                            Copy
                        </button>
                        {copied && <span className="ml-2 text-green-700">Copied!</span>}
                    </div>
                )}
                <Playground ref={pgRef}>{tree.map(renderNode)}</Playground>
            </div>
        </div>
    );
}
