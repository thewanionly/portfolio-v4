import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';
import { InputWithLabel } from '../InputWithLabel';
import { TextAreaWithLabel } from '../TextAreaWithLabel';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
  _gotcha: z.string(), // Honeypot field
});

type ContactFormProps = { className?: string };

enum SubmitStatus {
  Idle = 'idle',
  Submitting = 'submitting',
  Success = 'success',
  Error = 'error',
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwdbyjq';

export const ContactForm = ({ className }: ContactFormProps) => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(SubmitStatus.Idle);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isSubmitting = submitStatus === SubmitStatus.Submitting;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      _gotcha: '',
    },
  });

  const {
    formState: { errors },
    reset,
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitStatus(SubmitStatus.Submitting);
    setSubmitError(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }

      setSubmitStatus(SubmitStatus.Success);
      toast.success('Thanks for reaching out! I’ll get back to you soon.');

      reset();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setSubmitStatus(SubmitStatus.Error);
      setSubmitError(err?.message);
      toast.error('Oops, something went wrong. Please try again or you can email me directly.');
    }
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
            <FormItem className="relative">
              <FormControl>
                <InputWithLabel
                  label="Name"
                  id="name"
                  placeholder="John Doe"
                  hasError={Boolean(errors.name)}
                  {...field}
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage className="text-end absolute -bottom-6 right-0" />
            </FormItem>
          )}
        />
        {/* Honeypot field (https://help.formspree.io/hc/en-us/articles/360013580813-Honeypot-spam-filtering) */}
        <FormField
          control={form.control}
          name="_gotcha"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input
                  id="_gotcha"
                  className="hidden"
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  autoComplete="off"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="self-end md:text-base md:h-10 md:px-6"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="animate-spin" />}
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
};
