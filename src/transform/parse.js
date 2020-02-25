import decompose, { identity } from "./decompose";

var svgNode;

export function parseCss(value) {
  const Matrix =
    typeof DOMMatrix === "function"
      ? DOMMatrix
      : typeof WebKitCSSMatrix === "function"
      ? WebKitCSSMatrix
      : MSCSSMatrix;
  const m = new Matrix(value + "");
  return m.isIdentity ? identity : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}

export function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode)
    svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}
