import Vue from 'vue'
import JSExtender from '@/index'

describe('index.js', () => {
  it('should install correct', () => {
    Vue.use(JSExtender);

    const typeOf = Object.typeOf;
    console.log("Object.typeOf: ", typeOf);

    expect(typeOf).not.toBeUndefined();
  });
})
