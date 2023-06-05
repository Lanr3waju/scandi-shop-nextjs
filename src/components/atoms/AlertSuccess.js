export default function AlertSuccess({ children }) {
  return (
    <div className="alert alert-success fixed left-0 top-1 z-50 w-full rounded-sm p-3 text-center text-xl">
      <svg
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
      <span>{children}</span>
    </div>
  )
}
