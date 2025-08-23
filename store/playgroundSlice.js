// Helper to update a property of a node by id
function findAndUpdateProp(nodes, targetId, prop, value) {
    for (let node of nodes) {
        if (node.id === targetId) {
            node.props[prop] = value;
            return true;
        }
        if (findAndUpdateProp(node.children, targetId, prop, value)) {
            return true;
        }
    }
    return false;
}

// Helper to add a child node by parent id
function findAndAddChild(nodes, parentId, newNode) {
    for (let node of nodes) {
        if (node.id === parentId) {
            node.children.push(newNode);
            return true;
        }
        if (findAndAddChild(node.children, parentId, newNode)) {
            return true;
        }
    }
    return false;
}
import { createSlice } from "@reduxjs/toolkit";


// Initial state: a tree with a root node (could be expanded for more complex structures)
const initialState = {
    tree: [],
    playgroundRef: null,
    selectedId: null,
    liveValue: null, // { prop, value, label, unit }
};

const playgroundSlice = createSlice({
    name: "playground",
    initialState,
    reducers: {
        addDiv: (state) => {
            const newNode = {
                id: Date.now(),
                type: "div",
                props: {
                    border: 0.07,
                    borderColor: "#212121",
                    rounded: 0,
                    display: "none",
                    flexDirection: "row",
                    gap: 0,
                    bgColor: "#bfdbfe",
                    gridCols: "1",
                    gridRows: "1",
                    gridGap: 0,
                    items: "start",
                    justify: "start",
                    grow: false,
                    textSize: 1,
                    textColor: "#212121",
                    fontWeight: 400,
                    leading: 1.5,
                    padding: 0,
                    margin: 0,
                    minWidth: 8,
                    minHeight: 8,
                    flex: false,
                    flexDirection: "row",
                    gap: 0,
                    items: "center",
                    justify: "start",
                    textAlign: "left",
                    overflow: "visible",
                    whitespace: "normal",
                    scroll: false,
                },
                children: [],
            };
            if (state.selectedId) {
                findAndAddChild(state.tree, state.selectedId, newNode);
            } else {
                state.tree.push(newNode);
            }
        },
        deleteNode: (state, action) => {
            const id = action.payload;
            function removeNode(nodes, id) {
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].id === id) {
                        nodes.splice(i, 1);
                        return true;
                    }
                    if (removeNode(nodes[i].children, id)) {
                        return true;
                    }
                }
                return false;
            }
            removeNode(state.tree, id);
            if (state.selectedId === id) state.selectedId = null;
        },
        updateProp: (state, action) => {
            const { id, prop, value } = action.payload;
            // Support migration: if prop is width/height, map to minWidth/minHeight
            let actualProp = prop;
            if (prop === 'width') actualProp = 'minWidth';
            if (prop === 'height') actualProp = 'minHeight';
            findAndUpdateProp(state.tree, id, actualProp, value);
        },
        setPlaygroundRef: (state, action) => {
            state.playgroundRef = action.payload;
        },
        setSelected: (state, action) => {
            state.selectedId = action.payload;
        },
        setLiveValue: (state, action) => {
            state.liveValue = action.payload;
        },
    },
});

export const { addDiv, setPlaygroundRef, setSelected, updateProp, deleteNode, setLiveValue } =
    playgroundSlice.actions;
export default playgroundSlice.reducer;
