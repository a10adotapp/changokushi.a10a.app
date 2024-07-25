"use client";

import { useCallback } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useUserContext } from "@/components/user-context-provider";
import Link from "next/link";

export function Navbar() {
  const userContext = useUserContext();

  const numberFormat = Intl.NumberFormat();

  const signInButtonClick = useCallback(() => {
    signIn();
  }, []);

  return (
    <NavigationMenu className="p-3">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            ちゃんごくし推し投票
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-3 flex gap-2">
              <div className="flex justify-center items-center p-3">
                🫠
              </div>
              <div className="p-3 min-w-max">
                ちゃんごくし推し投票は推しの武将に投票できる<br />
                <Link href="https://changokushi.com/">「ちゃんごくし！」</Link>の非公式ウェブサービスです
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {`投票可能数: ${numberFormat.format(3 - userContext.likeCount)}`}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-3 flex gap-2">
              <div className="flex justify-center items-center p-3">
                💕
              </div>
              <div className="p-3 min-w-max">
                {userContext.hasSignedIn ? "投票可能数は１日３回までです" : "ログインすると投票することができます"}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {!userContext.hasSignedIn && (
          <NavigationMenuItem>
            <Button variant="link" onClick={signInButtonClick}>
              <NavigationMenuLink>
                ログイン
              </NavigationMenuLink>
            </Button>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
