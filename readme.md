# type-assert

> The utility which is used to assert a variable&#39;s type

## Build Setup

``` bash
# install dependencies
npm install

# start development server for debug
npm run dev

# build in production
npm run build
```

## Install

```bash
npm install --save roy-type-assert
```

## Usage

```javascript
import { VariableType, getType, isNullOrUndefined, isStringEmpty, getFloatInfo, isPrimitiveType } from 'roy-type-assert';

getType(10) === VariableType.bNumber;
isNullOrUndefined(undefined) === true;
isNullOrUndefined(null) === true;
isStringEmpty('') === true;
isPrimitiveType(5) === true;
let { isNumber, isFloat, pointRightCount } = getFloatInfo(1.53);
```

## Options

### VariableType

  Enum Value | Data Type
  ----|----
  bUndefined | undefined
  bNull | null
  bNumber | number
  bBoolean | boolean
  bString | string
  bFunction | function
  bRegExp | regexp
  bArray | array
  bDate | date
  bError | error
  bNode | node
  bElement | element
  bDocument | document
  bArraylist | arraylist
  bObject | object

## API Reference

### getType API signature

```typescript
function getType(obj: any): VariableType;
```

### isPrimitiveType API signature

```typescript
function isPrimitiveType(o: any): boolean;
```

### isNullOrUndefined API signature

```typescript
function isNullOrUndefined(v: any): boolean;
```

### isStringEmpty API signature

```typescript
function isStringEmpty(str: any): boolean;
```

### getFloatInfo API signature

```typescript
function getFloatInfo(n: number): {
  isNumber: boolean;
  isFloat: boolean;
  pointRightCount: number;
};
```

## Type Guards

```typescript
function isFunction(o: any): boolean;
function isUndefined(o: any): o is undefined;
function isNull(o: any): o is null;
function isNumber(o: any): o is number;
function isBoolean(o: any): o is boolean;
function isString(o: any): o is string;
function isArray<T>(o: any): o is Array<T>;
function isDate(o: any): o is Date;
```
