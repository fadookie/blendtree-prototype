import lt from 'lodash/lt';
import lte from 'lodash/lte';
import gt from 'lodash/gt';
import gte from 'lodash/gte';

const DEFAULT_EPSILON = 0.001;

export function approxEq(a, b, epsilon = DEFAULT_EPSILON) {
  return Math.abs(a - b) < epsilon;
}

function absGt(a, b, epsilon) {
  return Math.abs(a - b) > epsilon;
}

function approxOp(a, b, op, eq, epsilon) {
  return op(a - b, epsilon) && eq(a, b, epsilon);
}

export function approxLT(a, b, epsilon = DEFAULT_EPSILON) {
  return approxOp(a, b, lt, absGt, epsilon);
}

export function approxLTE(a, b, epsilon = DEFAULT_EPSILON) {
  return approxOp(a, b, lte, approxEq, epsilon);
}

export function approxGT(a, b, epsilon = DEFAULT_EPSILON) {
  return approxOp(a, b, gt, absGt, epsilon);
}

export function approxGTE(a, b, epsilon = DEFAULT_EPSILON) {
  return approxOp(a, b, gte, approxEq, epsilon);
}