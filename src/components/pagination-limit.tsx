"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

function PaginationLimits() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [position, setPosition] = useState("15");
 

  function createQueryString(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    return params.toString();
  }

  useEffect(() => {

   
    
      router.push(
        `${pathname}?${createQueryString("limit", position)}`
      );
    
  
  }, [position]);

  





  return (
  
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Показывать по {position}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Количество заказов на страницы</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="15">
              Показывать по 15
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="25">
              Показывать по 25
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="50">
              Показывать по 50
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="75">
              Показывать по 75
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

  
  );
}

export default PaginationLimits;
