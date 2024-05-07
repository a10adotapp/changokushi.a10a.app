"use client";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useUserContext } from "@/components/user-context-provider";

export function Navbar() {
  const userContext = useUserContext();

  const numberFormat = Intl.NumberFormat();

  return (
    <NavigationMenu className="p-3">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {`投票可能数: ${numberFormat.format(3 - userContext.likeCount)}`}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[80vw]">
            <div className="p-3 flex gap-2">
              <div className="flex justify-center items-center p-3">
                💕
              </div>
              <div className="p-3">
                投票可能数は１日３回までです。
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
