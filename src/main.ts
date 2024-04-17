import { Heatmap } from "./heatmap";
import { HeatmapConfig } from "./types";

export default function (context: string | HTMLElement, config: HeatmapConfig) {
	return new Heatmap(context, config);
}