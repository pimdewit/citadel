/**
 * Resize the canvas.
 * @param gl The rendering context.
 * @param width Target width to resize the context to.
 * @param height Target height to resize the context to.
 * @param [affectGlViewport = true] Whether the rendering context should update
 *     with the new dimensions.
 */
export function resize(
  gl: WebGLRenderingContext,
  width = window.innerWidth * window.devicePixelRatio,
  height = window.innerHeight * window.devicePixelRatio,
  affectGlViewport = true
) {
  gl.canvas.width = width;
  gl.canvas.height = height;
  if (affectGlViewport) gl.viewport(0, 0, width, height);
}
