class Base {
  open(path: string) {
    // @ts-ignore
    browser.url(path)
  }
}

export default Base
