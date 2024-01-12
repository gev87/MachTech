export function fitSlicesOptimized(boardWidth, boardHeight, slices) {
    console.log("start")
    let expandedSlices = slices.flatMap(slice =>
        Array(slice.quantity).fill().map(() => ({ width: slice.width, height: slice.height }))
    );
    expandedSlices.sort((a, b) => (b.width * b.height) - (a.width * a.height));

    let boards = []; 

    for (const slice of expandedSlices) {
        let placed = tryPlaceSlice(slice, boards, boardWidth, boardHeight, false);
        if (!placed) {
            placed = tryPlaceSlice(slice, boards, boardWidth, boardHeight, true);
        }

        if (!placed) {
            const newBoard = createEmptyBoard(boardWidth, boardHeight);
            tryPlaceSliceOnBoard(slice, newBoard, boardWidth, boardHeight, false);
            boards.push(newBoard);
        }
    }
    console.log("end")
    return boards;
}

function tryPlaceSlice(slice, boards, boardWidth, boardHeight, rotate) {
    if (!Array.isArray(boards)) {
        console.error('Invalid boards array');
        return false;
    }

    for (const board of boards) {
        if (tryPlaceSliceOnBoard(slice, board, boardWidth, boardHeight, rotate)) {
            return true;
        }
    }
    return false;
}


function tryPlaceSliceOnBoard(slice, board, boardWidth, boardHeight, rotate) {
    const [w, h] = rotate ? [slice.height, slice.width] : [slice.width, slice.height];

    for (let x = 0; x <= boardWidth - w; x++) {
        for (let y = 0; y <= boardHeight - h; y++) {
            if (canPlaceSlice(x, y, w, h, board)) {
                placeSlice(x, y, w, h, board);
                return true;
            }
        }
    }
    return false;
}

function canPlaceSlice(x, y, width, height, board) {
    for (let i = x; i < x + width; i++) {
        for (let j = y; j < y + height; j++) {
            if (board.placement[i][j]) return false; 
        }
    }
    return true;
}

function placeSlice(x, y, width, height, board) {
    for (let i = x; i < x + width; i++) {
        for (let j = y; j < y + height; j++) {
            board.placement[i][j] = true;
        }
    }
    board.slices.push({ x, y, width, height });
}

function createEmptyBoard(width, height) {
    let placement = Array.from({ length: width }, () => Array(height).fill(false));
    return { width, height, placement, slices: [] };
}
