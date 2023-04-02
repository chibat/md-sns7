import { UnknownPageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <>
      <Head>
        <title>Not Found - md-sns</title>
      </Head>
      <main class="container">
        404 Not Found
      </main>
    </>);
}
