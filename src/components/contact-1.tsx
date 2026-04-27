import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import Link from 'next/link';
import {Mail, MapPin, Phone} from 'lucide-react';

export default function Contact() {
  return (
    <section className="bg-white @container py-24 md:py-32 border-t border-slate-200">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center md:text-left space-y-4">
          <h2 className="text-balance text-4xl font-semibold md:text-5xl tracking-tight text-slate-900 font-outfit">
            Let&apos;s Build Your Vision Together
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl font-outfit">
            Ready to turn your ideas into a high-performance reality? Reach out
            today and start your journey towards digital excellence.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5 mt-16">
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Mail className="size-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-slate-900 text-sm font-semibold font-outfit">
                    Email Us
                  </p>
                  <Link
                    href="mailto:stackmajix@gmail.com"
                    className="text-slate-600 hover:text-primary transition-colors block leading-none">
                    stackmajix@gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Phone className="size-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-slate-900 text-sm font-semibold font-outfit">
                    Call Us
                  </p>
                  <Link
                    href="tel:01307164307"
                    className="text-slate-600 hover:text-primary transition-colors block leading-none">
                    01307164307
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-green-100 flex items-center justify-center">
                  <MapPin className="size-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-slate-900 text-sm font-semibold font-outfit">
                    Availability
                  </p>
                  <p className="text-slate-600 leading-none">
                    Global Distributed Team (Remote First)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="lg:col-span-3 p-8  border-slate-200 bg-slate-100 backdrop-blur-sm shadow-lg shadow-slate-200/30">
            <form action="" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-900">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="bg-white border-slate-300 focus:ring-primary text-slate-900"
                    required
                    suppressHydrationWarning
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-900">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className="bg-white border-slate-300 focus:ring-primary text-slate-900"
                    required
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="subject"
                  className="text-sm font-medium text-slate-900">
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="How can we help you?"
                  className="bg-white border-slate-300 focus:ring-primary text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-900">
                  Share Your Plan
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project or inquiry..."
                  rows={5}
                  className="bg-white border-slate-300 focus:ring-primary text-slate-900 min-h-30"
                  required
                  suppressHydrationWarning
                />
              </div>

              <Button className="w-full bg-primary text-white hover:bg-green-600 h-12 text-base font-semibold transition-colors duration-300">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
