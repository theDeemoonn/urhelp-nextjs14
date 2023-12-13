import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import User from "@/models/user";
import { IUser } from "@/types/IUser";
import { getServerSession } from "next-auth/next";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { revalidatePath } from "next/cache";

const ProfileEditModal = async () => {
  const session = await getServerSession();

  async function getUser() {
    "use server";
    const user: IUser | null = await User.findOne({
      email: session?.user?.email,
    });

    if (user) {
      return user;
    }
    return null;
  }

  const user = await getUser();

  async function updateUser(data: FormData) {
    "use server";
    const { surname, name, phone, email, description } =
      Object.fromEntries(data);
    const user: IUser | null = await User.findOneAndUpdate(
      { email: session?.user?.email },
      { surname, name, phone, email, description }
    ).lean();
    revalidatePath("/profile");
  }

  return (
    <Dialog>
        <DialogTrigger asChild>
        <Button >Редактировать профиль</Button>
      </DialogTrigger>
      <DialogContent>
      <DialogHeader>
          <DialogTitle>Редактирование профиля</DialogTitle>
         
        </DialogHeader>
        <form action={updateUser} className="space-y-8 mt-6">
          <Input
            placeholder="Фамилия"
            name="surname"
            defaultValue={user?.surname}
          />
          <Input placeholder="Имя" name="name" defaultValue={user?.name} />
          <Input
            placeholder="Телефон"
            name="phone"
            defaultValue={user?.phone}
          />
          <Input placeholder="Email" name="email" defaultValue={user?.email} />
          <Input
            placeholder="Описание"
            name="description"
            defaultValue={user?.description}
          />

          <Button type="submit">Применить</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;
