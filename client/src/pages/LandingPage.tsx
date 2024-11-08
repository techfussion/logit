import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Smartphone, ArrowRight, FileText } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Link } from "react-router-dom"
import Login from "@/layout/Login"
import Signup from "@/layout/Signup"
import EngineSnapShot from '@/assets/original-0f71f5b17597b9cff0947d2ffc082b30.png'

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <span className="ml-2 text-2xl font-bold">logit</span>
        <div className="ml-auto flex gap-4 sm:gap-6">
        <Popover>
            <PopoverTrigger><Button variant="ghost" size="sm">Login</Button></PopoverTrigger>
            <PopoverContent><Login /></PopoverContent>
        </Popover>
        <Popover>
            <PopoverTrigger><Button size="sm">Sign Up</Button></PopoverTrigger>
            <PopoverContent><Signup /></PopoverContent>
        </Popover>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="px-4">
            <div>
              <div className="flex flex-col items-center space-y-4 my-10">
                <div className="space-y-2 text-center">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                    Simplify Your Logging with logit
                  </h1>
                  <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Effortlessly track your activities, manage your time, and boost your productivity with our intuitive
                    digital logbook solution.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Popover>
                    <PopoverTrigger>
                    <Button size="lg" className="inline-flex items-center justify-center bg-customBlue1">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent><Signup /></PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="logit engine"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="1000"
                  src={EngineSnapShot}
                  width="1200"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Smartphone className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Mobile Friendly</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Access your logbook anytime, anywhere with our responsive mobile app.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <CheckCircle className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Easy Tracking</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Quickly log your activities with our user-friendly interface and customizable templates.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <FileText className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Easy Report Generation</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Easily convert your logs into comprehensive reports with just a few clicks.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How E-logbook Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">1</div>
                <h3 className="mt-4 text-xl font-semibold">Log Your Activities</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Easily input your daily activities using our intuitive interface. Set duration, add notes, and categorize entries.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">2</div>
                <h3 className="mt-4 text-xl font-semibold">Track Your Progress</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  View detailed analytics and visualizations of your logged time. Identify patterns and areas for improvement.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">3</div>
                <h3 className="mt-4 text-xl font-semibold">Generate Reports</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Create comprehensive reports with just a few clicks. Export your data in various formats for easy sharing.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  "E-logbook has revolutionized how I track my work hours. It's intuitive and saves me so much time!"
                </p>
                <p className="text-sm font-bold">- Sarah K., Freelance Designer</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  "As a project manager, E-logbook helps me keep my team's activities organized and easily accessible."
                </p>
                <p className="text-sm font-bold">- John D., Project Manager</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  "The mobile app is a game-changer. I can log my activities on-the-go, making my workday much more efficient."
                </p>
                <p className="text-sm font-bold">- Emily R., Sales Representative</p>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start Logging Smarter Today</h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
                  Join thousands of professionals who have simplified their logging process with E-logbook.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-primary-foreground text-primary" placeholder="Enter your email" type="email" />
                  <Button type="submit" variant="secondary">
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-primary-foreground/90">
                  Start your free 14-day trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 E-logbook Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to={''}>
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to={''}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}