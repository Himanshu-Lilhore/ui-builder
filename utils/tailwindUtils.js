export const nodePropsToTailwind = (props) => {
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

    if (!props.minWidth) classes.push("min-w-[2vw]");
    if (!props.minHeight) classes.push("min-h-[2vw]");
    
    return classes.join(" ");
};

export const generateTailwindTree = (nodes, indent = 0) => {
    if (!nodes || !nodes.length) return "";
    return nodes
        .map((node) => {
            const pad = "  ".repeat(indent);
            const children = generateTailwindTree(node.children, indent + 1);
            return `${pad}<div className="${nodePropsToTailwind(node.props)}">${
                children ? "\n" + children + "\n" + pad : ""
            }</div>`;
        })
        .join("\n");
};
