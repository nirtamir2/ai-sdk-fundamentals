import { Link } from "@/components/link";

export default function Page() {
  return (
    <main className="space-y-4">
      <h1 className="text-xl font-semibold">Vercel AI SDK Fundamentals</h1>
      <p>
        The following examples aim to showcase the fundamentals behind the
        Vercel AI SDK. The examples have minimal loading states to remain as
        simple as possible.
      </p>
      <p>
        The prompt for the first 4 examples (stream/generate text/object) is
        `Tell me a joke`.
      </p>
      <ul className="list-inside list-disc">
        <li>
          <Link href="/examples/generate-text">Generate Text</Link>
        </li>
        <li>
          <Link href="/examples/stream-text">Stream Text</Link>
        </li>
        <li>
          <Link href="/examples/generate-object">Generate Object</Link>
        </li>
        <li>
          <Link href="/examples/stream-object">Stream Object</Link>
        </li>
        <li>
          <Link href="/examples/tools/basic">Basic Tool</Link>
        </li>
        <li>
          <Link href="/examples/basic-chatbot">Chatbot with `useChat`</Link>
        </li>
        <li>
          <Link href="/examples/generate-ui-streamui">Generate UI</Link>
        </li>
      </ul>
    </main>
  );
}
