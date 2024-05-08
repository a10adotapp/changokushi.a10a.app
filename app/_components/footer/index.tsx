import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function Footer() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Separator />

      <ul>
        <li>
          built by <Link href="https://twitter.com/a10adotapp">@a10adotapp</Link>
        </li>

        <li>
          all rights of images and game data are reserved by <Link href="https://changokushi.com/">©オカキチ</Link>
        </li>

        <li>
          the source code is available on <Link href="https://github.com/a10adotapp/changokushi.a10a.app">GitHub</Link>
        </li>
      </ul>
    </div>
  )
}
