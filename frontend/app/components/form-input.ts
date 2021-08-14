import Component from "@glimmer/component";
import { action } from "@ember/object";

interface FormInputArgs {
  id: string;
  type: string;
  value: string | number | boolean;
  labelClass: string;
  labelText: string;
  inputClass: string;
  inputContainerClass: string;
  placeholder: string;
  disabled: boolean;
  isValid: boolean;
  isInValid: boolean;
  leftIconClass: string;
  leftIcon: string;
  rightIconClass: string;
  rightIcon: string;
  validationErrors: string[];
  onChange: (value: string) => void;
}

export default class FormInput extends Component<FormInputArgs> {
  get type(): string {
    return this.args.type || "text";
  }

  get labelClass(): string {
    return this.args.labelClass || "label";
  }

  get inputClass(): string {
    let defaultClass = "input";
    defaultClass += this.args.isValid ? " is-success" : "";
    defaultClass += this.args.isInValid ? " is-danger" : "";
    return this.args.inputClass || defaultClass;
  }

  get inputContainerClass(): string {
    let defaultClass = "control";
    defaultClass += this.args.leftIcon ? " has-icons-left" : "";
    defaultClass += this.rightIcon ? " has-icons-right" : "";
    return this.args.inputContainerClass || defaultClass;
  }

  get placeholder(): string {
    return this.args.placeholder || "";
  }

  get disabled(): boolean {
    return this.args.disabled || false;
  }

  get leftIconClass(): string {
    return this.args.leftIconClass || "icon is-small is-left";
  }

  get rightIcon(): string {
    let defaultIcon = this.args.isValid ? "check" : "";
    defaultIcon = this.args.isInValid ? "exclamation-circle" : defaultIcon;
    return this.args.rightIcon || defaultIcon;
  }

  get rightIconClass(): string {
    return this.args.rightIconClass || "icon is-small is-right";
  }

  @action
  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.args.onChange(target.value);
  }
}
