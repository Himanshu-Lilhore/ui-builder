import { useState, useEffect } from "react";

export default function TailwindCode({ code, visible }) {
    const [copied, setCopied] = useState(false);
    const [formattedCode, setFormattedCode] = useState("");

    useEffect(() => {
        // Format the code by properly indenting it
        const formatCode = (rawCode) => {
            const lines = rawCode.split("\n");
            let indentLevel = 0;
            const formatted = lines
                .map((line) => {
                    // Skip empty lines
                    if (!line.trim()) return "";

                    const trimmedLine = line.trim();

                    // Handle closing tags first
                    if (trimmedLine === "</div>") {
                        indentLevel = Math.max(0, indentLevel - 1);
                        return "  ".repeat(indentLevel) + trimmedLine;
                    }

                    let result = "  ".repeat(indentLevel) + trimmedLine;

                    // Increase indent after opening div
                    if (trimmedLine.startsWith("<div")) {
                        indentLevel += 1;
                    }

                    return result;
                })
                .filter(Boolean) // Remove empty lines
                .join("\n");

            return formatted;
        };

        setFormattedCode(formatCode(code));
    }, [code]);

    return (
        <div
            className={`${visible ? "opacity-100" : "opacity-0"} absolute top-0 left-0 h-full w-full max-w-[96%] max-h-[97.5%] rounded-[0.8vw] mx-[1.5vw] my-[0.2vw] border bg-zinc-800/85 shadow-inner shadow-white backdrop-blur-md overflow-hidden z-[100] transition-all duration-400`}
        >
            <button
                className="absolute right-[1.5vw] top-[1vw] px-[0.75vw] py-[0.2vw] bg-gray-100 hover:border-black/40 active:scale-[96%] border-transparent border-[0.2vw] text-black/80 rounded-[0.4vw] text-[0.9vw] font-semibold z-[101] transition-all duration-250"
                onClick={() => {
                    navigator.clipboard.writeText(formattedCode);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1200);
                }}
            >
                {copied ? "Copied!" : "Copy"}
            </button>
            <div className="relative h-full w-full overflow-auto">
                <pre className="p-[1.2vw] text-sm whitespace-pre-wrap break-words font-mono leading-relaxed">
                    {formattedCode}
                </pre>
            </div>
        </div>
    );
}
