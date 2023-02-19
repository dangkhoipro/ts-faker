import faker from "faker";

export const GeneratorLib = {
  string: faker.random.words,
  text: faker.lorem.text,
  number: faker.datatype.number,
  boolean: faker.datatype.boolean,
  datetime: faker.datatype.datetime,
  userName: faker.internet.userName,
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  fullName: faker.name.findName,
  price: faker.commerce.price,
  dynamicNumber: (option?: { min?: number; max?: number }) => faker.datatype.number(option),
  email: faker.internet.email,
  url: faker.internet.url,
  sentence: (wordCount?: number) => faker.lorem.sentence(wordCount),
  uuid: faker.datatype.uuid,
};
