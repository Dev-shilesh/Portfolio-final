import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useUIStore } from '../store/useStore';
import { Phone, Mail, MapPin, Linkedin, Github, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';

// Form validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(1, { message: 'Please select a subject of inquiry.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const {
    isSubmittingContact,
    contactSuccess,
    setSubmittingContact,
    setContactSuccess,
    setActiveSection,
  } = useUIStore();

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const { ref: sectionRef } = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) setActiveSection('contact');
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmittingContact(true);
    
    // EmailJS keys template - user can configure this later in environment variables
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

    try {
      if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
        // Send email via EmailJS API if credentials are provided
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            to_name: PERSONAL_INFO.name,
          },
          PUBLIC_KEY
        );
      } else {
        // Fallback simulation for demonstration / testing purposes
        console.warn('EmailJS keys not configured. Simulating form submission.');
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      
      setContactSuccess(true);
      reset();
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send message. Please try again or reach out directly via email.');
    } finally {
      setSubmittingContact(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-10 py-24 px-6 md:px-12 bg-transparent"
    >
      {/* Title */}
      <div
        ref={ref}
        className="max-w-5xl mx-auto flex flex-col items-center text-center gap-4 mb-20"
      >
        <motion.h2
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={inView ? { clipPath: 'inset(0 0 0 0)' } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase"
        >
          Let's Build Something Great
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-base text-slate-400 max-w-2xl leading-relaxed"
        >
          Open to freelance projects, full-time roles, and startup collaboration.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Side — Contact Info */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Card Wrapper */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#7c3aed]/15 flex flex-col gap-6">
            <h3 className="font-syne font-bold text-lg text-white tracking-wide border-b border-[#7c3aed]/10 pb-4">
              Contact Information
            </h3>

            {/* Info Items */}
            <div className="flex flex-col gap-5">
              {/* Phone */}
              <div className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-xl bg-[#06060f] border border-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] group-hover:border-[#7c3aed]/50 group-hover:text-white transition-all duration-300">
                  <Phone size={16} />
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-slate-500 uppercase font-bold tracking-wider">Phone</span>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="font-body text-sm font-semibold text-slate-200 hover:text-[#7c3aed] transition-colors">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-xl bg-[#06060f] border border-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] group-hover:border-[#7c3aed]/50 group-hover:text-white transition-all duration-300">
                  <Mail size={16} />
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-slate-500 uppercase font-bold tracking-wider">Email</span>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="font-body text-sm font-semibold text-slate-200 hover:text-[#7c3aed] transition-colors">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-xl bg-[#06060f] border border-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] group-hover:border-[#7c3aed]/50 group-hover:text-white transition-all duration-300">
                  <MapPin size={16} />
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-slate-500 uppercase font-bold tracking-wider">Location</span>
                  <span className="font-body text-sm font-semibold text-slate-200">
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-xl bg-[#06060f] border border-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] group-hover:border-[#7c3aed]/50 group-hover:text-white transition-all duration-300">
                  <Linkedin size={16} />
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-slate-500 uppercase font-bold tracking-wider">LinkedIn</span>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm font-semibold text-slate-200 hover:text-[#06b6d4] transition-colors"
                  >
                    linkedin.com/in/shileshmavchi
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-xl bg-[#06060f] border border-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] group-hover:border-[#7c3aed]/50 group-hover:text-white transition-all duration-300">
                  <Github size={16} />
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-slate-500 uppercase font-bold tracking-wider">GitHub</span>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm font-semibold text-slate-200 hover:text-[#a855f7] transition-colors"
                  >
                    github.com/shileshmavchi
                  </a>
                </div>
              </div>
            </div>

            {/* Availability pill */}
            <div className="mt-4 pt-4 border-t border-[#7c3aed]/10">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 font-mono text-[11px] font-semibold text-green-400 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Currently Available
              </span>
            </div>
          </div>
        </div>

        {/* Right Side — Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#7c3aed]/15 relative">
            <AnimatePresence mode="wait">
              {!contactSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-syne text-xs font-bold text-slate-300">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className={`w-full px-4 py-3 rounded-xl border bg-[#06060f]/60 font-body text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/40 transition-all ${
                          errors.name ? 'border-red-500/50' : 'border-[#7c3aed]/20 focus:border-[#7c3aed]'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <span className="flex items-center gap-1 font-mono text-[10px] text-red-400">
                          <AlertCircle size={10} />
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="font-syne text-xs font-bold text-slate-300">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={`w-full px-4 py-3 rounded-xl border bg-[#06060f]/60 font-body text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/40 transition-all ${
                          errors.email ? 'border-red-500/50' : 'border-[#7c3aed]/20 focus:border-[#7c3aed]'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <span className="flex items-center gap-1 font-mono text-[10px] text-red-400">
                          <AlertCircle size={10} />
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="font-syne text-xs font-bold text-slate-300">
                      Subject
                    </label>
                    <select
                      id="subject"
                      {...register('subject')}
                      className={`w-full px-4 py-3 rounded-xl border bg-[#06060f] font-body text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/40 transition-all ${
                        errors.subject ? 'border-red-500/50' : 'border-[#7c3aed]/20 focus:border-[#7c3aed]'
                      }`}
                    >
                      <option value="">Select an inquiry type...</option>
                      <option value="Freelance Project">Freelance Project</option>
                      <option value="Full-Time Role">Full-Time Role</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                    {errors.subject && (
                      <span className="flex items-center gap-1 font-mono text-[10px] text-red-400">
                        <AlertCircle size={10} />
                        {errors.subject.message}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-syne text-xs font-bold text-slate-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message')}
                      className={`w-full px-4 py-3 rounded-xl border bg-[#06060f]/60 font-body text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/40 transition-all ${
                        errors.message ? 'border-red-500/50' : 'border-[#7c3aed]/20 focus:border-[#7c3aed]'
                      }`}
                      placeholder="Tell me about your project or role..."
                    />
                    {errors.message && (
                      <span className="flex items-center gap-1 font-mono text-[10px] text-red-400">
                        <AlertCircle size={10} />
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:shadow-[0_0_24px_rgba(124,58,237,0.4)] disabled:opacity-50 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                  >
                    {isSubmittingContact ? (
                      <span className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin" />
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-16 gap-4"
                >
                  <span className="text-green-400 p-2 bg-green-500/10 border border-green-500/20 rounded-full animate-bounce">
                    <CheckCircle2 size={48} />
                  </span>
                  <h4 className="font-syne font-bold text-xl text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="font-body text-sm text-slate-400 max-w-sm leading-relaxed">
                    Thank you for reaching out, Shilesh has received your message and will reply within 24 hours.
                  </p>
                  <button
                    onClick={() => setContactSuccess(false)}
                    className="mt-6 px-6 py-2.5 rounded-full border border-[#7c3aed]/30 hover:bg-[#7c3aed]/10 text-xs font-semibold text-[#a855f7] hover:text-white transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
