import { useState } from "react";
import { useSelector } from "react-redux";
import { generateTailwindTree } from "../../utils/tailwindUtils";

export default function TailwindPreview() {
    const [showTailwind, setShowTailwind] = useState(false);
    const [copied, setCopied] = useState(false);
    const tree = useSelector((state) => state.playground.tree);
    const tailwindCode = generateTailwindTree(tree);

    if (!showTailwind) {
        return (
            <button
                className="absolute top-2 right-2 z-[1000] px-3 py-1 bg-blue-600 text-white rounded text-[0.9vw] shadow"
                onClick={() => setShowTailwind(true)}
            >
                Show Tailwind Code
            </button>
        );
    }

    return (
        <>
            <button
                className="absolute top-2 right-2 z-[1000] px-3 py-1 bg-blue-600 text-white rounded text-[0.9vw] shadow"
                onClick={() => setShowTailwind(false)}
            >
                Hide Tailwind Code
            </button>
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
        </>
    );
}
