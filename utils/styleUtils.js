export const nodePropsToStyle = (props) => ({
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
        props.display === "flex" ? (props.flexDirection === "col" ? "column" : "row") : undefined,
    gap: props.display === "flex" ? props.gap + "vw" : undefined,
    alignItems: props.display === "flex" ? props.items : undefined,
    justifyContent: props.display === "flex" ? props.justify : undefined,
    flexGrow: props.display === "flex" && props.grow ? 1 : undefined,
    // Grid properties
    gridTemplateColumns: props.display === "grid" ? `repeat(${props.gridCols}, 1fr)` : undefined,
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

// export const nodePropsToStyle = (props) => ({
//     borderWidth: props.border + "vw",
//     borderColor: props.borderColor,
//     borderStyle: props.border ? "solid" : undefined,
//     borderRadius: props.rounded + "vw",
//     fontSize: props.textSize + "vw",
//     color: props.textColor,
//     fontWeight: props.fontWeight,
//     lineHeight: props.leading,
//     padding: props.padding + "vw",
//     margin: props.margin + "vw",
//     minWidth: (props.minWidth ?? 2) + "vw",
//     minHeight: (props.minHeight ?? 2) + "vw",
//     display: props.display === "none" ? undefined : props.display,
//     flexDirection: props.display === "flex" ? (props.flexDirection === "col" ? "column" : "row") : undefined,
//     gap: props.display === "flex" ? props.gap + "vw" : undefined,
//     alignItems: props.display === "flex" ? props.items : undefined,
//     justifyContent: props.display === "flex" ? props.justify : undefined,
//     flexGrow: props.display === "flex" && props.grow ? 1 : undefined,
//     gridTemplateColumns: props.display === "grid" ? `repeat(${props.gridCols}, 1fr)` : undefined,
//     gridTemplateRows: props.display === "grid" ? `repeat(${props.gridRows}, 1fr)` : undefined,
//     gap: props.display === "grid" ? props.gridGap + "vw" : props.display === "flex" ? props.gap + "vw" : undefined,
//     textAlign: props.textAlign,
//     overflow: props.overflow,
//     whiteSpace: props.whitespace,
//     overflowX: props.scroll ? "auto" : undefined,
//     overflowY: props.scroll ? "auto" : undefined,
//     boxSizing: "border-box",
//     background: props.bgColor,
// });
