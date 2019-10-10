import { default as format } from "date-fns/format";

export default (dateString: string): string => {
    return format(new Date(dateString), "MMMM D, YYYY");
};
