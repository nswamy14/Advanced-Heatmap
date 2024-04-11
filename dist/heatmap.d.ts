import { BackgroundImageConfig, GradientElement, HearmapExData, HeatmapConfig, MappedGradient, Point, ShaderProgram, Translate } from "./types";
export declare class HeatmapRenderer {
    ctx: WebGL2RenderingContext | null;
    ratio: number;
    width: number;
    height: number;
    imageConfig: BackgroundImageConfig | null;
    configMin: number | null;
    configMax: number | null;
    min: number;
    max: number;
    hearmapExData: HearmapExData | {};
    gradShadOP: ShaderProgram;
    colorShadOP: ShaderProgram;
    imageShaOP: ShaderProgram;
    fbTexObj: WebGLTexture;
    fbo: WebGLFramebuffer;
    size: number;
    zoom: number;
    angle: number;
    intensity: number;
    translate: [number, number];
    opacity: number;
    gradient: MappedGradient | null;
    imageTexture: WebGLTexture | null;
    pLen: number | undefined;
    buffer: ArrayBuffer | undefined;
    buffer2: ArrayBuffer | undefined;
    private layer;
    private dom;
    private imgWidth;
    private imgHeight;
    private heatmapData;
    private type;
    constructor(container: string | HTMLElement, config: HeatmapConfig);
    resize(): void;
    clear(): void;
    setMax(max: number): HeatmapRenderer;
    setMin(min: number): HeatmapRenderer;
    setGradient(gradient: GradientElement[]): HeatmapRenderer;
    setTranslate(translate: Translate): this;
    setZoom(zoom: number): HeatmapRenderer;
    setRotationAngle(angle: number): HeatmapRenderer;
    setSize(size: number): HeatmapRenderer;
    setIntensity(intensity: number): HeatmapRenderer;
    setOpacity(opacity: number): HeatmapRenderer;
    setBackgroundImage(config: BackgroundImageConfig): this | undefined;
    clearData(): void;
    addData(data: Point[], transIntactFlag: boolean): HeatmapRenderer;
    renderData(data: Point[]): HeatmapRenderer;
    render(): void;
    projection(data: Point): {
        x: number;
        y: number;
    };
}
