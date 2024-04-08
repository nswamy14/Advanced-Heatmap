import { ColorShader, GradShader, ImageShader } from "../shaders";
import { ShaderProgram } from "../types";

export function createShader(
  ctx: WebGLRenderingContext,
  type: "VERTEX_SHADER" | "FRAGMENT_SHADER",
  src: string
): WebGLShader {
  var shader = ctx.createShader(ctx[type]);

  if (!shader) {
    throw new Error("Failed to create shader.");
  }

  ctx.shaderSource(shader, src);
  ctx.compileShader(shader);
  var compiled = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);
  if (!compiled) {
    var lastError = ctx.getShaderInfoLog(shader);
    ctx.deleteShader(shader);
    throw new Error("*** Error compiling shader '" + shader + "':" + lastError);
  }
  return shader;
}

export function createProgram(
  ctx: WebGLRenderingContext,
  shader: { vertex: string; fragment: string }
): WebGLProgram {
  var vshader = createShader(ctx, "VERTEX_SHADER", shader.vertex);
  var fshader = createShader(ctx, "FRAGMENT_SHADER", shader.fragment);

  var program = ctx.createProgram();

  if (!program) {
    throw new Error("Failed to create program.");
  }

  ctx.attachShader(program, vshader);
  ctx.attachShader(program, fshader);
  ctx.linkProgram(program);

  var linked = ctx.getProgramParameter(program, ctx.LINK_STATUS);
  if (!linked) {
    var lastError = ctx.getProgramInfoLog(program);
    ctx.deleteProgram(program);
    throw new Error("Error in program linking:" + lastError);
  } else {
    return program;
  }
}

export function createImageShader(ctx: WebGLRenderingContext): ShaderProgram {
  var program = createProgram(ctx, ImageShader);

  const positionBuffer = ctx.createBuffer();
  if (!positionBuffer) {
    throw new Error("Failed to create position buffer.");
  }
  const texCoordBuffer = ctx.createBuffer();
  if (!texCoordBuffer) {
    throw new Error("Failed to create texture coordinate buffer.");
  }

  return {
    program: program,
    attr: [
      {
        bufferType: ctx.ARRAY_BUFFER,
        buffer: positionBuffer,
        drawType: ctx.STATIC_DRAW,
        valueType: ctx.FLOAT,
        size: 2,
        attribute: ctx.getAttribLocation(program, "a_position"),
        data: new Float32Array([]),
      },
      {
        bufferType: ctx.ARRAY_BUFFER,
        buffer: texCoordBuffer,
        drawType: ctx.STATIC_DRAW,
        valueType: ctx.FLOAT,
        size: 2,
        attribute: ctx.getAttribLocation(program, "a_texCoord"),
        data: new Float32Array([
          0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
        ]),
      },
    ],
    uniform: {
      u_resolution: ctx.getUniformLocation(program, "u_resolution"),
      u_image: ctx.getUniformLocation(program, "u_image"),
      u_translate: ctx.getUniformLocation(program, "u_translate"),
      u_zoom: ctx.getUniformLocation(program, "u_zoom"),
      u_angle: ctx.getUniformLocation(program, "u_angle"),
      u_density: ctx.getUniformLocation(program, "u_density"),
    },
  };
}

export function createGradiantShader(
  ctx: WebGLRenderingContext
): ShaderProgram {
  var program = createProgram(ctx, GradShader);

  const positionBuffer = ctx.createBuffer();
  if (!positionBuffer) {
    throw new Error("Failed to create position buffer.");
  }
  const intensityBuffer = ctx.createBuffer();
  if (!intensityBuffer) {
    throw new Error("Failed to create intensity buffer.");
  }
  return {
    program: program,
    attr: [
      {
        bufferType: ctx.ARRAY_BUFFER,
        buffer: positionBuffer,
        drawType: ctx.STATIC_DRAW,
        valueType: ctx.FLOAT,
        size: 2,
        attribute: ctx.getAttribLocation(program, "a_position"),
        data: new Float32Array([]),
      },
      {
        bufferType: ctx.ARRAY_BUFFER,
        buffer: intensityBuffer,
        drawType: ctx.STATIC_DRAW,
        valueType: ctx.FLOAT,
        size: 1,
        attribute: ctx.getAttribLocation(program, "a_intensity"),
        data: new Float32Array([]),
      },
    ],
    uniform: {
      u_resolution: ctx.getUniformLocation(program, "u_resolution"),
      u_max: ctx.getUniformLocation(program, "u_max"),
      u_min: ctx.getUniformLocation(program, "u_min"),
      u_size: ctx.getUniformLocation(program, "u_size"),
      u_intensity: ctx.getUniformLocation(program, "u_intensity"),
      u_translate: ctx.getUniformLocation(program, "u_translate"),
      u_zoom: ctx.getUniformLocation(program, "u_zoom"),
      u_angle: ctx.getUniformLocation(program, "u_angle"),
      u_density: ctx.getUniformLocation(program, "u_density"),
    },
  };
}

export function createColorShader(ctx: WebGLRenderingContext): ShaderProgram {
  var program = createProgram(ctx, ColorShader);

  const texCoordBuffer = ctx.createBuffer();
  if (!texCoordBuffer) {
    throw new Error("Failed to create texture coordinate buffer.");
  }
  return {
    program: program,
    attr: [
      {
        bufferType: ctx.ARRAY_BUFFER,
        buffer: texCoordBuffer,
        drawType: ctx.STATIC_DRAW,
        valueType: ctx.FLOAT,
        size: 2,
        attribute: ctx.getAttribLocation(program, "a_texCoord"),
        data: new Float32Array([
          0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
        ]),
      },
    ],
    uniform: {
      u_framebuffer: ctx.getUniformLocation(program, "u_framebuffer"),
      u_colorArr: ctx.getUniformLocation(program, "u_colorArr"),
      u_colorCount: ctx.getUniformLocation(program, "u_colorCount"),
      u_opacity: ctx.getUniformLocation(program, "u_opacity"),
      u_offset: ctx.getUniformLocation(program, "u_offset"),
    },
  };
}
