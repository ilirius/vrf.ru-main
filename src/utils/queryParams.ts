import { ReadonlyURLSearchParams } from 'next/navigation'

export const setQueryParam = (
  name: string,
  value: string | undefined,
  searchParams: ReadonlyURLSearchParams
) => {
  const params = new URLSearchParams(searchParams.toString())
  params.delete(name)
  if (value) {
    params.set(name, value)
  } else {
    params.delete(name)
  }
  return params.toString()
}
