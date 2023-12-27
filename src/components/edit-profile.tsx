import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import User from "@/models/user";
import { IUser } from "@/types/IUser";
import { getServerSession } from "next-auth/next";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { revalidatePath } from "next/cache";
import { Label } from "./ui/label";
import { randomBytes } from "crypto";
import { join } from "path";
import { writeFile } from "fs/promises";
import { promises as fsPromises } from "fs";

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
    const file: File | null = data.get("file") as unknown as File;

    let pathToDb = user?.avatar;

    if (file && file.size > 0) {
      // Валидация размера файла ( не более 5 МБ)
      const MAX_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        throw new Error("Файл слишком большой");
      }

      // Валидация типа файла (только изображения)
      const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];
      if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error("Недопустимый тип файла");
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Проверка и обработка расширения файла
      const originalName = file.name;
      const extension = originalName.includes(".")
        ? originalName.split(".").pop()
        : "";
      if (!extension) {
        throw new Error("Файл не имеет расширения");
      }

      // Генерация случайного имени файла
      const randomName = randomBytes(16).toString("hex");
      const filename = `${randomName}.${extension}`;

      const directoryPath = process.env.FILE_STORAGE_PATH!;

      if (directoryPath) {
        // Проверяем наличие папки
        const isDirectoryExists = await fsPromises
          .access(directoryPath)
          .then(() => true)
          .catch(() => false);

        // Если папки нет, то создаем ее
        if (!isDirectoryExists) {
          await fsPromises.mkdir(directoryPath, { recursive: true });
        }
      }
      const path = join(directoryPath, filename);

      await writeFile(path, buffer);

      pathToDb = path.replace("public", "");
    }

    const { surname, name, phone, email, description } =
      Object.fromEntries(data);
    const userDB: IUser | null = await User.findOneAndUpdate(
      { email: session?.user?.email },
      {
        surname,
        name,
        phone,
        email,
        description,
        avatar: pathToDb,
      }
    ).lean();
    revalidatePath("/profile");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Редактировать профиль</Button>
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
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="avatar">Аватар пользователя</Label>
            <Input name="file" id="avatar" type="file" />
          </div>

          <Button type="submit">Применить</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;
