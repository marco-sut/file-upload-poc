import { ReactElement } from 'react';
import FrontifyLogo from './assets/frontify-logo-nook-charcoal-on-offwhite-rgb-800x800.svg?react';
import { Card, FileUploadWidget } from './lib';

function Welcome(): ReactElement {
  return (
    <main className="relative isolate min-h-full">
      <img
        src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2FjY291bnRzXC82ZVwvNDAwMDM4OFwvcHJvamVjdHNcLzk4NFwvYXNzZXRzXC9iOFwvMTE1MjY1XC8xMjYwMTU0YzFhYmVmMDVjNjZlY2Q2MDdmMTRhZTkxNS0xNjM4MjU4MjQwLmpwZyJ9:weare:_kpZgwnGPTxOhYxIyfS1MhuZmxGrFCzP6ZW6dc-F6BQ?width=2400"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-top invisible sm:visible"
        role='presentation'
      />
      <div className='container mx-auto flex justify-center'>
        <Card headerContent={
          <>
            <FrontifyLogo className='max-w-24 sm:max-w-36' />
            <h2>Frontify file upload</h2>
          </>
        }>
          <FileUploadWidget />
        </Card>
      </div>
    </main>
  );
}

export default Welcome
