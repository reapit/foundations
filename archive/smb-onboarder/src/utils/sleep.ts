const sleep = (time: number = 0) => new Promise(resolve => setTimeout(resolve, time))

export default sleep
