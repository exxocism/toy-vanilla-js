
class GraphWithAdjacencyMatrix {
	constructor() {
		this.matrix = [];
	}

	addVertex() {
        //버텍스를 추가합니다.
		const currentLength = this.matrix.length;
		for (let i = 0; i < currentLength; i++) {
			this.matrix[i].push(0);
		}
		this.matrix.push(new Array(currentLength + 1).fill(0));
	}

	contains(vertex) {
    //TODO: 버텍스가 있는지 확인합니다.
    return (Array.isArray(this.matrix[vertex]));
	}

	addEdge(from, to) {
		const currentLength = this.matrix.length;
		if (from === undefined || to === undefined) {
			console.log("2개의 인자가 있어야 합니다.");
			return;
		}
        //TODO: 간선을 추가할 수 없는 상황에서는 추가하지 말아야 합니다.
		if (from + 1 > currentLength || to + 1 > currentLength || from < 0 || to < 0) {
			console.log("범위가 매트릭스 밖에 있습니다.");
			return;
		}
        //TODO: 간선을 추가해야 합니다.
    this.matrix[from][to] = 1;
	}

	hasEdge(from, to) {
		//TODO: 두 버텍스 사이에 간선이 있는지 확인합니다.
    return this.matrix[from][to] === 1;
	}

	removeEdge(from, to) {
		const currentLength = this.matrix.length;
		if (from === undefined || to === undefined) {
			console.log("2개의 인자가 있어야 합니다.");
			return;
		}
        //TODO: 간선을 지울 수 없는 상황에서는 지우지 말아야 합니다.
		if (from + 1 > currentLength || to + 1 > currentLength || from < 0 || to < 0) {
      console.log("범위가 매트릭스 밖에 있습니다.");
      return ;
		}
        //TODO: 간선을 지워야 합니다.
        this.matrix[from][to] = 0;
	}
}