import Vue from 'vue'
import JSExtender from '@/index'

Vue.use(JSExtender)

describe('Object.typeOf', () => {
  it('Should not be undefined', () => {
    const typeOf = Object.typeOf;
    console.log("Object.typeOf: ", typeOf);

    expect(typeOf).not.toBeUndefined();
  });

  it('Result should be object', () => {
    const typeOf = Object.typeOf;
    let result = !!typeOf ? typeOf({}) : null;
    expect(result).toEqual("object");
  });
})
