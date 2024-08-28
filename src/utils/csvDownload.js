import * as d3 from "d3";

export default function csvDownload(data) {
	const content = `data:text/csv;charset=utf-8,${d3.csvFormat(data)}`;
	return encodeURI(content);
}
