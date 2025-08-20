/**
 * Iterative traversal object/array, aman circular reference
 * @param {object|array} obj
 * @param {(key:string,value:any,path:string)=>boolean|void} cb
 */
export default function search(obj, cb) {
  if (!obj || typeof obj !== 'object') return;
  const visited = new WeakSet();
  const stack = [{ value: obj, path: '' }];

  while (stack.length) {
    const { value, path } = stack.pop();
    if (!value || typeof value !== 'object' || visited.has(value)) continue;
    visited.add(value);

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const v = value[i];
        const newPath = `${path}[${i}]`;
        const res = cb(String(i), v, newPath);
        if (res === false) return;
        if (v && typeof v === 'object') stack.push({ value: v, path: newPath });
      }
    } else {
      for (const k in value) {
        if (!Object.prototype.hasOwnProperty.call(value, k)) continue;
        const v = value[k];
        const newPath = path ? `${path}.${k}` : k;
        const res = cb(k, v, newPath);
        if (res === false) return;
        if (v && typeof v === 'object') stack.push({ value: v, path: newPath });
      }
    }
  }
}
