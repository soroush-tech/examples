import { Suspense } from 'react'
import { AtOnce, Header, LatePart, Waiting } from '../../parts'

export const dynamic = 'force-dynamic'

// An async server component: the client part it renders arrives in a later chunk of the stream, and the
// registry sends the rules that are new with it.
async function Slow() {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return <LatePart />
}

export default function RegistryStreamPage() {
  return (
    <>
      <Header title="Registry, streamed" />
      <AtOnce />
      <Suspense fallback={<Waiting />}>
        <Slow />
      </Suspense>
    </>
  )
}
