"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { sendMessage } from "@/lib/send-message";


const messageSchema = z.object({
  comment: z
    .string()

    .min(10, {
      message: "Должно быть не менее 10 символов.",
    })
    .max(160, {
      message: "Должно быть не более 160 символов.",
    }),
});

function MessageSend({
  id,
  userId,
 
}: {
  id: string;
  userId: string;
  
}) {
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  async function onSubmit(data: z.infer<typeof messageSchema>) {
    await sendMessage(id, data.comment, userId);

    form.reset();

    toast({
      variant: "success",
      title: "Ваше сообщение:",
      description: (
        <div className="flex flex-col gap-2">
          <span className="font-semibold">{data.comment}</span>
          <span>Успешно отправлено!</span>
        </div>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-2"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Добавьте ваше предложение"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Отправить</Button>
      </form>
    </Form>
  );
}

export default MessageSend;
