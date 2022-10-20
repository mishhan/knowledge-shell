import { Variable } from "knowledge-shell/models";
import ConsultationStatus from "./consultation-status";

export type ConsultationState =
	| {
			Status: ConsultationStatus.Success;
	  }
	| {
			Status: ConsultationStatus.InProgress;
			Variable: Variable;
	  }
	| {
			Status: ConsultationStatus.Failed;
	  };
