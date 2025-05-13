import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { InputWithLabel } from '../InputWithLabel';
import { TextAreaWithLabel } from '../TextAreaWithLabel';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

type ContactFormProps = { className?: string };

export const ContactForm = ({ className }: ContactFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  console.log('### errors', form.formState.errors);

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
            <FormItem className="relative">
              <FormControl>
                <InputWithLabel
                  label="Name"
                  id="name"
                  placeholder="John Doe"
                  hasError={Boolean(errors.name)}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-end absolute -bottom-6 right-0" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <InputWithLabel
                  label="Email"
                  id="email"
                  placeholder="johndoe@example.com"
                  hasError={Boolean(errors.email)}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-end absolute -bottom-6 right-0" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <InputWithLabel
                  label="Subject"
                  id="subject"
                  type="subject"
                  placeholder="Job Opportunity"
                  hasError={Boolean(errors.subject)}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-end absolute -bottom-6 right-0" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <TextAreaWithLabel
                  label="Message"
                  id="message"
                  type="message"
                  placeholder="Hello. I am looking for a Software Engineer."
                  rows={4}
                  hasError={Boolean(errors.message)}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-end absolute -bottom-6 right-0" />
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
