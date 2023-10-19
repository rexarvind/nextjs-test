import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="px-4 py-4">
        <div className="max-w-md mx-auto py-4 px-3 text-center rounded-md shadow-sm bg-white">
          <h1 className="text-xl font-bold mb-4">404 - Page Not Found</h1>
          <p>Could not find requested resource</p>
          <Link href="/">Return Home</Link>
        </div>
    </section>
  )
}
