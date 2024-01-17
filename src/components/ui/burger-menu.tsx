import { Button } from "@/components/ui/button"
import { FaBars } from 'react-icons/fa';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "../dark-mode-toggle";
import Link from "next/link";


export function BurgerMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button><FaBars/></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
        <div >
                
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                <SheetClose asChild>
                        <Link href="/create" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Разместить заказ</Link>
                    </SheetClose>
                    </li>
                    <li>
                    <SheetClose asChild>
                        <Link href="/allorders" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Все заказы</Link>
                    </SheetClose>
                    </li>
                    <li>
                    <SheetClose asChild>
                        <Link href="/myorders" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Мои заказы</Link>
                    </SheetClose>
                    </li>

                    <li>
                        <Link target="_blank" href="https://pravodoc.ru/" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Конструктор документов</Link>
                    </li>
                    
                    <li>
                    <SheetClose asChild>
                        <Link href="/profile" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Профиль</Link>
                    </SheetClose>
                    </li>
                </ul>
                
            </div>

            
        </SheetHeader>
        <div className="flex justify-end mt-6">
                <ModeToggle />

            </div>
       
      </SheetContent>
    </Sheet>
  )
}

export default BurgerMenu
