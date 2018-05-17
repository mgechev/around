export interface AroundCallback {
  (result?: any): any;
}

export const around = (callback: AroundCallback): MethodDecorator => <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> => {
  let original = (target as any)[propertyKey];
  return {
    configurable: true,
    get() {
      const isFunction = typeof original === 'function';
      if (isFunction) {
        return (...args: any[]) => {
          callback.call(this);
          callback.call(this, original.apply(this, args));
        };
      }
      callback.call(this);
      callback.call(this, original);
      return original;
    },
    set(value: T) {
      original = value;
    }
  };
};
