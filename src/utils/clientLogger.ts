export const clientLog = (message?: any, ...optionalParams: any[]) => {
  if (typeof window !== 'undefined' && false) {
    console.log(message, ...optionalParams)
  }
}
