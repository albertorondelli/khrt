"use server"

import { Metadata } from "next"
import Store from "@modules/store/templates"
import { getServerState } from "react-instantsearch"
import { renderToString } from 'react-dom/server';

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

export default async function StorePage() {

  return <Store />
}

export async function getServerSideProps() {
  // const protocol = req.headers.referer?.split('://')[0] || 'https';
  // const serverUrl = `${protocol}://${req.headers.host}${req.url}`;
  const serverState = await getServerState(
    <Store />,
    { renderToString }
  );

  return {
    props: {
      serverState,
    },
  };
}