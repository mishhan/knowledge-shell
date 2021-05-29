import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

interface TreeNode {
	name: string;
	children: TreeNode[];
}

interface TreeNodeComponentArgs {
	node: TreeNode;
	isRootNode: boolean;
	isLastNode: boolean;
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

	get shoudShowChildren(): boolean {
		const hasChildren = this.args.node.children?.length > 0;
		return hasChildren && this.isOpen;
	}

	@action
	toggleState() {
		this.isOpen = !this.isOpen;
	}
}
