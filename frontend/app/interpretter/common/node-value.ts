import { DomainValueNumber, DomainValueString } from "knowledge-shell/models";

enum ValueType {
	Number = 1,
	String = 2,
	Boolean = 3,
}

type NumberType = DomainValueNumber | number;
type StringType = DomainValueString | string;

type NodeValue =
	| {
			Type: ValueType.Number;
			NodeValue: NumberType;
			Value: number;
	  }
	| {
			Type: ValueType.String;
			NodeValue: StringType;
			Value: string;
	  }
	| {
			Type: ValueType.Boolean;
			NodeValue: boolean;
			Value: boolean;
	  };

export { ValueType, NumberType, StringType, NodeValue };
