import Component from "@glimmer/component";
import { action } from "@ember/object";
import { Domain } from "knowledge-shell/models";

interface DomainListItemArgs {
  domain: Domain;
  onSave: (domain: Domain) => void;
  onCancelChanges: (domain: Domain) => void;
}

export default class DomainListItem extends Component<DomainListItemArgs> {
  get currentDomain(): Domain {
    return this.args.domain;
  }

  @action
  editDomain(): void {
    this.currentDomain.isEditing = !this.currentDomain.isEditing;
  }

  @action
  saveDomain(): void {
    this.currentDomain.isEditing = false;
    this.args.onSave(this.currentDomain);
  }

  @action
  cancelChanges(): void {
    this.currentDomain.isEditing = false;
    this.args.onCancelChanges(this.currentDomain);
  }
}
