"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";


import { getSession, signOut } from "next-auth/react";

const AccountDeleteButton = () => {
  async function clearSession() {
    const session = await getSession();
    const deleteUser = await fetch("api/delete-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session?.user?.email),
    });

    await signOut({callbackUrl: '/'});
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="border-red-500 text-red-500 hover:text-white hover:border-bg-destructive hover:bg-destructive"
          variant="outline"
        >
          Удалить аккаунт
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удалить аккаунт</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить свой аккаунт? Это действие
            необратимо.
          </DialogDescription>
        </DialogHeader>

        <Button onClick={clearSession} variant="destructive" type="submit">
          Применить
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AccountDeleteButton;
