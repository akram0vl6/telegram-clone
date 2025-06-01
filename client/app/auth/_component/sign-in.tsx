import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { formSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function SignIn() {
  const {setEmail, setStep} = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setEmail(values.email);
    setStep('verify');
  }

  return (
    <div className="w-full">
      <p className="text-gray-500 text-center  py-5">
        lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gmail</FormLabel>
                <FormControl>
                  <Input  placeholder="Akramov@email.com" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display gmail.
                </FormDescription>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default SignIn;
