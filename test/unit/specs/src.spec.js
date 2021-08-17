import Vue from 'vue'
import JSExtender from '@/index'

Vue.use(JSExtender)

describe('JSExtender', () => {
  it('Test call Object.typeOf', () => {
    let result = Object.typeOf({});

    console.log("Test call Object.typeOf result: ", result);
    expect(result).toEqual("object");
  });

  it('Test call Object.valueEquals', () => {
    let objA = {
      name: "Test1",
      value: 1,
      desc: "Test 1"
    };
    objA._originalData = Object.clone(objA);
    let result = Object.valueEquals(objA, objA._originalData, {
      exceptFields: ["_originalData"]
    });

    console.log("Test call Object.valueEquals result: ", result);
    expect(result).toEqual(true);
  });

  it('Test call String.prototype.toPascalCase', () => {
    expect(String.toPascalCase('foo bar')).toEqual('FooBar');
    expect(String.toPascalCase('Foo Bar')).toEqual('FooBar');
    expect(String.toPascalCase('FooBar')).toEqual('FooBar');
    expect(String.toPascalCase('--foo-bar--')).toEqual('FooBar');
    expect(String.toPascalCase('__FOO_BAR__')).toEqual('FooBar');
    expect(String.toPascalCase('FOOBAR')).toEqual('Foobar');
    expect(String.toPascalCase('FOO_BAR')).toEqual('FooBar');
    expect(String.toPascalCase('fooBAR')).toEqual('FooBAR');
    expect(String.toPascalCase('fooBar')).toEqual('FooBar');
    expect(String.toPascalCase('fooBar', {
      specificPrefix: "FOO"
    })).toEqual('FOOBar');
    expect(String.toPascalCase('FOObar')).toEqual('FOObar');
    expect(String.toPascalCase('!--foo-¿?-BAR--121-**%')).toEqual('FooBar121');
    expect(String.toPascalCase('!--foo-¿?-BAR--121-**%', {
      keepOtherChar: true
    })).toEqual('!Foo¿?Bar121**%');
    expect(String.toPascalCase('FOO你好bar')).toEqual('FooBar');
    expect(String.toPascalCase('FOO你好bar', {
      keepOtherChar: true
    })).toEqual('Foo你好Bar');
  });

  it('Test call Array.prototype.contains', () => {
    const dataList = [{
        key: "test1",
        value: 1,
        desc: "Test1"
      },
      {
        key: "test2",
        value: 2,
        desc: "Test2"
      },
      {
        key: "test3",
        value: 3,
        desc: "Test3"
      },
    ];

    expect(dataList.contains(dataList[0])).toBeTruthy();
    expect(dataList.contains({
      key: "test1",
      value: 1,
      desc: "Test1"
    })).toBeFalsy();
    expect(dataList.contains("test2", (item, value) => item.key === value)).toBeTruthy();
    expect(dataList.contains("test3", "key")).toBeTruthy();
  });

  it('Test call Array.prototype.findObjPropValue', () => {
    const dataList = [{
        key: "test1",
        value: 1,
        desc: "Test1"
      },
      {
        key: "test2",
        value: 2,
        desc: "Test2"
      },
      {
        key: "test3",
        value: 3,
        desc: "Test3"
      },
    ];

    expect(dataList.findObjPropValue({
      key: "test2"
    }, "value")).toEqual(2);
    expect(dataList.findObjPropValue((item) => item.value === 3, "desc")).toEqual("Test3");
  });
})
