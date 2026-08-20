import { notFound } from "next/navigation";

/**
 * Catch-all so unknown paths under a language render the branded 404
 * (inside the locale layout) instead of the framework default.
 */
export default function CatchAllPage() {
  notFound();
}
