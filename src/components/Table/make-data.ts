interface Person {
  firstName: string
  middleName: string
  lastName: string
}

const randomChar = () => {
  let r = Math.random()
    .toString(36)
    .substring(7)
  return r
}

const newPerson = () => {
  return {
    firstName: randomChar(),
    middleName: randomChar(),
    lastName: randomChar()
  }
}

export const makeData = (length: number) => {
  const data: Person[] = []
  for (let i = 0; i < length; i++) {
    const person = newPerson()
    data.push(person)
  }

  return data
}
