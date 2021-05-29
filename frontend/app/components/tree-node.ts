import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

interface TreeNode {
	id: string;
	name: string;
	isSelected: boolean;
	children: TreeNode[];
}

interface TreeNodeComponentArgs {
	node: TreeNode;
	isRootNode: boolean;
	isLastNode: boolean;
	selectNode: (nodeId: string) => void;
}

export default class TreeNodeComponent extends Component<TreeNodeComponentArgs> {
	@tracked isOpen: boolean = true;

	get isRootNode(): boolean {
		return this.args.isRootNode;
	}

	get isLastNode(): boolean {
		return this.args.isLastNode;
	}

	get isNotRootLastNode(): boolean {
		const notRootLast = !this.args.isRootNode && this.args.isLastNode;
		return notRootLast;
	}

	get isOrdinaryNode(): boolean {
		const isOrdinaryNode = !this.args.isRootNode && !this.args.isLastNode;
		return isOrdinaryNode;
	}

	get isSelected(): boolean {
		return this.args.node.isSelected;
	}

	get hasChildren(): boolean {
		return this.args.node.children?.length > 0;
	}

	get shoudShowChildren(): boolean {
		const { hasChildren, isOpen } = this;
		return hasChildren && isOpen;
	}

	@action
	toggleState() {
		if (this.hasChildren) {
			this.isOpen = !this.isOpen;
		}
	}

	@action
	selectNode() {
		if (this.args.selectNode) {
			this.args.selectNode(this.args.node.id);
		}
	}
}
