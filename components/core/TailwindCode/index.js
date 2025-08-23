import { useState, useEffect } from "react";

export default function TailwindCode({ code }) {
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
        <div className="h-full w-full bg-white p-6">
            <div className="bg-gray-50 rounded-lg p-4 h-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">Generated Tailwind Code</h2>
                    <button
                        className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                        onClick={() => {
                            navigator.clipboard.writeText(formattedCode);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1200);
                        }}
                    >
                        {copied ? "Copied!" : "Copy Code"}
                    </button>
                </div>
                <div className="overflow-auto h-[calc(100%-3rem)] rounded border bg-white">
                    <pre className="p-4 text-sm whitespace-pre-wrap break-words font-mono leading-relaxed">
                        {formattedCode}
                    </pre>
                </div>
            </div>
        </div>
    );
}
