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

function PaginationLimits({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [position, setPosition] = useState("15");
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));

  function createQueryString(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    return params.toString();
  }

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;

  useEffect(() => {
    router.replace(
      pathname +
        "?" +
        createQueryString("limit", position.toString()) +
        "&" +
        createQueryString("page", page.toString())
    );
  }, [position]);

  return (
    <div className="flex flex-col items-center justify-center">
      <DropdownMenu >
        <DropdownMenuTrigger  asChild>
          <Button  variant="outline">Показывать по {position}</Button>
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

      <div className="flex mt-4">
        <Button className="mr-2"
          disabled={prevPage === page}
          variant="outline"
          onClick={() => {
            setPage(prevPage);
            router.replace(
              pathname +
                "?" +
                createQueryString("limit", position.toString()) +
                "&" +
                createQueryString("page", prevPage.toString())
            );
          }}
        >
          Назад
        </Button>
        <Button
          disabled={nextPage === totalPages}
          variant="outline"
          onClick={() => {
            setPage(nextPage);
            router.replace(
              pathname +
                "?" +
                createQueryString("limit", position.toString()) +
                "&" +
                createQueryString("page", nextPage.toString())
            );
          }}
        >
          Вперед
        </Button>
      </div>
    </div>
  );
}

export default PaginationLimits;
