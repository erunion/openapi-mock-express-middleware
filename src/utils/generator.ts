import jsf, { JSF, JSFOptions } from 'json-schema-faker';
import faker from 'faker';

export { JSONSchema, JSFOptions, JSF } from 'json-schema-faker';

const defaultOptions = {
  optionalsProbability: 0.5,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleExamples = (value: any): any => {
  if (typeof value === 'object' && value !== null && Object.keys(value).length) {
    return value[Object.keys(value)[0]].value;
  }

  return '';
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export const createGenerator: (locale?: string, options?: Partial<JSFOptions>) => JSF = (
  locale = 'en',
  options = defaultOptions
) => {
  jsf.option({
    ...defaultOptions,
    ...options,
  });

  jsf.extend('faker', () => {
    faker.locale = locale;
    return faker;
  });

  jsf.define('example', (value) => {
    return value;
  });

  jsf.define('examples', handleExamples);

  return jsf;
};
