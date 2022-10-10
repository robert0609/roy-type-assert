import { VariableType } from './typeDefination';

const class2type: Map<string, VariableType> = new Map();
class2type.set('undefined', VariableType.bUndefined);
class2type.set('number', VariableType.bNumber);
class2type.set('boolean', VariableType.bBoolean);
class2type.set('string', VariableType.bString);
class2type.set('function', VariableType.bFunction);
class2type.set('[object Boolean]', VariableType.bBoolean);
class2type.set('[object Number]', VariableType.bNumber);
class2type.set('[object String]', VariableType.bString);
class2type.set('[object Function]', VariableType.bFunction);
class2type.set('[object RegExp]', VariableType.bRegExp);
class2type.set('[object Array]', VariableType.bArray);
class2type.set('[object Date]', VariableType.bDate);
class2type.set('[object Error]', VariableType.bError);
const coreToString = Object.prototype.toString;

/**
 * 判断是否是类数组类型
 * @param {Boolean}
 */
function isArrayList(obj: any) {
  /* Real arrays are array-like
			if (obj instanceof Array)
			{
			return true;
			}*/
  // Arrays must have a length property
  if (!('length' in obj)) {
    return false;
  }
  // Length must be a number
  if (typeof obj.length !== 'number') {
    return false;
  }
  // and nonnegative
  if (obj.length < 0) {
    return false;
  }
  if (obj.length > 0) {
    // If the array is nonempty, it must at a minimum
    // have a property defined whose name is the number length-1
    if (!(obj.length - 1 in obj)) {
      return false;
    }
  }
  return true;
}

/**
 * 判断参数的类型
 * @param obj
 * @returns {Type}
 */
export function getType(obj: any): VariableType {
  let ty: string = typeof obj;
  let rt = class2type.get(ty);
  if (rt !== undefined) {
    return rt;
  }
  if (obj === null) {
    return VariableType.bNull;
  }
  ty = coreToString.call(obj);
  rt = class2type.get(ty);
  if (rt !== undefined) {
    return rt;
  } else if (obj instanceof Element) {
    return VariableType.bElement;
  } else if (obj instanceof Document) {
    return VariableType.bDocument;
  } else if (obj instanceof Node) {
    return VariableType.bNode;
  } else if (isArrayList(obj)) {
    return VariableType.bArraylist;
  } else {
    return VariableType.bObject;
  }
}

/**
 * 判断参数是否是原始类型
 */
export function isPrimitiveType(o: any) {
  return 'undefined,number,boolean,string'.indexOf(typeof o) >= 0;
}

/**
 * 判断一个变量是否未定义或者为空
 * @param v
 */
export function isNullOrUndefined(v: any) {
  if (v === undefined) {
    return true;
  }
  return v === null;
}

/**
 * 判断字符串是否为空或者未定义或者空字符串
 * @param str
 * @returns {Boolean}
 */
export function isStringEmpty(str: any) {
  const ty = getType(str);
  if (ty === VariableType.bUndefined || ty === VariableType.bNull) {
    return true;
  }
  if (ty !== VariableType.bString) {
    throw new Error('Parameter is not a string!');
  }
  if (!isPrimitiveType(str)) {
    return str.valueOf() === '';
  } else {
    return str === '';
  }
}

/**
 * 判断数字是否是浮点型，并返回小数位数等信息
 * @returns { isNumber: Boolean, isFloat: Boolean, pointRightCount: Number }
 */
export function getFloatInfo(n: number) {
  const ret = {
    isNumber: false,
    isFloat: false,
    pointRightCount: 0
  };
  if (isNaN(n)) {
    return ret;
  }
  ret.isNumber = true;
  const strN = n.toString();
  const pInt = parseInt(strN);
  const pFloat = parseFloat(strN);
  if (pInt === pFloat) {
    return ret;
  }
  ret.isFloat = true;
  ret.pointRightCount = strN.length - 1 - strN.indexOf('.');
  return ret;
}

/**
 * 判断参数是否是一个函数
 */
export function isFunction(o: any) {
  return getType(o) === VariableType.bFunction;
}

//#region 常用的类型断言器
export function isUndefined(o: any): o is undefined {
  return getType(o) === VariableType.bUndefined;
}

export function isNull(o: any): o is null {
  return getType(o) === VariableType.bNull;
}

export function isNumber(o: any): o is number {
  return getType(o) === VariableType.bNumber;
}

export function isBoolean(o: any): o is boolean {
  return getType(o) === VariableType.bBoolean;
}

export function isString(o: any): o is string {
  return getType(o) === VariableType.bString;
}

export function isArray<T>(o: any): o is Array<T> {
  return getType(o) === VariableType.bArray;
}

export function isDate(o: any): o is Date {
  return getType(o) === VariableType.bDate;
}

export function isPromise<T>(o: any): o is Promise<T> {
  return o && typeof o.then === 'function' && typeof o.catch === 'function';
}
//#endregion

export { VariableType };
