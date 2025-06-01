import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { FC } from "react";
import { FaTelegram } from "react-icons/fa";

interface AddContactProps {
  contactForm: any; // Replace with your actual form type
  onCreateContact: (values: any) => void; // Replace with your actual values type
}

const AddContact: FC<AddContactProps> = ({ contactForm, onCreateContact }) => {

  return (
    <div className="h-screen flex z-40 relative">
      <div className="flex justify-center items-center z-50 w-full">
        <div className="flex flex-col items-center gap-4">
          <FaTelegram size={120} className="text-blue-500" />
          <h1 className="text-3xl font-spaceGrotesk font-bold">
            Add contacts to start chatting
          </h1>
          <Form {...contactForm}>
            <form
              onSubmit={contactForm.handleSubmit(onCreateContact)}
              className="space-y-2 w-full"
            >
              <FormField
                control={contactForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>Email</Label>
                    <FormControl>
                      <Input
                        placeholder="info@sammi.ac"
                        // disabled={isCreating}
                        className="h-10 bg-secondary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                size={"lg"}
                // disabled={isCreating}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
