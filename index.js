var person = {
    name: '',
  };
  // 不能修改属性的值
  Object.defineProperty(person, "name",{
      writable: false,
      value: "okok"
  });
  console.log(person.name);   // "小生方勤"