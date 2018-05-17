import { around } from './';

const requestHandler = (key: keyof Reader) =>
  function(arg: any) {
    if (!arg) {
      this[key] = true;
    }
    if (arg instanceof Promise) {
      arg.then(() => (this[key] = false));
    }
  };

class Reader {
  isLoading: boolean = false;

  @around(requestHandler('isLoading'))
  read() {
    console.log(this.isLoading);
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(this.isLoading);
      }, 1001);
      setTimeout(resolve, 1000);
    });
  }
}

new Reader().read();
