const EmailVerify = () => {
  return (
    <div className="max-w-sm flex flex-col items-center">
      <div>
        <h1 className="text-large-semi text-center uppercase mb-6">
          Email verification
        </h1>
        <p className="text-center text-base-regular text-ui-fg-subtle mb-8">
          We&apos;ve just sent you an email to the address linked with your account.
        </p>
        <p className="text-center text-base-regular text-ui-fg-subtle mb-8">
          Click on the link inside to complete the activation of your account.
        </p>
        <p className="text-center text-base-regular text-ui-fg-subtle mb-8">
          If you can&apos;t locate it in your inbox, please wait a few minutes or
          check your spam folder.
        </p>
      </div>
    </div>
  )
}

export default EmailVerify
