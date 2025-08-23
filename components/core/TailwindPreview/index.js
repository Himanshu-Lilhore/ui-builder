import { useSelector } from "react-redux";
import { nodePropsToTailwind } from "../../../utils/tailwindUtils";

export default function TailwindPreview() {
    const [showTailwind, setShowTailwind] = useState(false);
    const [copied, setCopied] = useState(false);
    const tree = useSelector((state) => state.playground.tree);
    const tailwindCode = generateTailwindTree(tree);

    if (!showTailwind) {
        return (
            <button
                className="absolute top-2 right-2 z-[1000] px-3 py-1 bg-blue-600 text-white rounded text-[0.9vw] shadow hover:bg-blue-700 transition-colors"
                onClick={() => setShowTailwind(true)}
            >
                Show Tailwind Code
            </button>
        );
    }

    return (
        <>
            <button
                className="absolute top-2 right-2 z-[1000] px-3 py-1 bg-blue-600 text-white rounded text-[0.9vw] shadow hover:bg-blue-700 transition-colors"
                onClick={() => setShowTailwind(false)}
            >
                Hide Tailwind Code
            </button>
            <div className="absolute top-12 right-2 z-[1000] bg-white text-black p-4 rounded shadow-lg max-w-[40vw] max-h-[60vh] overflow-auto text-xs font-mono border">
                <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-semibold">Generated Tailwind Code</span>
                    <button
                        className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-xs"
                        onClick={() => {
                            navigator.clipboard.writeText(tailwindCode);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1200);
                        }}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <pre className="bg-gray-50 p-3 rounded overflow-x-auto">{tailwindCode}</pre>
            </div>
        </>
    );
}
