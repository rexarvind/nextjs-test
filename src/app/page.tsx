import Image from 'next/image'
import { nanoid } from 'nanoid'

export default function Home() {
  return (
    <section className="px-4 py-4">
        <h1 className="text-4xl font-bold">Home</h1>
<h2>{ nanoid() }</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit amet sequi eius eaque, consequuntur itaque nihil placeat beatae cum non. Et maiores repellendus, aspernatur a vero blanditiis, cumque nemo praesentium!</p>
    </section>
  )
}
