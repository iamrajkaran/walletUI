import {
    isEmpty,
    isNil,
    converge,
    or,
} from 'ramda';

export const isEmptyOrNil = converge(or, [isEmpty, isNil]);
