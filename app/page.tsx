"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageSquare, Users, CheckCircle, ArrowUp } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Analytics } from "@vercel/analytics/react"

function RelayLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return <img src="/relay-text-cropped.svg" alt="Relay" className={className} />
}

function DynamicChatDemo() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [isTyping, setIsTyping] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const messages = [
    {
      type: "system",
      content: "Missed call from Sarah Johnson",
      time: "2:34 PM",
    },
    {
      type: "bot",
      content:
        "Hi Sarah! I see you tried to reach Smile Dental. I'm here to help! Are you looking to schedule an appointment or do you have a question about your treatment?",
    },
    {
      type: "user",
      content: "Hi! Yes, I need to schedule a cleaning appointment. Do you have anything available next week?",
    },
    {
      type: "bot",
      content: "Perfect! I have Tuesday at 10 AM or Thursday at 2 PM available. Which works better for you?",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)

          const timer = setInterval(() => {
            setVisibleMessages((prev) => {
              if (prev < messages.length) {
                if (prev > 0 && messages[prev].type === "user") {
                  setIsTyping(true)
                  setTimeout(() => {
                    setIsTyping(false)
                  }, 800)
                }
                return prev + 1
              } else {
                clearInterval(timer)
                return prev
              }
            })
          }, 1200)
        }
      },
      { threshold: 0.5 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [hasAnimated, messages.length])

  return (
    <div ref={containerRef} className="bg-white rounded-2xl p-8 shadow-lg border min-h-96 flex flex-col">
      <div className="space-y-4 flex-1 overflow-y-auto">
        {messages.slice(0, visibleMessages).map((message, index) => (
          <div key={index}>
            {message.type === "system" ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">Missed call from</div>
                  <div className="font-medium text-[#11475b]">Sarah Johnson</div>
                </div>
                <div className="text-xs text-gray-400">{message.time}</div>
              </div>
            ) : (
              <div
                className={`${message.type === "bot" ? "bg-[#8db5c4]/20 ml-13" : "bg-gray-100 mr-13"} rounded-lg p-4 animate-in slide-in-from-bottom-2 duration-500`}
              >
                <p className="text-sm text-[#11475b]">{message.content}</p>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="bg-[#8db5c4]/20 rounded-lg p-4 ml-13 animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#8db5c4] rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-[#8db5c4] rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-[#8db5c4] rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 ml-2">typing...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ROICalculator() {
  const [monthlyAppointments, setMonthlyAppointments] = useState(50)
  const [avgAppointmentValue, setAvgAppointmentValue] = useState(200)
  const [missedCallsPercentage, setMissedCallsPercentage] = useState(10)

  // Calculations
  const monthlyRevenueLost = monthlyAppointments * avgAppointmentValue * (missedCallsPercentage / 100)
  const monthlyRecovery = monthlyRevenueLost
  const annualRecovery = monthlyRecovery * 12

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Practice Information */}
      <div className="bg-white rounded-2xl shadow-lg border p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#8db5c4" }}>
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold" style={{ color: "#11475b" }}>
            Practice Information
          </h3>
        </div>

        <div className="space-y-8">
          {/* Monthly Appointments Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-4">
              How many appointments does your practice schedule every month?
            </label>
            <div className="relative">
              <input
                type="range"
                min="10"
                max="200"
                value={monthlyAppointments}
                onChange={(e) => setMonthlyAppointments(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #8db5c4 0%, #8db5c4 ${((monthlyAppointments - 10) / (200 - 10)) * 100}%, #e5e7eb ${((monthlyAppointments - 10) / (200 - 10)) * 100}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>10</span>
                <span className="font-semibold text-lg" style={{ color: "#8db5c4" }}>
                  {monthlyAppointments}
                </span>
                <span>200</span>
              </div>
            </div>
          </div>

          {/* Average Appointment Value Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-4">
              What is the average value of each appointment?
            </label>
            <div className="relative">
              <input
                type="range"
                min="50"
                max="500"
                value={avgAppointmentValue}
                onChange={(e) => setAvgAppointmentValue(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #8db5c4 0%, #8db5c4 ${((avgAppointmentValue - 50) / (500 - 50)) * 100}%, #e5e7eb ${((avgAppointmentValue - 50) / (500 - 50)) * 100}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>$50</span>
                <span className="font-semibold text-lg" style={{ color: "#8db5c4" }}>
                  ${avgAppointmentValue}
                </span>
                <span>$500</span>
              </div>
            </div>
          </div>

          {/* Missed Calls Percentage Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-4">
              What percent of incoming calls are missed?
            </label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="50"
                value={missedCallsPercentage}
                onChange={(e) => setMissedCallsPercentage(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #8db5c4 0%, #8db5c4 ${((missedCallsPercentage - 0) / (50 - 0)) * 100}%, #e5e7eb ${((missedCallsPercentage - 0) / (50 - 0)) * 100}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>0%</span>
                <span className="font-semibold text-lg" style={{ color: "#8db5c4" }}>
                  {missedCallsPercentage}%
                </span>
                <span>50%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Recovery */}
      <div className="bg-white rounded-2xl shadow-lg border p-6 h-fit">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#8db5c4" }}>
            <span className="text-white font-bold">$</span>
          </div>
          <h3 className="text-xl font-semibold" style={{ color: "#11475b" }}>
            Revenue Recovery
          </h3>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 font-medium">Monthly Recovery</p>
                <p className="text-2xl font-bold text-green-600">+{formatCurrency(monthlyRecovery)}</p>
              </div>
              <div className="text-green-500">
                <ArrowUp className="h-6 w-6 transform rotate-45" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-green-600">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 font-medium">Annual Recovery</p>
                <p className="text-3xl font-bold text-green-600">+{formatCurrency(annualRecovery)}</p>
              </div>
              <div className="text-green-600">
                <ArrowUp className="h-8 w-8 transform rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <RelayLogo className="h-11 w-auto" />
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-[#11475b] transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-[#11475b] transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                How It Works
              </a>
              <a
                href="#roi"
                className="text-gray-600 hover:text-[#11475b] transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("roi")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                ROI
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-[#11475b] transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Pricing
              </a>
              <a
                href="mailto:sales@getrelay.ca?subject=Demo%20request&body=Hi%2C%20I%20would%20like%20to%20inquire%20about%20a%20demo%20of%20Relay."
                className="inline-flex items-center px-6 py-2 text-white font-medium rounded-md transition-colors"
                style={{ backgroundColor: "#1f2937" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#111827"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1f2937"
                }}
              >
                Get Started
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge
              variant="secondary"
              className="mb-6 border-[#8db5c4]"
              style={{ backgroundColor: "#8db5c4", color: "#11475b" }}
            >
              For Dental Practices
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: "#11475b" }}>
              Never Miss Another
              <br />
              <span style={{ color: "#8db5c4" }}>Patient Call</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Relay's text-based answering service ensures every patient reaches your dental practice, even when you're
              busy with appointments.
            </p>
            <div className="flex justify-center">
              <a
                href="mailto:sales@getrelay.ca?subject=Demo%20request&body=Hi%2C%20I%20would%20like%20to%20inquire%20about%20a%20demo%20of%20Relay."
                className="inline-flex items-center px-8 py-4 text-white font-medium text-lg rounded-lg transition-colors"
                style={{ backgroundColor: "#8db5c4" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#7ba3b0"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#8db5c4"
                }}
              >
                Schedule a Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="features" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2" style={{ color: "#8db5c4" }}>
                  85%
                </div>
                <div className="text-gray-600">of missed calls converted to appointments</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2" style={{ color: "#8db5c4" }}>
                  24/7
                </div>
                <div className="text-gray-600">automated patient engagement</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2" style={{ color: "#8db5c4" }}>
                  30%
                </div>
                <div className="text-gray-600">of calls go unanswered on average</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: "#11475b" }}>
              Professional. Reliable. Available 24/7.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Relay works seamlessly with your existing phone system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#8db5c4" }}
                >
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "#11475b" }}>
                  Patient Calls
                </h3>
                <p className="text-gray-600">
                  When your office line is busy or after hours, missed calls are automatically detected
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#8db5c4" }}
                >
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "#11475b" }}>
                  Instant Text
                </h3>
                <p className="text-gray-600">
                  Patients receive a friendly text message within seconds, starting a conversation
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#8db5c4" }}
                >
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "#11475b" }}>
                  Appointments Booked
                </h3>
                <p className="text-gray-600">
                  Smart responses help schedule appointments and answer common questions automatically
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: "#11475b" }}>
                Built for Busy Dental Practices
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ backgroundColor: "#8db5c4" }}
                  >
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "#11475b" }}>
                      Reduce No-Shows
                    </h3>
                    <p className="text-gray-600">Automated reminders and easy rescheduling keep your schedule full</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ backgroundColor: "#8db5c4" }}
                  >
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "#11475b" }}>
                      Save Staff Time
                    </h3>
                    <p className="text-gray-600">Handle routine inquiries automatically, freeing up your team</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ backgroundColor: "#8db5c4" }}
                  >
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "#11475b" }}>
                      Increase Revenue
                    </h3>
                    <p className="text-gray-600">Convert more missed calls into paying patients</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ backgroundColor: "#8db5c4" }}
                  >
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "#11475b" }}>
                      HIPAA Compliant
                    </h3>
                    <p className="text-gray-600">Secure messaging that meets healthcare privacy standards</p>
                  </div>
                </div>
              </div>
            </div>
            <DynamicChatDemo />
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: "#11475b" }}>
              Calculate Your Potential Recovery
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how much revenue you could recover by converting missed calls into appointments
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: "#11475b" }}>
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            One plan that covers everything your practice needs. No hidden fees, no long-term contracts.
          </p>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border p-8">
              <div className="mb-6">
                <Badge className="px-6 py-2 text-white font-medium" style={{ backgroundColor: "#4ade80" }}>
                  30 Day Free Trial
                </Badge>
              </div>

              <h3 className="text-2xl font-bold mb-4" style={{ color: "#11475b" }}>
                Professional
              </h3>

              <div className="mb-8">
                <div className="text-5xl font-bold mb-2" style={{ color: "#11475b" }}>
                  C$250
                </div>
                <div className="text-xl text-gray-600">per month, per location</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Unlimited calls</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">24/7 text-based call handling</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Priority support</span>
                </div>
              </div>

              <a
                href="mailto:sales@getrelay.ca?subject=Demo%20request&body=Hi%2C%20I%20would%20like%20to%20inquire%20about%20a%20demo%20of%20Relay."
                className="inline-flex items-center justify-center w-full py-4 text-white font-medium text-lg rounded-lg transition-colors"
                style={{ backgroundColor: "#8db5c4" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#7ba3b0"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#8db5c4"
                }}
              >
                Schedule a Demo
              </a>

              <p className="text-sm text-gray-500 mt-4">No credit card required • Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: "#11475b" }}>
            Ready to Stop Missing Patients?
          </h2>
          <p className="text-xl text-gray-600 mb-8">Reduce revenue loss with Relay</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-300 py-12" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <RelayLogo className="h-6 w-auto" />
            </div>
            <div className="flex space-x-8 text-sm text-gray-600">
              <a href="#" className="hover:opacity-80" style={{ color: "#11475b" }}>
                Privacy Policy
              </a>
              <a href="#" className="hover:opacity-80" style={{ color: "#11475b" }}>
                Terms of Service
              </a>
              <a href="#" className="hover:opacity-80" style={{ color: "#11475b" }}>
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-300 text-center text-sm text-gray-500">
            © 2025 Relay. All rights reserved.
          </div>
        </div>
      </footer>
      <style jsx>{`
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #8db5c4;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #8db5c4;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
`}</style>
      <Analytics />
    </div>
  )
}
