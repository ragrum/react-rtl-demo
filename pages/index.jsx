import Head from "next/head";
import { LoginForm } from "../components/LoginForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>React Testing Library Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginForm />
    </>
  );
}
