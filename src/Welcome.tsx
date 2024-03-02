import {ReactElement} from 'react'

function Welcome(): ReactElement {

  return (
      <main className="relative isolate min-h-full">
          <img
              src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2FjY291bnRzXC82ZVwvNDAwMDM4OFwvcHJvamVjdHNcLzk4NFwvYXNzZXRzXC9iOFwvMTE1MjY1XC8xMjYwMTU0YzFhYmVmMDVjNjZlY2Q2MDdmMTRhZTkxNS0xNjM4MjU4MjQwLmpwZyJ9:weare:_kpZgwnGPTxOhYxIyfS1MhuZmxGrFCzP6ZW6dc-F6BQ?width=2400"
              alt=""
              className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl">Hello there</h1>
              <p className="mt-4 text-base text-gray-900 sm:mt-6">Everything brand starts small, let's build something great.</p>
          </div>
      </main>

  )
}

export default Welcome
