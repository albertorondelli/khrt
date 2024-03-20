const ErrorMessage = ({ error }: { error?: string | null }) => {
// TODO: Should add here translation for errors, but some messages contains variables I can't translate.
// Maybe we should make error an Object and not a string, then pass key and variables.
  
  if (!error) {
    return null
  }

  return (
    <div className="pt-2 text-ui-fg-error text-small-regular">
      <span>{error}</span>
    </div>
  )
}

export default ErrorMessage
