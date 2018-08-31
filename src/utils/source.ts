import { env } from 'utils/env'

export default function source(img: string | null) {
  if (!img) {
    return ''
  }

  return env({
    dev: `https://localhost:8001/image/${img}`,
    stage: `https://{image-endpoint}/image/${img}`,
    prod: `https://{image-endpoint}/image/${img}`
  })
}
