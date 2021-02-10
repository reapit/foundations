export const initializeEditor = () => {
  return new Promise(resolve => {
    return resolve({
      DomComponents: {
        addType: jest.fn(),
        getType: () => ({
          model: {
            extend: jest.fn(),
            prototype: {
              defaults: {},
            },
          },
          view: {
            extend: jest.fn(),
          },
        }),
      },
      BlockManager: {
        add: jest.fn(),
      },
    })
  })
}
