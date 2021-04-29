import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { Frame } from "knowledge-shell/models";
import { Data, Network, Edge, Node } from "vis-network";
import type IntlService from "ember-intl/services/intl";
import options from "./vis-network/options";

interface FrameGraphArgs {
	frames: Frame[];
	addFrame: ({ x, y }: { x: number; y: number }) => void;
	setParent: (childFrame: Frame, parentFrame: Frame) => void;
	unsetParent: (childFrame: Frame) => void;
	deleteFrame: (frame: Frame) => void;
	changeFramePosition: (frame: Frame, position: { x: number; y: number }) => void;
}

const RELATIONS = { isA: "isA" };

export default class FrameGraph extends Component<FrameGraphArgs> {
	@service intl!: IntlService;

	container!: HTMLDivElement;

	network!: Network;

	networkData!: Data;

	get frames(): Frame[] {
		return this.args.frames;
	}

	@action
	initGraph(): void {
		this.container = document.getElementById("graph") as HTMLDivElement;
		options.locale = this.intl.primaryLocale;

		const manipulation = {
			enabled: true,
			initiallyActive: true,
			addNode: (nodeData: any, callback: Function) => {
				this.args.addFrame(nodeData);
				callback(null);
			},
			addEdge: (edgeData: any, callback: Function) => {
				if (edgeData.from === edgeData.to) return;
				const childFrame = this.frames.findBy("id", edgeData.from);
				const parentFrame = this.frames.findBy("id", edgeData.to);
				if (childFrame && parentFrame) {
					this.args.setParent(childFrame, parentFrame);
					this.addEdge({
						fromId: childFrame.id,
						toId: parentFrame.id,
						edgeName: RELATIONS.isA,
					});
					this.network.setData(this.networkData);
				}
				callback(null);
			},
			editEdge: false,
			deleteNode: (data: any, callback: Function) => {
				const nodeToDeleteId = data.nodes[0];
				const deletedFrame = this.frames.findBy("id", nodeToDeleteId);
				if (deletedFrame) {
					this.args.deleteFrame(deletedFrame);
					const deletedNode = (this.networkData.nodes as Node[]).filter((node: Node) => node.id === nodeToDeleteId)[0];
					(this.networkData.nodes as Node[]).removeObject(deletedNode);

					const connectedEdges: any[] = [];
					data.edges.forEach((edge: any) => {
						const networkEdge = (this.networkData.edges as Edge[]).filter((nEdge: Edge) => nEdge.id === edge)[0];
						connectedEdges.pushObject(networkEdge);
					});
					connectedEdges.forEach((edge: any) => {
						(this.networkData.edges as Edge[]).removeObject(edge);
					});

					this.network.setData(this.networkData);
				}
				callback(null);
			},
			deleteEdge: (data: any, callback: Function) => {
				const [fromId] = this.network.getConnectedEdges(data.edges[0]);
				const childFrame = this.frames.findBy("id", fromId);
				if (childFrame) {
					this.args.unsetParent(childFrame);
					const networkEdge = (this.networkData.edges as Edge[]).filter((nEdge: Edge) => nEdge.id === data.edges[0])[0];
					(this.networkData.edges as Edge[]).removeObject(networkEdge);
					this.network.setData(this.networkData);
				}
				callback(null);
			},
		};

		options.manipulation = manipulation;
		this.networkData = { nodes: [], edges: [] };
		this.network = new Network(this.container, this.networkData, options);

		this.network.on("selectNode", (data: any) => {
			const selectedNodeId = data.nodes[0];
			const selectedFrame = this.frames.findBy("id", selectedNodeId);
			if (selectedFrame) {
				this.frames.forEach((frame: Frame) => {
					frame.isSelected = false;
				});
				selectedFrame.isSelected = true;
			}
		});

		this.network.on("deselectNode", (data: any) => {
			if (data.nodes.length > 0) {
				this.frames.forEach((frame: Frame) => {
					frame.isSelected = false;
				});
			}
		});

		this.network.on("dragEnd", (data: any) => {
			if (data.nodes.length > 0) {
				const draggedNode = (this.networkData.nodes as Node[]).filter((node: any) => node.id === data.nodes[0])[0];
				const draggedFrame = this.frames.findBy("id", draggedNode.id);
				if (draggedFrame) {
					const pointerCanvas = data.pointer.canvas;
					this.args.changeFramePosition(draggedFrame, { x: pointerCanvas.x, y: pointerCanvas.y });
				}
			}
		});

		this.updateNetwork();
	}

	@action
	updateNetwork(): void {
		this.frames.forEach((frame: Frame) => {
			const drawnFrameNode = (this.networkData.nodes as Node[]).find((node: Node) => node.id === frame.id);
			if (!drawnFrameNode) {
				this.addNode({
					id: frame.id,
					name: frame.name,
					position: frame.position ? frame.position.coordinates : { x: 0, y: 0 },
				});

				if (frame.parent) {
					this.addEdge({
						fromId: frame.id,
						toId: frame.parent.id,
						edgeName: RELATIONS.isA,
					});
				}
			}

			const node = (this.networkData.nodes as Node[]).findBy("id", frame.id);
			if (node) {
				node.label = frame.name;
			}
		});
		this.network.setData(this.networkData);
	}

	addNode({ id, name, position }: { id: string; name: string; position: { x: number; y: number } }): void {
		(this.networkData.nodes as Node[]).pushObject({
			id,
			title: name,
			x: position.x,
			y: position.y,
		});
	}

	addEdge({ fromId, toId, edgeName }: { fromId: string; toId: string; edgeName: string }): void {
		(this.networkData.edges as Edge[]).pushObject({
			from: fromId,
			to: toId,
			label: edgeName,
		});
	}
}
