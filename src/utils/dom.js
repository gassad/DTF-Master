export function createElement(tagName, { className, textContent, attributes = {} } = {}) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  return element;
}
