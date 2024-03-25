import {Button} from "@/components/ui/button";
import {randomBytes} from "crypto";
import {join} from "path";
import {writeFile} from "fs/promises";
import HomePageCarousel from "@/components/home-page-carousel";


export default async function Home() {
    async function uploadAvatar(data: FormData) {
        "use server";

        const file: File | null = data.get("file") as unknown as File;

        if (!file) {
            throw new Error("No file uploaded");
        }

        // Валидация размера файла (например, не более 5 МБ)
        const MAX_SIZE = 5 * 1024 * 1024; // 5 МБ в байтах
        if (file.size > MAX_SIZE) {
            throw new Error("File is too large");
        }

        // Валидация типа файла (например, только изображения)
        const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];
        if (!ALLOWED_TYPES.includes(file.type)) {
            throw new Error("File type is not allowed");
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Проверка и обработка расширения файла
        const originalName = file.name;
        const extension = originalName.includes(".")
            ? originalName.split(".").pop()
            : "";
        if (!extension) {
            throw new Error("File has no extension");
        }

        // Генерация случайного имени файла
        const randomName = randomBytes(16).toString("hex");
        const filename = `${randomName}.${extension}`;
        const path = join('src/files', filename);

        await writeFile(path, buffer);
        console.log(`open ${path} to see the uploaded file`);

        return path;
    }


    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-24 pt-24">

            <HomePageCarousel/>

            <Button size="sm">Начать</Button>
        </main>
    );
}
