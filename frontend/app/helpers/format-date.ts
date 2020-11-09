import { helper } from "@ember/component/helper";
import { format } from "date-fns";

export function formatDate([date, dateFormat]: [Date, string]): string {
  return format(date, dateFormat);
}

export default helper(formatDate);
