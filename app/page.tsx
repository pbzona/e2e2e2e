import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const examples = [
  {
    title: 'Form Submission',
    description: 'Learn how to use server actions with form submissions',
    href: '/form-submission',
  },
  {
    title: 'Button Click',
    description: 'See how to invoke server actions on button clicks',
    href: '/button-click',
  },
  {
    title: 'useEffect',
    description: 'Discover using server actions within useEffect for data fetching',
    href: '/use-effect',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800 dark:text-gray-100">
          Server Action Examples
        </h1>
        <p className="text-center mb-8 text-gray-600 dark:text-gray-300">
          Explore different ways to use Next.js Server Actions
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {examples.map(example => (
            <Card
              key={example.href}
              className="hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle>{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  className="w-full"
                >
                  <Link href={example.href}>View Example</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p>Built with Next.js and Server Actions</p>
        </footer>
      </div>
    </div>
  );
}
