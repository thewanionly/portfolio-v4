import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { InputWithLabel } from '../InputWithLabel';

const formSchema = z.object({
  name: z.string(),
  email: z.string(), // TODO: add email validation
  subject: z.string(),
});

type ContactFormProps = { className?: string };

export const ContactForm = ({ className }: ContactFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col space-y-8', className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithLabel label="Name" id="name" placeholder="John Doe" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithLabel
                  label="Email"
                  id="email"
                  placeholder="johndoe@example.com"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputWithLabel
                  label="Subject"
                  id="subject"
                  type="subject"
                  placeholder="Job Opportunity"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="self-end" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
